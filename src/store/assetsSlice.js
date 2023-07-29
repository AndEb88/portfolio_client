import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {fetchAssets, fetchItem, deleteEntries, updateEntry, updateNaming, createEntries} from './assetsAPI';
import {getAvailableId, getTaxRate, roundAmount, calcROI, getDaysPassed} from './assetsFunctions';
import mockAssets from '../utils/mockAssets';

const initialState = {}; //declare initial state mockDatabase

// set up required payload
// set up expected responses
// call API and assign responses
// dispatch thunks for sync
// return array of item/ entry pairs

// [0] sync all items => {items}
const syncItems = createAsyncThunk(
  'assets/syncItems',
  async (_, thunkAPI) => {

    const response = await fetchAssets();
    const items = response.data.assets; 
    //const json = await response.json(); returns response.data directly
    //required for JSON responses from database (?!?)
    thunkAPI.dispatch(assetsSlice.actions.calcTransfers(items.transfers));
    thunkAPI.dispatch(assetsSlice.actions.calcResources(items.resources));
    thunkAPI.dispatch(assetsSlice.actions.calcInvestments(items.investments));
    thunkAPI.dispatch(assetsSlice.actions.calcExpanses(items.expanses));
    thunkAPI.dispatch(assetsSlice.actions.calcPension(items.pension));
    return [response.data.assets]; 
  }
);

// [0] sync all entries => {item, entries}
const syncItem = createAsyncThunk(
  'assets/syncItem',
  async ({item}, thunkAPI) => {
    
    const response = await fetchItem(item);
    const entries = response.data.entries;

    switch (item){
      case 'resources':
        thunkAPI.dispatch(assetsSlice.actions.calcResources(entries));
        break;
      case 'investments':
        thunkAPI.dispatch(assetsSlice.actions.calcInvestments(entries));
        break;
      case 'transfers':
        thunkAPI.dispatch(assetsSlice.actions.calcTransfers(entries));
        break;
      case 'expanses':
        thunkAPI.dispatch(assetsSlice.actions.calcExpanses(entries));
        break;
      case 'pension':
        thunkAPI.dispatch(assetsSlice.actions.calcPension(entries));
        break;      
    }
    return [response.data]; 
  }
);

// [0] create a single entry or all entries => {item, entries}
const createAssetsEntry = createAsyncThunk( 
  'assets/createEntry',
  async ({item, entry}, thunkAPI) => {
    const state = thunkAPI.getState().assets;
    const newId = getAvailableId(item, entry.block, state);

    const newEntry = {
      ...entry,
      id: newId
    };
    let newEntries = [newEntry];

    if (item !== 'transfers' && item !== 'expanses'){
      const emptyEntry = {
        id: newEntry.id,
        group: newEntry.group,
        title: newEntry.title,
        date: newEntry.date,
      };
      for (const block in state[item]){
        if (block !== newEntry.block && block !== 'overall'){
          newEntries.push({
            ...emptyEntry,
            block
          });
        }
      }
    }

    let response = await createEntries(item, newEntries);

    await thunkAPI.dispatch(syncItem({item}));   
    if (item === 'transfers') {
      await thunkAPI.dispatch(syncItem({item: 'investments'}));
    }
    return [response.data]; 
  }
);

// [0] update a single entry => {item, entry}
// [1] rename all entries => {item, entries}
// [2] rename all transfers entries => {item: 'transfers', entries}
const updateAssetsEntry = createAsyncThunk(
  'assets/updateEntry',
  async ({item, entry}, thunkAPI) => {
    const state = thunkAPI.getState().assets;    
    const prevEntry = state[item][entry.block].entries.find(currentEntry => currentEntry.id === entry.id);

    const responseEntry = await updateEntry(item, entry);
    let responseNaming = {};
    let responseTransfersNaming = {};

    if (prevEntry.group !== entry.group || prevEntry.title !== entry.title){
      if (item !== 'investments'){
        responseNaming = await updateNaming(item, entry, prevEntry);       
      } else { 
        [responseNaming, responseTransfersNaming] = await Promise.all([
          updateNaming(item, entry, prevEntry),
          updateNaming('transfers', entry, prevEntry)
        ]);       
        await thunkAPI.dispatch(syncItem({item: 'transfers'}));  
      }
    }
    await thunkAPI.dispatch(syncItem({item}));
    if (item === 'transfers') {
      await thunkAPI.dispatch(syncItem({item: 'investments'}));
    }
    return [responseEntry.data, responseNaming.data, responseTransfersNaming.data]; 
  }
);

// [0] delete single or all entries => {item, entries}
// [1] delete all transfers entries => {item: 'transfers', entries}
const deleteAssetsEntry = createAsyncThunk(
  'assets/deleteEntry',
  async ({item, entry}, thunkAPI) => {

    let responseEntries = {};
    let responseTransfersEntries = {};

    if (item !== 'investments'){
      responseEntries = await deleteEntries(item, entry);
    } else {
      [responseEntries, responseTransfersEntries] = await Promise.all([
        deleteEntries(item, entry),
        deleteEntries('transfers', entry, true)
      ]);
      await thunkAPI.dispatch(syncItem({item: 'transfers'}));
    }  
    await thunkAPI.dispatch(syncItem({item}));
    if (item === 'transfers') {
      await thunkAPI.dispatch(syncItem({item: 'investments'}));
    }
    return [responseEntries.data, responseTransfersEntries.data]; 
  }
);

// [0] create all reosurces entries => {item, entries}
// [1] create all investments entries => {item, entries}
// [2] create all pensions entries => {item, entries}
const addNewYear = createAsyncThunk(
  'assets/addNewyear',
  async ({newYear}, thunkAPI) => {
    const state = thunkAPI.getState();
    const lastYear = toString(Number(newYear) - 1);
 
    const resourcesEntries = state.resources[lastYear].entries.map(currentEntry => {
      return {
        block: newYear, 
        id: currentEntry.id, 
        group: currentEntry.group, 
        title: currentEntry.title, 
        openingBalance: currentEntry.closingBalance,
        closingBalance: currentEntry.closingBalance,
      };
    });
    const investmentsEntries = state.investments[lastYear].entries.map(currentEntry => {
      return {
        block: newYear, 
        id: currentEntry.id, 
        group: currentEntry.group, 
        title: currentEntry.title, 
        openingBalance: currentEntry.closingBalance,
        closingBalance: currentEntry.closingBalance,
      };
    });
    const pensionEntries = state.pension[lastYear].entries.map(currentEntry => {
      return {
        block: newYear, 
        id: currentEntry.id,
        group: currentEntry.group, 
        title: currentEntry.title, 
        ROI: currentEntry.ROI,
      };
    });

    let responseResource = {};
    let responseInvestments = {};
    let responsePension = {};

    [responseResource, responseInvestments, responsePension] = await Promise.all([
      createEntries('resources', resourcesEntries),
      createEntries('investments', investmentsEntries),
      createEntries('pension', pensionEntries)
    ]);

    thunkAPI.dispatch(syncItem('resources'));
    thunkAPI.dispatch(syncItem('investments'));
    thunkAPI.dispatch(syncItem('pensions'));
    return [responseResource.data, responseInvestments.data, responsePension.data]; 
  }
);

// retrieve raw values and sort by block
// set up required local variables

// iterate over all raw entries
    // perform calculations on raw entry    
    
    // set up entry for store
    // if block doesn't exist yet, create it with the entry
    // else push the entry and add accumulated values    
    
    // set up overall entry
    // if block doesn't exist yet, create it with the entry
    // else check if title already exists
        // add accumulated values 
        // if id doesn't exist yet, push the entry
        // else merge the new entry with the existing one

// iterate over all blocks
    // iterate over all entries
        // set up entry for dashboard
        // if block doesn't exist yet, create it with the entry
        // else check if group already exists
            // add accumulated values 
            // if goupp doesn't exist yet, push the entry
            // else merge the new entry with the existing one
    // retrieve existing entries from dashboard
    // and add them to the new dashboard state

// populate state

export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    calcResources: (state, action) => {
      // sort entries by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);
      const lastBlock = rawEntries[rawEntries.length -1].block;
      const closingBalances = {};
      const itemState = {};
      const dashboardState = {};

      // resources
      rawEntries.forEach(currentEntry => {
        const block = currentEntry.block; 
        const openingBalance = closingBalances[currentEntry.id] ?? 0;
        const closingBalance = currentEntry.closingBalance ?? 0;
        closingBalances[currentEntry.id] = closingBalance;
        const transfers = closingBalance - openingBalance;

        const entry = {
          ...currentEntry,
          closingBalance,
          openingBalance,
          transfers,
        };
        if (!itemState[block]){
          itemState[block] = {
            closingBalance: entry.closingBalance,
            entries: [entry],
          };
        } else {
          itemState[block].closingBalance += entry.closingBalance;
          itemState[block].entries.push(entry);
        }        
      });

      // dashboard
      for (const block in itemState) {
        itemState[block].entries.forEach(currentEntry => {
          const dashboardEntry = {
            ...currentEntry,
            group: 'Resources',
            title: currentEntry.group,
          }
          if (!dashboardState[block]){
            dashboardState[block] = {
              closingBalance: dashboardEntry.closingBalance,
              entries: [dashboardEntry],
            };
          } else {
            const dashboardIndex = dashboardState[block].entries.findIndex(currentDashboardEntry => currentDashboardEntry.title === dashboardEntry.title);
            dashboardState[block].closingBalance += dashboardEntry.closingBalance;
            if (dashboardIndex === -1){
              dashboardState[block].entries.push(dashboardEntry);
            } else {
              let currentDashboardEntry = dashboardState[block].entries[dashboardIndex];
              currentDashboardEntry = {
                ...currentDashboardEntry,
                closingBalance: currentDashboardEntry.closingBalance + dashboardEntry.closingBalance,
                frozen: currentDashboardEntry.frozen && dashboardEntry.frozen,
              }
              dashboardState[block].entries[dashboardIndex] = currentDashboardEntry;
            }
          }
        });
        // retrieve investments
        state.dashboard?.[block].entries.forEach(currentEntry => {
          if (currentEntry.group !== 'Resources'){
            dashboardState[block].closingBalance += currentEntry.closingBalance;
            dashboardState[block].entries.push(currentEntry);
          }
        });
      }
      dashboardState.overall = dashboardState[lastBlock];

      // populate state
      state.resources = JSON.parse(JSON.stringify(itemState));
      state.dashboard = JSON.parse(JSON.stringify(dashboardState));
    },

    calcInvestments: (state, action) => {
      // sort entries by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);
      const lastBlock = rawEntries[rawEntries.length -1].block;
      const closingBalances = {};
      const itemState = {};
      const overallBlock = {};
      const accountsState = [];
      const dashboardState = {};

      // investments
      rawEntries.forEach(currentEntry => {
        const block = currentEntry.block; 
        const taxRate = getTaxRate(block);
        const closingBalance = currentEntry.closingBalance ?? 0;
        const bonus = currentEntry.bonus ?? 0;
        const withheldTaxes = currentEntry.withheldTaxes ?? 0;
        let transfers = 0;
        let weightedTransfers = 0;
        let entryDaysPassed = 365;        
        if (!currentEntry.frozen){
          entryDaysPassed = getDaysPassed(currentEntry.date, block);
          if (entryDaysPassed > 365){
            entryDaysPassed = 365;
          }
        }        
        const transfersEntries = state.transfers[block].entries.filter(currentTransfer => currentTransfer.title === currentEntry.title);
        transfersEntries.forEach(currentTransfer => {
          const transferDaysPassed = getDaysPassed(currentTransfer.date, block);
          if(entryDaysPassed >= transferDaysPassed){
            transfers += currentTransfer.amount;
            weightedTransfers += currentTransfer.amount * (entryDaysPassed - transferDaysPassed) / 365;
          }
        });
        const openingBalance = closingBalances[currentEntry.id] ?? 0;
        weightedTransfers += openingBalance * entryDaysPassed / 365;
        closingBalances[currentEntry.id] = closingBalance;
        const grossProfit = roundAmount(closingBalance - openingBalance - bonus + withheldTaxes - transfers);
        const dueTaxes = roundAmount(grossProfit * taxRate);
        const netProfit = grossProfit + bonus - dueTaxes;
        const ROI = calcROI(netProfit, weightedTransfers);

        const entry = {
          ...currentEntry,
          closingBalance,
          openingBalance,
          withheldTaxes,
          transfers,
          grossProfit,
          dueTaxes,
          bonus,
          netProfit,
          weightedTransfers,
          ROI,
        };

        if (!itemState[block]){
          itemState[block] = {
            closingBalance: entry.closingBalance,
            netProfit: entry.netProfit,
            entries: [entry],
          };
        } else {
          itemState[block].closingBalance += entry.closingBalance;
          itemState[block].netProfit += entry.netProfit;
          itemState[block].entries.push(entry);
        }
        // overall
        const overallEntry = {
          ...entry,
          block: 'overall',
          openingBalance: 0,
        };
        if (!overallBlock.entries){
           overallBlock.netProfit = overallEntry.netProfit;
          overallBlock.entries = [overallEntry];
        } else {
          const overallIndex = overallBlock.entries.findIndex(currentOverallEntry => currentOverallEntry.id === overallEntry.id);
          overallBlock.netProfit += entry.netProfit;
          if (overallIndex === -1){
            overallBlock.entries.push(overallEntry);
          } else {
            let currentOverallEntry = overallBlock.entries[overallIndex];
            const overallNetProfit = currentOverallEntry.netProfit + overallEntry.netProfit;
            const overallWeightedTransfers = currentOverallEntry.weightedTransfers + overallEntry.weightedTransfers;
            const overallROI = calcROI(overallNetProfit, overallWeightedTransfers);
            currentOverallEntry = {
              ...overallEntry,
              withheldTaxes: currentOverallEntry.withheldTaxes + overallEntry.withheldTaxes,
              bonus: currentOverallEntry.bonus + overallEntry.bonus,
              transfers: currentOverallEntry.transfers + overallEntry.transfers,
              grossProfit: currentOverallEntry.grossProfit + overallEntry.grossProfit,
              dueTaxes: currentOverallEntry.dueTaxes + overallEntry.dueTaxes,
              netProfit: overallNetProfit,
              weightedTransfers: overallWeightedTransfers,
              ROI: overallROI,
              frozen: currentOverallEntry.frozen && overallEntry.frozen,
            }
            overallBlock.entries[overallIndex] = currentOverallEntry;
          }
        }
      });

      itemState.overall = overallBlock;
      itemState.overall.closingBalance = itemState[lastBlock].closingBalance;

      // accounts 
      overallBlock.entries.forEach(currentEntry => accountsState.push(currentEntry.title));
      accountsState.sort();

      // dashboard
      for (const block in itemState) {
        itemState[block].entries.forEach(currentEntry => {
          const dashboardEntry = {
            ...currentEntry,
            group: 'Investments',
            title: currentEntry.group,
          }
          if (!dashboardState[block]){
            dashboardState[block] = {
              closingBalance: dashboardEntry.closingBalance,
              netProfit: dashboardEntry.netProfit,
              entries: [dashboardEntry],
            };
          } else {
            const dashboardIndex = dashboardState[block].entries.findIndex(currentDashboardEntry => currentDashboardEntry.title === dashboardEntry.title);
            dashboardState[block].closingBalance += dashboardEntry.closingBalance;
            dashboardState[block].netProfit += dashboardEntry.netProfit;
            if (dashboardIndex === -1){
              dashboardState[block].entries.push(dashboardEntry);
            } else {
              let currentDashboardEntry = dashboardState[block].entries[dashboardIndex];
              const dashboardNetProfit = currentDashboardEntry.netProfit + dashboardEntry.netProfit;
              const dashboardWeightedTransfers = currentDashboardEntry.weightedTransfers + dashboardEntry.weightedTransfers;
              const dashboardROI = calcROI(dashboardNetProfit, dashboardWeightedTransfers);
              currentDashboardEntry = {
                ...currentDashboardEntry,
                closingBalance: currentDashboardEntry.closingBalance + dashboardEntry.closingBalance,
                netProfit: dashboardNetProfit,
                weightedTransfers: dashboardWeightedTransfers,
                ROI: dashboardROI,
                frozen: currentDashboardEntry.frozen && dashboardEntry.frozen,
              }
              dashboardState[block].entries[dashboardIndex] = currentDashboardEntry;
            }
          } 
        });
        // retrieve resources
        state.dashboard?.[block].entries.forEach(currentEntry => {
          if (currentEntry.group !== 'Investments'){
            dashboardState[block].closingBalance += currentEntry.closingBalance;
            dashboardState[block].entries.push(currentEntry);
          }
        });
      }
      // populate state
      state.investments = JSON.parse(JSON.stringify(itemState));
      state.dashboard = JSON.parse(JSON.stringify(dashboardState));
      state.accounts = JSON.parse(JSON.stringify(accountsState));
    },

    calcTransfers: (state, action) => {
      // sort entries by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);
      const itemState = {};

      // transfers
      rawEntries.forEach(currentEntry => {
        const block = currentEntry.block;
        const amount = currentEntry.amount ?? 0; 
        
        const entry = {
          ...currentEntry,
          amount,
        }
        if (!itemState[block]){
          itemState[block] = {
            amount: entry.amount,
            entries: [entry],
          };
        } else {
          itemState[block].amount += entry.amount;
          itemState[block].entries.push(entry);
        }
      });
      // populate state
      state.transfers = JSON.parse(JSON.stringify(itemState));
    },

    calcExpanses: (state, action) => {
      // sort entries by block as string in ascending order
      const rawEntries = action.payload.sort((a, b) => b.block.localeCompare(a.block));
      const itemState = {};

      // expanses
      rawEntries.forEach(currentEntry => {
        const block = currentEntry.block; 
        const amountYearly = currentEntry.amountYearly ?? 0;
        const amountMonthly = currentEntry.amountYearly / 12;
        
        const entry = {
          ...currentEntry,
          amountYearly,
          amountMonthly,
        }
        if (!itemState[block]){
          itemState[block] = {
            amountYearly: entry.amountYearly,
            amountMonthly: entry.amountMonthly,
            entries: [entry],
          };
        } else {
          itemState[entry.block].amountYearly += entry.amountYearly;
          itemState[entry.block].amountMonthly += entry.amountMonthly;
          itemState[entry.block].entries.push(entry);
        }
      });
      // populate state
      state.expanses = JSON.parse(JSON.stringify(itemState));
    },

    calcPension: (state, action) => {
      // sort entries by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);
      const itemState = {};
       
      // pension
      rawEntries.forEach(currentEntry => {
        const block = currentEntry.block;
        const ROI = currentEntry.ROI ?? '-';
        const amount = currentEntry.amount ?? 0; 
        const expected = currentEntry.expected ?? 0;
        
        const entry = {
          ...currentEntry,
          ROI, 
          amount,
          expected,
        }
        if (!itemState[block]){
          itemState[block] = {
            amount: entry.amount,
            expected: entry.expected,
            entries: [entry],
          };
        } else {
          itemState[entry.block].amount += entry.amount;
          itemState[entry.block].expected += entry.expected;
          itemState[entry.block].entries.push(entry);
        }
      });
      // populate state
      state.pension = JSON.parse(JSON.stringify(itemState));
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(syncItems.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(syncItems.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(syncItems.rejected, (state) => {
        state.status = 'error';
      })

      .addCase(syncItem.pending, (state) => {
        // state.status = 'loading';
      })
      .addCase(syncItem.fulfilled, (state, action) => {
        // state.status = 'idle';
      })
      .addCase(syncItem.rejected, (state) => {
        // state.status = 'error';
      })

      .addCase(deleteAssetsEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAssetsEntry.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(deleteAssetsEntry.rejected, (state) => {
        state.status = 'error';
      })

      .addCase(updateAssetsEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAssetsEntry.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(updateAssetsEntry.rejected, (state) => {
        state.status = 'error';
      })

      .addCase(createAssetsEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAssetsEntry.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(createAssetsEntry.rejected, (state) => {
        state.status = 'error';
      })
  },
});

// export const {increment, decrement, incrementByAmount} = counterSlice.actions; //export actions defined in 'reducers' for usage in app

export {syncItems, syncItem, updateAssetsEntry, deleteAssetsEntry, createAssetsEntry}; //export thunks for usage in app

export const selectAssetsItem = (state, item) => state.assets[item];

export const selectAccounts = (state) => state.assets.accounts;

export default assetsSlice.reducer; //export slice for setting up store




