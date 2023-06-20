import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAssests, deleteEntry, updateEntry, createEntry, deleteAccount, updateAccount, createAccount} from './assetsAPI';

const initialState = {}; //declare initial state mockDatabase

// 1. DONE - createAsyncThunks like 'assets/fetchData' with API calls from assetsAPI
// 2. DONE - code API calls that access the database (for now just access a mockStore declared with 'let')
// 3. DONE - add timer for debugging purpose (in order to check if pending and rejected case work)
// 4. DONE - refactor state to nested objects (instead of arrays?) main -> item -> block -> calcValues & entries array
// 5. Rename newMockStore to mockStore and refactor existing code to treat keys instead of indexes
// 6. reducers shall update the store
// 7. extra reducers shall call reducers accordingly
// (after initial fetch and any update, also the corresponding dynamic data (that doesn't rely on db) require reducers to update)
// 8. if a value is not defined, what will the db return? how to handle it on client side?

const main = 'assets';

function findAvailableId(item, block, state) {
 
  const ids = state[main][item][block].entires
    .map(currentEntry => currentEntry.id).sort();

  let expected = 0;

  for (let i = 0; i < ids.length; i++) {
      expected++;
      if (ids[i] !== expected) {
        return expected;
      }
  }
  return ids.length;
}

// The value we return becomes the `fulfilled` action payload

export const syncAssets = createAsyncThunk(
  'assets/fetchAssests',
  async () => {
    const response = await fetchAssests();
    return response.data;
  }
);

export const syncItem = createAsyncThunk(
  'assets/fetchItem',
  async () => {
    const response = await fetchItem(item);
    return response.data;
  }
);

export const deleteAssetsEntry = createAsyncThunk(
  'assets/deleteEntry',
  async (item, entry) => {
    const response = await deleteEntry(item, entry);
    return response.data;
  }
);

export const updateAssetsEntry = createAsyncThunk(
  'assets/updateEntry',
  async (item, entry) => {
    const response = await updateEntry(item, entry);
    return response.data;
  }
);

export const createAssetsEntry = createAsyncThunk(
  'assets/createEntry',
  async (item, entry, thunkAPI) => {
    const state = thunkAPI.getState();
    const newId = findAvailableId(item, entry.block, state);
    const newEntry = {...entry, id: newId}

    const response = await createEntry(item, newEntry);
    return response.data;
  }
);

export const deleteAssetsAccount = createAsyncThunk(
  'assets/deleteAccount',
  async (item, entry, thunkAPI) => {
    const state = thunkAPI.getState();
    const blocks = Object.keys(state[main][item]);

    const promises = blocks
      .filter(currentBlock => currentBlock !== 'overall')
      .map(currentBlock => deleteEntry(item, {block: currentBlock, id: entry.id}));
    
    const response = await Promise.all(promises);
    return response.data; //returns an array of objects instead of a single object
  }
);

export const updateAssetsAccount = createAsyncThunk(
  'assets/updateAccount',
  async (item, entry, thunkAPI) => {
    const state = thunkAPI.getState();
    const oldEntry = state[main][item][block].find(currentEntry => currentEntry.id === entry.id);   
    let promises = [];

    if(oldEntry.group !== entry.group || oldEntry.title !== entry.title){ 
      const blocks = Object.keys(state[main][item]);
      promises = await Promise.all (blocks
        .filter(currentBlock => currentBlock !== 'overall')
        .map(currentBlock => updateEntry(item, {block: currentBlock, group: entry.group, title: entry.title})));
    }
    promises.push(updateEntry(item, entry));
    const response = await Promise.all(promises); 
    return response.data; //returns an array of objects instead of a single object
  }
);

export const createAssetsAccount = createAsyncThunk( 
  'assets/createAccount',
  async (item, entry, thunkAPI) => {
    const state = thunkAPI.getState();
    const oldEntry = state[main][item][block].find(currentEntry => currentEntry.id === entry.id);   
    let promises = [];

    const blocks = Object.keys(state[main][item]);
    promises = await Promise.all (blocks
      .filter(currentBlock => currentBlock !== 'overall')
      .map(currentBlock => createEntry(item, {block: currentBlock, group: entry.group, title: entry.title})));

    promises.push(createEntry(item, entry));
    const response = await Promise.all(promises); 
    return response.data; //returns an array of objects instead of a single object
  }
);


export const counterSlice = createSlice({
  name: 'assets',
  initialState,
  // calc data (keys outside entries) for each item  based on database
  // and sort arrays (and blocks)
  // state is representing store.assets
  reducers: {
    setBlocks: (state, action) => {
      state = action.payload;      
      //call when syncing assests or item for assigning entries to blocks -> block: {entries: [...entriesHere]}
      //... and then calc all dynamic data (overall and accumulated values and overview)!
    },
    calcOverview: (state, action) => {
      state.overview = {};
    },
    calcResources: (state, action) => {
      state.resources = {};
    },
    calcInvestments: (state, action) => {
      state.investments = {};
    },
    calcTransfers: (state, action) => {
      state.transfers = {};
    },
    calcExpanses: (state, action) => {
      state.expanses = {}
    },
    calcPension: (state, action) => {
      state.value -= 1;
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




