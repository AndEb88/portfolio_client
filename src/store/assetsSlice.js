import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchAssests, deleteEntry, updateEntry, createEntry, deleteAccount, updateAccount, createAccount} from './assetsAPI';

const initialState = {}; //declare initial state mockDatabase

// 1. DONE - createAsyncThunks like 'assets/fetchData' with API calls from assetsAPI
// 2. DONE - code API calls that access the database (for now just access a mockStore declared with 'let')
// 3. DONE - add timer for debugging purpose (in order to check if pending and rejected case work)
// 4. reducers shall update the store, but their actions are only called by extra reducers
// 5. after initial fetch and any update, also the corresponding dynamic data (that doesn't rely on db) require reducers to update
// 4. extra reducers call reducers to update the store

const mainIndex = 2;

function findAvailableId(itemIndex, block, state) {
 
  const ids = state[mainIndex][itemIndex]
    .filter(currentEntry => currentEntry.block === block)
    .map(currentEntry => currentEntry.id).sort();

  let expected = 1;

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
  async (itemIndex, item, entry, thunkAPI) => {
    const state = thunkAPI.getState();
    const newId = findAvailableId(itemIndex, entry.block, state);
    const newEntry = {...entry, id: newId}
    const response = await createEntry(item, newEntry);
    return response.data;
  }
);

export const deleteAssetsAccount = createAsyncThunk(
  'assets/deleteAccount',
  async (itemIndex, item, entry, thunkAPI) => {
    const state = thunkAPI.getState();
    const blocks = state[mainIndex][itemIndex]
      .filter(currentBlock => currentBlock.block !== 'overall')
      .map(currentBlock => currentBlock.block); 
    const response = await Promise.all(blocks.map(currentBlock => deleteEntry(item, currentBlock, entry)));
    return response.data; //returns an array of objects instead of a single object
  }
);

export const updateAssetsAccount = createAsyncThunk(
  'assets/updateAccount',
  async (itemIndex, item, entry, thunkAPI) => {
    const state = thunkAPI.getState();
    const blocks = state[mainIndex][itemIndex]
      .filter(currentBlock => currentBlock.block !== 'overall')
      .map(currentBlock => currentBlock.block);
    const response = await Promise.all(blocks.map(currentBlock => updateEntry(item, currentBlock, entry)));
    return response.data; //returns an array of objects instead of a single object
  }
);

export const createAssetsAccount = createAsyncThunk(
  'assets/createAccount',
  async (itemIndex, item, entry, thunkAPI) => {
    const state = thunkAPI.getState();
    const blocks = state[mainIndex][itemIndex]
      .filter(currentBlock => currentBlock.block !== 'overall' && Number(currentBlock.block) >= Number(entry.block))
      .map(currentBlock => currentBlock.block);       
    const response = await Promise.all(blocks.map(currentBlock => {
      const newId = findAvailableId(itemIndex, currentBlock, state);
      const newEntry = {...entry, id: newId};
      return createEntry(item, currentBlock, newEntry);
    }));
    return response.data; //returns an array of objects instead of a single object
  }
);


export const counterSlice = createSlice({
  name: 'assets',
  initialState,
  // calc data (keys outside entries) for each item  based on database
  // and sort arrays (and blocks)
  reducers: {
    setBlocks: (state) => {
      state.value += 1;
      //only when syncing all data
    },
    calcOverview: (state) => {
      state.value -= 1;
    },
    calcResources: (state, action) => {
      state.value += action.payload;
    },
    calcInvestments: (state) => {
      state.value -= 1;
    },
    calcTransfers: (state) => {
      state.value -= 1;
    },
    calcExpanses: (state) => {
      state.value -= 1;
    },
    calcPension: (state) => {
      state.value -= 1;
    },
  },

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




