import mockAssets from '../utils/mockAssets';


//API must update the datbase only
//reducers must update the store only
//'mockAssets' is structured by 'item' keys containing and arrays of entries
//destructure entries and pass only keys that are stored in database 

export function fetchAssests() {
    //return entire assets mockStore
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {assets}}), 1000)
    );
}

export function fetchItem(item) {
    //return specified item from mockStore
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries: mockAssets[item]}}), 1000)
    );
}

export function deleteEntry(item, entry) {
    //delete entry
    const entryIndex = mockAssets[item].findIndex(currentEntry => {
        return currentEntry.id === entry.id && currentEntry.block === entry.block;
    });
    const [deletedEntry] = mockAssets[item].splice(entryIndex, 1);

    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entry: deletedEntry}}), 1000)
    );
}

export function deleteEntries(item, entry) {
    //delete entries with same id in all blocks 
    const entryIndexes = mockAssets[item].map((currentEntry, entryIndex) => { 
        if(currentEntry.id === entry.id) {
            return entryIndex;
        }
    });
    const deletedEntries = (entryIndexes.map(currentIndex => mockAssets[item].splice(currentIndex, 1))).flat();

    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries: deletedEntries}}), 1000)
    );
}

export function updateEntry(item, entry) {
    //update entry
    const entryIndex = mockAssets[item].findIndex(currentEntry => {
        return currentEntry.id === entry.id && currentEntry.block === entry.block;
    });
    mockAssets[item][entryIndex] = entry;

    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entry}}), 1000)
    );
}

export function updateEntries(item, entry) {
    //update entries (group and title only!) with same id in all blocks 
    const entryIndexes = mockAssets[item].map((currentEntry, entryIndex) => { 
        if(currentEntry.id === entry.id) {
            return entryIndex;
        }
    });
    const updatedEntries = entryIndexes.map(currentIndex => mockAssets[item][currentIndex] = {...mockAssets[item][currentIndex], group: entry.group, title: entry.title})

    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries: updatedEntries}}), 1000)
    );
}

export function createEntry(item, entry) {
    //create entry
    mockAssets[item].push(entry);

    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entry}}), 1000)
    );
}

export function createEntries(item, entries) {
    //create entries (block, id, group and title only) for all blocks
    mockAssets[item].push(...entries);
      
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries}}), 1000)
    );
}

export function createBlock(item, entries) {
    //create entries (block, id, group and title only) for all blocks
    mockAssets[item].push(...entries);
      
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries}}), 1000)
    );
}


  