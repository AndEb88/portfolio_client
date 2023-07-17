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
    thunkAPI.dispatch(assetsSlice.actions.calcdashboard());
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
        thunkAPI.dispatch(assetsSlice.actions.calcResources(response.data.entries));
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
      thunkAPI.dispatch(assetsSlice.actions.calcdashboard());
    }
    return response.data; 
    //returns {item, entry}
  }
);

const updateAssetsEntry = createAsyncThunk(
  'assets/updateEntry',
  async ({item, entry}, thunkAPI) => {

    const response = await updateEntry(item, entry);

    thunkAPI.dispatch(syncItem(item));
    if(item ==='transfers') {
      thunkAPI.dispatch(assetsSlice.actions.calcInvestments());
      thunkAPI.dispatch(assetsSlice.actions.calcdashboard());
    }
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
      thunkAPI.dispatch(assetsSlice.actions.calcdashboard());
    }
    return response.data; 
    //returns {item, entry}
  }
);

//only for 'investments', 'assets' and 'pension' item
//delete all entries (in case of 'investments' also in 'transfers')
const deleteAssetsAccount = createAsyncThunk(
  'assets/deleteAccount',
  async ({item, entry}, thunkAPI) => { 
    let promises = [deleteEntries(item, entry)];
    if(item === 'investments') promises.push(deleteEntries('transfers', entry));
    
    const responses = await Promise.all(promises);

    await thunkAPI.dispatch(syncItem(item));   
    if(item === 'investments') await thunkAPI.dispatch(syncItem('transfers'));
    return responses.map(currentResponse => currentResponse.data); 
    //returns [{item: 'resources', entries: []}]
    // ...or [{item: 'investments', entries: []}, {item: 'transfers', entries: []}]
  }
);

//only for 'investments', 'assets' and 'pension' item
//if 'group' or 'title' changed, update all entries (in case of 'investments' also in 'transfers')
//then update the actual entry
const updateAssetsAccount = createAsyncThunk(
  'assets/updateAccount',
  async ({item, entry}, thunkAPI) => {
    const state = thunkAPI.getState().assets;
    const prevEntry = state[item][entry.block].entries.find(currentEntry => currentEntry.id === entry.id);

    if(prevEntry.group !== entry.group || prevEntry.title !== entry.title){
      let promises = [updateNaming(item, entry, prevEntry)];
      if(item === 'investments') promises.push(updateNaming('transfers', entry, prevEntry));
      let responses = await Promise.all(promises);
      responses.push(await updateEntry(item, entry));

      await thunkAPI.dispatch(syncItem({item}));   
      if(item === 'investments') await thunkAPI.dispatch(syncItem({item: 'transfers'}));
      return responses.map(currentResponse => currentResponse.data); 
      // returns [{item, entries: []}]
      // ...or [{item: 'investments', entries: []}, {item: 'transfers', entries: []}]
    }

  const response = await updateEntry(item, entry);
  await thunkAPI.dispatch(syncItem({item})); 
  return [response.data]; 
    // returns [{item, entry}]
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
      if (currentBlock === newEntry.block) {
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
    calcdashboard: (state, action) => {
    // omit and populate within resources and investments!?

    },

    calcResources: (state, action) => {
      // retrieve entries sorted by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);
      
      // set up opening balances
      const closingBalances = {};

      // set up and complement all entries
      const entries = rawEntries.map(currentEntry => {
        const openingBalance = closingBalances[currentEntry.id] ?? 0;
        closingBalances[currentEntry.id] = currentEntry.closingBalance;
        const transfers = currentEntry.closingBalance - openingBalance;
        return {
          ...currentEntry,
          openingBalance,
          transfers,
        }
      });

      // populate item
      state.resources = populateBlocks(entries);

      let dashboardEntries = [];
      const blocks = Object.keys(state.resources).sort();
      blocks.forEach((currentBlock, currentBlockIndex) => {
        // add closingBalance for each block
        state.resources[currentBlock].closingBalance = state.resources[currentBlock].entries.reduce((blockClosingBalance, entry) => {
          return blockClosingBalance + entry.closingBalance;
        }, 0);
         // set up and calculate entries for dashboard item
        const newEntries = Object.values(state.resources[currentBlock].entries.reduce((dashboardBlock, entry) => {
          const groupKey = entry.group;
          if (!dashboardBlock[groupKey]) {
            dashboardBlock[groupKey] = {
              block: currentBlock,
              group: 'Resources',
              title: groupKey,
              closingBalance: 0,
              pending: entry.pending,
            };
          }
          const dashboardEntry = dashboardBlock[groupKey];
          dashboardBlock[groupKey] = {
            ...dashboardEntry,
            closingBalance: dashboardEntry.closingBalance + entry.closingBalance,
            pending: dashboardEntry && entry.pending,
          }
          return dashboardBlock;
        }, {}
        )); 
      dashboardEntries.push(...newEntries);
      if (currentBlockIndex === blocks.length - 1){
         const overallEntries = newEntries.map(currentEntry => {
          return {
            ...currentEntry,
            block: 'overall'
          };
        });
        dashboardEntries.push(...overallEntries);
      }});

      // retrieve existing investments entries
      if (state.dashboard) {
        Object.keys(state.dashboard).forEach(currentBlock => {
          const investmentsEntries = state.dashboard[currentBlock].entries.filter(currentEntry => currentEntry.group === 'Investments');
          dashboardEntries.push(...investmentsEntries);
        });
      }
      // populate item
      state.dashboard = populateBlocks(dashboardEntries);

      Object.keys(state.dashboard).forEach(currentBlock => {
       // add closingBalance and netProfit for each dashboard block
       state.dashboard[currentBlock].closingBalance = state.dashboard[currentBlock].entries.reduce((blockClosingBalance, entry) => {
          return blockClosingBalance + entry.closingBalance;
        }, 0);
        state.dashboard[currentBlock].netProfit = state.dashboard[currentBlock].entries.reduce((blockNetProfit, entry) => {
          return blockNetProfit + (entry.netProfit ?? 0);
        }, 0);
      });
    },

    calcInvestments: (state, action) => {
      // retrieve entries sorted by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);
      
      // set up opening balances
      const closingBalances = {};
      let overallBlockId = {};

      // set up weightedTransfers for dashboard item
      let groupWeightedTransfers = {};
      content[2].items[2].groups.map(currentGroup =>{
        groupWeightedTransfers[currentGroup] = {}
      })

      // set up and complement all entries
      const entries = rawEntries.map(currentEntry => {
        const block = currentEntry.block;
        const taxRate = getTaxRate(block);
        const transfersEntries = state.transfers[block].entries.filter(currentTransfer => currentTransfer.title === currentEntry.title);
        const closingDaysPassed = getDaysPassed(currentEntry.date, block);
        let transfers = 0;
        let weightedTransfers = 0;
        transfersEntries.forEach(currentTransfer => {
          const transferDaysPassed = getDaysPassed(currentTransfer.date, block);
          if(transferDaysPassed < closingDaysPassed){
            transfers = transfers + currentTransfer.amount;
            weightedTransfers = weightedTransfers + currentTransfer.amount * (closingDaysPassed - transferDaysPassed) / 365;
          }
        });
        const openingBalance = closingBalances[currentEntry.id] ?? 0;
        closingBalances[currentEntry.id] = currentEntry.closingBalance;
        const grossProfit = roundAmount(currentEntry.closingBalance - openingBalance - currentEntry.bonus + currentEntry.withheldTaxes - transfers);
        const dueTaxes = roundAmount(grossProfit * taxRate);
        const netProfit = grossProfit + currentEntry.bonus - dueTaxes;
        weightedTransfers = weightedTransfers + openingBalance * closingDaysPassed / 365;
        groupWeightedTransfers[currentEntry.group][block] = (groupWeightedTransfers[currentEntry.group][block] ?? 0) + weightedTransfers;
        const ROI = calcROI(netProfit, weightedTransfers);

        // set up overall entry 
        if (!overallBlockId[currentEntry.id]) {
          overallBlockId[currentEntry.id] = {
            ...currentEntry,
            transfers,
            grossProfit,
            dueTaxes,
            netProfit,
            block: 'overall',
            openingBalance: 0,
            closingBalance: currentEntry.closingBalance,
            ROI: '-',
            weightedTransfers,
            pending: currentEntry.pending,
          }
        } 
        // ..or add to existing entry
        else {
          const entry = overallBlockId[currentEntry.id];
          overallBlockId[currentEntry.id] = {
            ...entry,
            transfers: entry.transfers + transfers,
            grossProfit: entry.grossProfit + grossProfit,
            dueTaxes: entry.dueTaxes + dueTaxes,
            netProfit: entry.netProfit + netProfit,
            date: entry.date > currentEntry.date ? entry.date : currentEntry.date,
            closingBalance: currentEntry.closingBalance,
            weightedTransfers: entry.weightedTransfers + weightedTransfers,
            pending: entry.pending || currentEntry.pending,
          }
        }

        //return entry
        return {
          ...currentEntry,
          closingBalance: currentEntry.closingBalance,
          openingBalance: openingBalance,
          transfers: transfers,
          grossProfit: grossProfit,
          dueTaxes: dueTaxes,
          netProfit: netProfit,
          ROI: ROI,
        }
      });

      // remove ID keys from overallBlockId
      const overallBlock = Object.values(overallBlockId);

      // calculate ROI for entries of overall block
      const overallEntries = overallBlock.map(currentEntry => {
        groupWeightedTransfers[currentEntry.group][currentEntry.block] = (groupWeightedTransfers[currentEntry.group][currentEntry.block] ?? 0) + currentEntry.weightedTransfers;
        const ROI = calcROI(currentEntry.netProfit, currentEntry.weightedTransfers);
        return {
          ...currentEntry,
          ROI: ROI,
        }
      });   

      // populate item
      state.investments = populateBlocks(entries.concat(overallEntries));
      
      let dashboardEntries = [];
      const blocks = Object.keys(state.investments).sort();
      blocks.map(currentBlock => {
        // add closingBalance and netProfit for each block
        state.investments[currentBlock].closingBalance = state.investments[currentBlock].entries.reduce((blockClosingBalance, entry) => {
          return blockClosingBalance + entry.closingBalance;
        }, 0);
        state.investments[currentBlock].netProfit = state.investments[currentBlock].entries.reduce((blockNetProfit, entry) => {
          return blockNetProfit + entry.netProfit;
        }, 0);
        
        // set up and calculate entries for dashboard item
        dashboardEntries.push(...Object.values(state.investments[currentBlock].entries.reduce((dashboardBlock, entry) => {
          const groupKey = entry.group;
          if (!dashboardBlock[groupKey]) {
            dashboardBlock[groupKey] = {
              block: currentBlock,
              group: 'Investments',
              title: groupKey,
              closingBalance: 0,
              netProfit: 0,
              pending: entry.pending,
            };
          }
          const dashboardEntry = dashboardBlock[groupKey];
          dashboardBlock[groupKey] = {
            ...dashboardEntry,
            closingBalance: dashboardEntry.closingBalance + entry.closingBalance,
            netProfit: dashboardEntry.netProfit + entry.netProfit,
            pending: dashboardEntry.pending || entry.pending,
          }
          return dashboardBlock;
        }, {})));        
      });

      // calculate ROI for entries of dashboard item
      dashboardEntries = dashboardEntries.map(currentEntry => {
        const ROI = calcROI(currentEntry.netProfit, groupWeightedTransfers[currentEntry.title][currentEntry.block]);
        return {
          ...currentEntry,
          ROI,
        }
      })

      // retrieve existing resources entries
      if (state.dashboard) {
        Object.keys(state.dashboard).map(currentBlock => {
          const resourcesEntries = state.dashboard[currentBlock].entries.filter(currentEntry => currentEntry.group === 'Resources');
          dashboardEntries.push(...resourcesEntries);
        });
      }
      // populate item
      state.dashboard = populateBlocks(dashboardEntries);

      blocks.map(currentBlock => {
        // add closingBalance and netProfit for each dashboard block
        state.dashboard[currentBlock].closingBalance = state.dashboard[currentBlock].entries.reduce((blockClosingBalance, entry) => {
          return blockClosingBalance + entry.closingBalance;
        }, 0);
        state.dashboard[currentBlock].netProfit = state.dashboard[currentBlock].entries.reduce((blockNetProfit, entry) => {
          return blockNetProfit + (entry.netProfit ?? 0);
        }, 0);
      });
    },

    calcTransfers: (state, action) => {
      // retrieve entries sorted by block as number in descending order
      const rawEntries = action.payload.sort((a, b) => a.block - b.block);

      // set up and complement all entries
      const entries = rawEntries;

      // populate item
      state.transfers = populateBlocks(entries);
      
      // add amount for each block
      const blocks = Object.keys(state.transfers).sort();
      blocks.map(currentBlock => {
        state.transfers[currentBlock].amount = state.transfers[currentBlock].entries.reduce((blockAmount, entry) => {
          return blockAmount + entry.amount;
        }, 0);
      });
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

export {syncAssets, syncItem, updateAssetsAccount}; //export thunks for usage in app

export const selectAssetsItem = (state, item) => state.assets[item];

export const selectAccounts = (state) => {
  const entries = [...state.assets.investments?.overall?.entries || []];
  return entries.sort((a, b) => a.title.localeCompare(b.title));
};

export default assetsSlice.reducer; //export slice for setting up store




