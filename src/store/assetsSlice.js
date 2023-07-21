import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAssests, fetchItem, deleteEntry, deleteEntries, updateEntry, updateNaming, createEntry, createEntries, createBlock} from './assetsAPI';

import content from '../utils/content';
import mockAssets from '../utils/mockAssets';

const initialState = {}; //declare initial state mockDatabase

// 1. DONE - createAsyncThunks like 'assets/fetchData' with API calls from assetsAPI
// 2. DONE - code API calls that access the database (for now just access a mockStore declared with 'let')
// 3. DONE - add timer for debugging purpose (in order to check if pending and rejected case work)
// 4. DONE - refactor state to nested objects (instead of arrays?) main -> item -> block -> calcValues & entries array
// 5. DONE - Rename newMockStore to mockStore and refactor existing code to treat keys instead of indexes AND refactor block to sort keys
// 6. reducers shall map the db data and...
// 7. ...complement values that are not stored in db (like openingBalance)
// 8. ...replace NULL values with 0 or '' (or provide data at create and update right away?)
// 9. ...calculate accumulated values for blocks
// 10. ...calculate overall blocks
// 11. ...calculate dashboard item
// 11. Since one thunk triggers another, one can overwrite the other's state.status -> differantiate!
// but if inner promise gets rejected, also the outer promise gets rejected :)
// 12. treat rejected (inform), 'loading' (inform) and 'rejected' (inform and... ??!?) promises
// 13. Declare/ set up store
// 14. Replace mockStore with store
// 15. Export and import all thunks
// 15. Dispatch with 'store.deleteAssetsEntry(fetchUserById({ item: myItem, entry: myEntry }));'

const main = 'assets';

function getAvailableId(item, block, state) { 
  const ids = state[main][item][block].entries
    .map(currentEntry => currentEntry.id).sort();
  let expected = 0;
  for (let i = 0; i < ids.length; i++) {
      expected++;
      if (ids[i] !== expected) {return expected;}
  }
  return ids.length;
}

function getTaxRate(year) {
  for (const currentYear in content[2].taxRates) {
    if (year >= currentYear) {
      return content[2].taxRates[currentYear];
    }
  }
}

function roundAmount(number){
  let rounded = Math.round(number * 100) / 100;
  if(rounded === 0){
    rounded = Math.abs(rounded);
  }
  return rounded;
}

function calcROI(profit, transfers){
  if(!profit){
    return '-';
  }
  const number = profit / transfers;
  let rounded = Math.round(number * 1000) / 10;
  if(rounded === 0){
    rounded = Math.abs(rounded);
  }
  return rounded.toFixed(1);
}

function getDaysPassed(date, year) {
  const providedDate = new Date(date);
  const startOfYear = new Date(year, 0, 1);   
  const timeDifference = providedDate.getTime() - startOfYear.getTime();
  const daysPassed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  if(daysPassed > 365) return 365;
  return daysPassed;
}

function populateBlocks(entries) {
  const item = entries.reduce((block, entry) => { 
    const blockKey = entry.block;
    if (!block[blockKey]) {
      block[blockKey] = {entries: []};
    }
    block[blockKey].entries.push(entry);
    return block;
  }, {});
  return item;
}

const syncAssets = createAsyncThunk(
  'assets/syncAssets',
  async (_, thunkAPI) => {

    const response = await fetchAssests();
    const rawItems = response.data.assets; 
    //const json = await response.json(); returns response.data directly
    //required for JSON responses from database (?!?)
    thunkAPI.dispatch(assetsSlice.actions.calcTransfers(rawItems.transfers));
    thunkAPI.dispatch(assetsSlice.actions.calcResources(rawItems.resources));
    thunkAPI.dispatch(assetsSlice.actions.calcInvestments(rawItems.investments));
    thunkAPI.dispatch(assetsSlice.actions.calcExpanses(rawItems.expanses));
    thunkAPI.dispatch(assetsSlice.actions.calcPension(rawItems.pension));
    return response.data; 
    //returns {assets}
  }
);

const syncItem = createAsyncThunk(
  'assets/syncItem',
  async ({item}, thunkAPI) => {
    
    const response = await fetchItem(item);

    // thunkAPI.dispatch(assetsSlice.actions.setItem(response.data));
    switch (item){
      case 'resources':
        thunkAPI.dispatch(assetsSlice.actions.calcResources(response.data.entries));
        break;
      case 'investments':
        thunkAPI.dispatch(assetsSlice.actions.calcInvestments(response.data.entries));
        break;
      case 'transfers':
        thunkAPI.dispatch(assetsSlice.actions.calcTransfers(response.data.entries));
        break;
      case 'expanses':
        thunkAPI.dispatch(assetsSlice.actions.calcExpanses(response.data.entries));
        break;
      case 'pension':
        thunkAPI.dispatch(assetsSlice.actions.calcPension(response.data.entries));
        break;      
    }
    return response.data; 
    //returns {item, entries}
  }
);

const deleteAssetsEntry = createAsyncThunk(
  'assets/deleteEntry',
  async ({item, entry}, thunkAPI) => {

    const response = await deleteEntry(item, entry);

    thunkAPI.dispatch(syncItem(item));
    if(item ==='transfers') {
      thunkAPI.dispatch(assetsSlice.actions.calcResources());
    }
    return response.data; 
    //returns {item, entry}
  }
);

const updateAssetsEntry = createAsyncThunk(
  'assets/updateEntry',
  async ({item, entry}, thunkAPI) => {

    const response = await updateEntry(item, entry);

    thunkAPI.dispatch(syncItem({item}));

    return response.data; 
    //returns {item, entry}
  }
);

const createAssetsEntry = createAsyncThunk(
  'assets/createEntry',
  async ({item, entry}, thunkAPI) => {
    const state = thunkAPI.getState();
    const newId = getAvailableId(item, entry.block, state);
    const newEntry = {...entry, id: newId};

    const response = await createEntry(item, newEntry);

    thunkAPI.dispatch(syncItem(item));
    if(item ==='transfers') {
      thunkAPI.dispatch(assetsSlice.actions.calcInvestments());
    }
    return response.data; 
    //returns {item, entry}
  }
);

// [0] deleting single or all entries => {item, entries}
// [1] deleting all transfers entries => {item: 'transfers', entries}
const deleteAssetsAccount = createAsyncThunk(
  'assets/deleteAccount',
  async ({item, entry}, thunkAPI) => {

    let responseEntries = {};
    let responseTransfersEntries = {};

    if (item !== 'investments'){
      responseEntries = await deleteEntries(item, entry);
    } else {
      [responseEntries, responseTransfersEntries] = await Promise.all([
        deleteEntries(item, entry),
        deleteEntries('transfers', entry)
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

// [0] updating a single entry => {item, entry}
// [1] renaming all entries => {item, entries}
// [2] renaming all transfers entries => {item: 'transfers', entries}
const updateAssetsAccount = createAsyncThunk(
  'assets/updateAccount',
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

//only for 'investments', 'assets' and 'pension' item
//create empty entry plus the passed entry for all blocks 
const createAssetsAccount = createAsyncThunk( 
  'assets/createAccount',
  async ({item, entry}, thunkAPI) => {
    const state = thunkAPI.getState();
    const newId = getAvailableId(item, entry.block, state);
    const newEntry = {...entry, id: newId};
    const emptyEntry = {id: entry.id, group: entry.group, title: entry.title};
    const newEntries = Object.keys(state[item]).map(currentBlock => {
      if (currentBlock === newEntry.block){
        return newEntry;
      } else {
        return {...emptyEntry, block: currentBlock};
      }
    })

    let responses = [await createEntries(item, newEntries)];

    thunkAPI.dispatch(syncItem(item));   
    return responses.map(currentResponse => currentResponse.data); 
    // returns [{item, entries: []}]
  }
);

//only for 'investments', 'assets' and 'pension' item
//create empty entries for new block
const addNewYear = createAsyncThunk(
  'assets/addNewyear',
  async ({newYear}, thunkAPI) => {
    const state = thunkAPI.getState();
    const lastYear = toString(Number(newYear) - 1);
    // take over id, group, title
    // closingBalance = new openingBalance / amount & ROI = new amount & ROI
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
    const promises = [createBlock('resources', resourcesEntries),createBlock('investments', investmentsEntries), createBlock('pension', pensionEntries)];
    
    const responses = await Promise.all(promises);

    thunkAPI.dispatch(syncItem('resources'));
    thunkAPI.dispatch(syncItem('investments'));
    thunkAPI.dispatch(syncItem('pensions'));
    return responses.map(currentResponse => currentResponse.data); 
    //returns [{item: 'resources', entries: []}, {item: 'investments', entries: []}, {item: 'pension', entries: []}]
  }
);

//sort accordingly in the calc functions?
export const assetsSlice = createSlice({
  name: 'assets',
  initialState,
  reducers: {
    calcResources: (state, action) => {
      // retrieve entries sorted by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);
      const lastBlock = rawEntries[rawEntries.length -1].block;
      const closingBalances = {};
      const itemState = {};
      const dashboardState = {};

      // set up and complement all entries
      rawEntries.forEach(currentEntry => {
        const block = currentEntry.block; 
        const openingBalance = closingBalances[currentEntry.id] ?? 0;
        closingBalances[currentEntry.id] = currentEntry.closingBalance;
        const transfers = currentEntry.closingBalance - openingBalance;

        // resources
        const entry = {
          ...currentEntry,
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
        // dashboard
        const dashboardEntry = {
          block: entry.block,
          group: 'Resources',
          title: entry.group,
          closingBalance: entry.closingBalance,
          pending: entry.pending,
        }
        if (!dashboardState[block]){
          dashboardState[block] = {
            closingBalance: dashboardEntry.closingBalance,
            entries: [dashboardEntry],
          };
        } else {
          const index = dashboardState[block].entries.findIndex(currentDashboardEntry => currentDashboardEntry.title === dashboardEntry.title);
          dashboardState[block].closingBalance += dashboardEntry.closingBalance;
          if (index === -1){
            dashboardState[block].entries.push(dashboardEntry);
          } else {
            let currentDashboardEntry = dashboardState[block].entries[index];
            currentDashboardEntry = {
              ...currentDashboardEntry,
              closingBalance: currentDashboardEntry.closingBalance + dashboardEntry.closingBalance,
              pending: currentDashboardEntry.pending || dashboardEntry.pending,
            }
          }
        } 
      });

      // overall blocks
      itemState.overall = itemState[lastBlock];
      dashboardState.overall = dashboardState[lastBlock];

      // merge dashboardState with existing dashboard state for investments
      // pending...

      // populate state
      state.resources = JSON.parse(JSON.stringify(itemState));
      state.dashboardState = JSON.parse(JSON.stringify(dashboardState));
    },

    calcInvestments: (state, action) => {
      // retrieve entries sorted by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);
      const lastBlock = rawEntries[rawEntries.length -1].block;
      const closingBalances = {};
      const itemState = {overall: {entries: []}};
      const dashboardState = {overall: {entries: []}};
      const overallBlock = {};

      // set up and complement all entries
      rawEntries.forEach(currentEntry => {
        const block = currentEntry.block; 
        const taxRate = getTaxRate(block);
        let transfers = 0;
        let weightedTransfers = 0;
        
        let entryDaysPassed = 365;        
        if (currentEntry.pending){
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
        closingBalances[currentEntry.id] = currentEntry.closingBalance;
        const grossProfit = roundAmount(currentEntry.closingBalance - openingBalance - currentEntry.bonus + currentEntry.withheldTaxes - transfers);
        const dueTaxes = roundAmount(grossProfit * taxRate);
        const netProfit = grossProfit + currentEntry.bonus - dueTaxes;
        const ROI = calcROI(netProfit, weightedTransfers);
        
        // investments
        const entry = {
          ...currentEntry,
          openingBalance,
          transfers,
          grossProfit,
          dueTaxes,
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
              openingBalance: 0,
              grossProfit: currentOverallEntry.grossProfit + overallEntry.grossProfit,
              dueTaxes: currentOverallEntry.dueTaxes + overallEntry.dueTaxes,
              netProfit: overallNetProfit,
              weightedTransfers: overallWeightedTransfers,
              ROI: overallROI,
              pending: currentOverallEntry.pending || overallEntry.pending,
            }
            console.log(currentEntry);
            console.log(entry);
            console.log(currentOverallEntry);
            overallBlock.entries[overallIndex] = currentOverallEntry;
          }
        } 
        // dashboard
        const dashboardEntry = {
          block: block,
          group: 'Investments',
          title: entry.group,
          closingBalance: entry.closingBalance,
          netProfit: entry.netProfit,
          weightedTransfers: entry.weightedTransfers,
          ROI: entry.ROI,
          pending: entry.pending,
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
              pending: currentDashboardEntry.pending || dashboardEntry.pending,
            }
            dashboardState[block].entries[dashboardIndex] = currentDashboardEntry;
          }
        } 
      });

      // populate overall blocks
      itemState.overall = overallBlock;
      itemState.overall.closingBalance = itemState[lastBlock].closingBalance;
      dashboardState.overall.closingBalance = dashboardState[lastBlock].closingBalance;

      // merge dashboardState with existing dashboard state for investments

      // populate state
      state.investments = JSON.parse(JSON.stringify(itemState));
      state.dashboardState = JSON.parse(JSON.stringify(dashboardState));
    },

    calcTransfers: (state, action) => {
      // retrieve entries sorted by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);
      const itemState = {};

      rawEntries.forEach(currentEntry => {
        // transfers
        const entry = currentEntry;
        if (!itemState[entry.block]){
          itemState[entry.block] = {
            amount: entry.amount,
            entries: [entry],
          };
        } else {
          itemState[entry.block].amount += entry.amount;
          itemState[entry.block].entries.push(entry);
        }
      });
      // populate state
      state.transfers = JSON.parse(JSON.stringify(itemState));
    },

    calcExpanses: (state, action) => {
      // retrieve entries sorted by block as string in ascending order
      const rawEntries = action.payload.sort((a, b) => b.block.localeCompare(a.block));
      
      // set up and complement all entries
      const entries = rawEntries.map(currentEntry => {
        const amountMonthly = currentEntry.amountYearly / 12;

        return {
          ...currentEntry,
          amountMonthly,
        }
      });
      
      // populate item
      state.expanses = populateBlocks(entries);

      // add amount for each block
      const blocks = Object.keys(state.expanses).sort().reverse();
      blocks.map(currentBlock => {
        state.expanses[currentBlock].amountYearly = state.expanses[currentBlock].entries.reduce((blockAmount, entry) => {
          return blockAmount + entry.amountYearly;
        }, 0);
        state.expanses[currentBlock].amountMonthly = state.expanses[currentBlock].amountYearly / 12;
      });
    },

    calcPension: (state, action) => {
      // retrieve entries sorted by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);

       // set up and complement all entries
       const entries = rawEntries;

       // populate item
       state.pension = populateBlocks(entries);
       
      // add amount and expected for each block
      const blocks = Object.keys(state.pension).sort().reverse();
      blocks.map(currentBlock => {
        state.pension[currentBlock].amount = state.pension[currentBlock].entries.reduce((blockAmount, entry) => {
          return blockAmount + entry.amount;
        }, 0);
        state.pension[currentBlock].expected = state.pension[currentBlock].entries.reduce((blockExpected, entry) => {
          return blockExpected + entry.expected;
        }, 0);
      });
    },
  },

  //on fullfilled, fetch according item again
  //and then calculate again
  extraReducers: (builder) => {
    builder
      .addCase(syncAssets.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(syncAssets.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(syncAssets.rejected, (state) => {
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

      .addCase(deleteAssetsAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteAssetsAccount.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(deleteAssetsAccount.rejected, (state) => {
        state.status = 'error';
      })

      .addCase(updateAssetsAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateAssetsAccount.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(updateAssetsAccount.rejected, (state) => {
        state.status = 'error';
      })

      .addCase(createAssetsAccount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createAssetsAccount.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(createAssetsAccount.rejected, (state) => {
        state.status = 'error';
      })
  },
});

// export const {increment, decrement, incrementByAmount} = counterSlice.actions; //export actions defined in 'reducers' for usage in app

export {syncAssets, syncItem, updateAssetsAccount, deleteAssetsAccount}; //export thunks for usage in app

export const selectAssetsItem = (state, item) => state.assets[item];

export const selectAccounts = (state) => {
  const entries = [...state.assets.investments?.overall?.entries || []];
  return entries.sort((a, b) => a.title.localeCompare(b.title));
};

export default assetsSlice.reducer; //export slice for setting up store




