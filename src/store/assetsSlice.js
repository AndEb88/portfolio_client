import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAssests, deleteEntry, deleteEntries, updateEntry, updateEntries, createEntry, createEntries} from './assetsAPI';

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

function populateItem(entries) {
  const item = entries.reduce((block, entry) => { 
    const group = entry.group;
    if (!block[group]) {
      block[group] = {entries: []};
    }
    block[group].entries.push(entry);
    return block;
  }, {});
  return item;
}


export const syncAssets = createAsyncThunk(
  'assets/syncAssests',
  async ({}, thunkAPI) => {

    const response = await fetchAssests();

    //const json = await response.json(); returns response.data directly
    //required for JSON responses from database (?!?)    
    thunkAPI.dispatch(counterSlice.actions.setAssets(response.data));
    thunkAPI.dispatch(counterSlice.actions.calcResources());
    thunkAPI.dispatch(counterSlice.actions.calcInvestments());
    thunkAPI.dispatch(counterSlice.actions.calcTransfers());
    thunkAPI.dispatch(counterSlice.actions.calcExpanses());
    thunkAPI.dispatch(counterSlice.actions.calcPension());
    thunkAPI.dispatch(counterSlice.actions.calcOverview());
    return response.data; 
    //returns {assets}
  }
);

export const syncItem = createAsyncThunk(
  'assets/syncItem',
  async ({}, thunkAPI) => {

    const response = await fetchItem(item);
    
    thunkAPI.dispatch(counterSlice.actions.setItem(response.data));
    switch (item){
      case 'resources':
        thunkAPI.dispatch(counterSlice.actions.calcResources());
        thunkAPI.dispatch(counterSlice.actions.calcOverview());
        break;
      case 'investments':
        thunkAPI.dispatch(counterSlice.actions.calcInvestments());
        thunkAPI.dispatch(counterSlice.actions.calcOverview());
        break;
      case 'transfers':
        thunkAPI.dispatch(counterSlice.actions.calcTransfers());
        break;
      case 'expanses':
        thunkAPI.dispatch(counterSlice.actions.calcExpanses());
        break;
      case 'pension':
        thunkAPI.dispatch(counterSlice.actions.calcPension());
        break;      
    }
    return response.data; 
    //returns {item, entries}
  }
);

export const deleteAssetsEntry = createAsyncThunk(
  'assets/deleteEntry',
  async ({item, entry}, thunkAPI) => {

    const response = await deleteEntry(item, entry);

    thunkAPI.dispatch(syncItem(item));
    if(item ==='transfers') {
      thunkAPI.dispatch(counterSlice.actions.calcResources());
      thunkAPI.dispatch(counterSlice.actions.calcOverview());
    }
    return response.data; 
    //returns {item, entry}
  }
);

export const updateAssetsEntry = createAsyncThunk(
  'assets/updateEntry',
  async ({item, entry}, thunkAPI) => {

    const response = await updateEntry(item, entry);

    thunkAPI.dispatch(syncItem(item));
    if(item ==='transfers') {
      thunkAPI.dispatch(counterSlice.actions.calcResources());
      thunkAPI.dispatch(counterSlice.actions.calcOverview());
    }
    return response.data; 
    //returns {item, entry}
  }
);

export const createAssetsEntry = createAsyncThunk(
  'assets/createEntry',
  async ({item, entry}, thunkAPI) => {
    const state = thunkAPI.getState();
    const newId = getAvailableId(item, entry.block, state);
    const newEntry = {...entry, id: newId};

    const response = await createEntry(item, newEntry);

    thunkAPI.dispatch(syncItem(item));
    if(item ==='transfers') {
      thunkAPI.dispatch(counterSlice.actions.calcResources());
      thunkAPI.dispatch(counterSlice.actions.calcOverview());
    }
    return response.data; 
    //returns {item, entry}
  }
);

//only for 'investments', 'assets' and 'pension' item
//delete all entries (in case of 'investments' also in 'transfers')
export const deleteAssetsAccount = createAsyncThunk(
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
export const updateAssetsAccount = createAsyncThunk(
  'assets/updateAccount',
  async ({item, entry}, thunkAPI) => {
    const prevEntry = mockStore[main][item].entries[entry.block].find(currentEntry => currentEntry.id === entry.id);

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
export const createAssetsAccount = createAsyncThunk( 
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
export const addNewYear = createAsyncThunk(
  'assets/addNewyear',
  async ({newYear}, thunkAPI) => {
    const state = thunkAPI.getState();
    const lastYear = toString(Number(year) - 1);
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

//sort accordingly in the calc functions
export const counterSlice = createSlice({
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
      state.overview = {};

    },
    calcResources: (state) => {
      const blocks = Object.keys(state.resources).sort().reverse();
      //add closingBalance for block
      blocks.map(currentBlock => {
        state.resources[currentBlock].closingBalance = state.resources[currentBlock].entries.reduce((blockClosingBalance, entry) => {
          return blockClosingBalance + entry.closingBalance;
        }, 0);
      });
      //add openingBalance and and difference for all entries
      let closingBalances = {};
      state.resources[blocks[0]].entries.map(currentEntry => {
        closingBalances[currentEntry.id] = 0;
      });
      for (let i = blocks.length - 1; i >= 0; i--){
        state.resources[blocks[i]].entries.map((currentEntry, currentIndex) => {
          state.resources[blocks[i]].entries[currentIndex].openingBalance = {
            ...currentEntry,
            openingBalance: closingBalances[currentEntry.id],
            difference: currentEntry.closingBalance - closingBalances[currentEntry.id],
          }
          closingBalances[currentEntry.id] = currentEntry.closingBalance;
        })
      }
    },
    //continue here
    calcInvestments: (state) => {
      state.investments = {};
      //remove 'group' key from state entries
      //also set update openingBalance with new closingBalance
    },
    calcTransfers: (state) => {
      state.transfers = {};
      //remove 'group' key from state entries
    },
    calcExpanses: (state) => {
      state.expanses = {}
      //remove 'group' key from state entries
    },
    calcPension: (state) => {
      state.value -= 1;
      //remove 'group' key from state entries
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
        state.value += action.payload;
      })
      .addCase(syncAssets.rejected, (state) => {
        state.status = 'error';
      })

      .addCase(syncItem.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(syncItem.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
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

export const {increment, decrement, incrementByAmount} = counterSlice.actions; //export actions defined in 'reducers' for usage in app

export const selectCount = (state) => state.counter.value; //declare and export selector which returns (altered) state for usage in app

export default counterSlice.reducer; //export slice for setting up store




