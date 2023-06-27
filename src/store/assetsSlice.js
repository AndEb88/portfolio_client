import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAssests, fetchItem, deleteEntry, deleteEntries, updateEntry, updateEntries, createEntry, createEntries, createBlock} from './assetsAPI';

import content from '../utils/content';

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
// 11. ...calculate overview item
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

function getDaysPassed(date) {
  const providedDate = new Date(date);
  const startOfYear = new Date(providedDate.getFullYear(), 0, 1);   
  const timeDifference = providedDate.getTime() - startOfYear.getTime();
  const daysPassed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));  
  return daysPassed;
}

function populateItem(entries) {
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
    
    //const json = await response.json(); returns response.data directly
    //required for JSON responses from database (?!?)    
    thunkAPI.dispatch(assetsSlice.actions.setAssets(response.data));
    thunkAPI.dispatch(assetsSlice.actions.calcResources());
    thunkAPI.dispatch(assetsSlice.actions.calcInvestments());
    thunkAPI.dispatch(assetsSlice.actions.calcTransfers());
    thunkAPI.dispatch(assetsSlice.actions.calcExpanses());
    thunkAPI.dispatch(assetsSlice.actions.calcPension());
    thunkAPI.dispatch(assetsSlice.actions.calcOverview());
    return response.data; 
    //returns {assets}
  }
);

const syncItem = createAsyncThunk(
  'assets/syncItem',
  async ({item}, thunkAPI) => {

    const response = await fetchItem(item);
    
    thunkAPI.dispatch(assetsSlice.actions.setItem(response.data));
    switch (item){
      case 'resources':
        thunkAPI.dispatch(assetsSlice.actions.calcResources());
        thunkAPI.dispatch(assetsSlice.actions.calcOverview());
        break;
      case 'investments':
        console.log('syncing investments');

        thunkAPI.dispatch(assetsSlice.actions.calcInvestments());
        thunkAPI.dispatch(assetsSlice.actions.calcOverview());
        break;
      case 'transfers':
        thunkAPI.dispatch(assetsSlice.actions.calcTransfers());
        break;
      case 'expanses':
        thunkAPI.dispatch(assetsSlice.actions.calcExpanses());
        break;
      case 'pension':
        thunkAPI.dispatch(assetsSlice.actions.calcPension());
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
      thunkAPI.dispatch(assetsSlice.actions.calcOverview());
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
      thunkAPI.dispatch(assetsSlice.actions.calcOverview());
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
      thunkAPI.dispatch(assetsSlice.actions.calcOverview());
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

    thunkAPI.dispatch(syncItem(item));   
    if(item === 'investments') thunkAPI.dispatch(syncItem('transfers'));
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
    const state = thunkAPI.getState();
    const prevEntry = state[item].entries[entry.block].find(currentEntry => currentEntry.id === entry.id);

    if(prevEntry.group !== entry.group || prevEntry.title !== entry.title){
      let promises = [updateEntries(item, entry)];
      if(item === 'investments') promises.push(updateEntries('transfers', entry));
    
      let responses = await Promise.all(promises);
      responses.push(await updateEntry(item, entry));

      thunkAPI.dispatch(syncItem(item));   
      if(item === 'investments') thunkAPI.dispatch(syncItem('transfers'));
      return responses.map(currentResponse => currentResponse.data); 
      // returns [{item: 'resources', entries: []}]
      // ...or [{item: 'investments', entries: []}, {item: 'transfers', entries: []}]
    }

  const response = await updateEntry(item, entry);

  thunkAPI.dispatch(syncItem(item)); 
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
    setAssets: (state, action) => {
      const items = Object.keys(action.payload.assets);
      items.map(currentItem => {
        const entries = action.payload.assets[currentItem];
        state[currentItem] = populateItem(entries);
      });
    },

    setItem: (state, action) => {
      const item = action.payload.item;
      const entries = action.payload.entries;
      state[item] = populateItem(entries);    
    },

    calcOverview: (state) => {
      state.overview = {}; // pending... continue here!

    },

    calcResources: (state) => {
      console.log('calcResources reducer dispatched');
      const blocks = Object.keys(state.resources).sort();
      // complement all entries
      let closingBalances = {};
      state.resources[blocks[0]].entries.map(currentEntry => {
        closingBalances[currentEntry.id] = 0;
      });
      for (let i = 0; i < blocks.length; i++){
        state.resources[blocks[i]].entries.map((currentEntry, currentIndex) => {

          const openingBalance = closingBalances[currentEntry.id];
          const difference = currentEntry.closingBalance - openingBalance;

          state.resources[blocks[i]].entries[currentIndex] = {
            ...currentEntry,
            openingBalance,
            difference,
          }
          closingBalances[currentEntry.id] = currentEntry.closingBalance;
        })
      }
      // add closingBalance for each block
      blocks.map(currentBlock => {
        state.resources[currentBlock].closingBalance = state.resources[currentBlock].entries.reduce((blockClosingBalance, entry) => {
          return blockClosingBalance + entry.closingBalance;
        }, 0);
      });
    },

    calcInvestments: (state) => {
      const blocks = Object.keys(state.investments).sort();
      // complement all entries
      let closingBalances = {};
      state.investments[blocks[0]].entries.map(currentEntry => {
        closingBalances[currentEntry.id] = 0;
      });

      for (let i = 0; i < blocks.length; i++){
        const taxRate = getTaxRate(blocks[i]);

        state.investments[blocks[i]].entries.map((currentEntry, currentIndex) => {

          const transfersEntries = state.transfers[blocks[i]].entries.filter(currentTransfer => currentTransfer.title === currentEntry.title && currentEntry.date.includes(blocks[i]));
          const closingDaysPassed = getDaysPassed(currentEntry.date);
          const weightedTransfers = transfersEntries.reduce((transfersSum, currentTransfer) => {
            const transferDaysPassed = getDaysPassed(currentTransfer.date);
            if (transferDaysPassed > closingDaysPassed) {
              return transfersSum;
            } else {
              return transfersSum + currentTransfer.amount * (closingDaysPassed - transferDaysPassed) / 365;
            }
          }, 0);

          const transfers = transfersEntries.reduce((transfersSum, currentTransfer) => {return transfersSum + currentTransfer.amount}, 0);
          const openingBalance = closingBalances[currentEntry.id];
          const grossProfit = currentEntry.closingBalance - openingBalance - currentEntry.bonus + currentEntry.withheldTaxes - transfers;
          const dueTaxes = grossProfit * taxRate;
          const netProfit = grossProfit + currentEntry.bonus - grossProfit * taxRate;
          const ROI = Math.round(grossProfit / (openingBalance * closingDaysPassed / 365 + weightedTransfers) * 1000) / 10;

          state.investments[blocks[i]].entries[currentIndex] = {
            ...currentEntry,
            openingBalance,
            transfers,
            grossProfit,
            dueTaxes,
            netProfit,
            ROI,
          }
          closingBalances[currentEntry.id] = currentEntry.closingBalance;
        })
      }
      // complement overall block
      // ....

      // add closingBalance for each block
      blocks.map(currentBlock => {
        state.investments[currentBlock].closingBalance = state.investments[currentBlock].entries.reduce((blockClosingBalance, entry) => {
          return blockClosingBalance + entry.closingBalance;
        }, 0);
      });
      //add netProfit for each block
      blocks.map(currentBlock => {
        state.investments[currentBlock].netProfit = state.investments[currentBlock].entries.reduce((blockNetProfit, entry) => {
          return blockNetProfit + entry.netProfit;
        }, 0);
      });
    },

    calcTransfers: (state) => {
      const blocks = Object.keys(state.transfers).sort();
      // add amount for each block
      blocks.map(currentBlock => {
        state.transfers[currentBlock].amount = state.transfers[currentBlock].entries.reduce((blockAmount, entry) => {
          return blockAmount + entry.amount;
        }, 0);
      });
    },

    calcExpanses: (state) => {
      const blocks = Object.keys(state.expanses).sort();
      // complement all entries
      for (let i = 0; i < blocks.length; i++){
        state.expanses[blocks[i]].entries.map((currentEntry, currentIndex) => {

          const amountMonthly = currentEntry.amountYearly / 12;

          state.expanses[blocks[i]].entries[currentIndex] = {
            ...currentEntry,
            amountMonthly,
          }
        })
      }
      // add amount for each block
      blocks.map(currentBlock => {
        state.expanses[currentBlock].amountYearly = state.expanses[currentBlock].entries.reduce((blockAmount, entry) => {
          return blockAmount + entry.amountYearly;
        }, 0);
        state.expanses[currentBlock].amountMonthly = state.expanses[currentBlock].amountYearly / 12;
      });
    },
    calcPension: (state) => {
      const blocks = Object.keys(state.pension).sort();
      // add amount for each block
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
        state.status = 'loading';
      })
      .addCase(syncItem.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(syncItem.rejected, (state) => {
        state.status = 'error';
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

export {syncAssets, syncItem}; //export thunks for usage in app

export const selectAssetsItem = (state, item) => state.assets[item]; //declare and export selector which returns (altered) state for usage in app

export default assetsSlice.reducer; //export slice for setting up store




