import mockAssets from '../utils/mockAssets';


//API must update the datbase only
//reducers must update the store only
//'mockAssets' is structured by 'item' keys containing and arrays of entries
//destructure entries and pass only keys that are stored in database 

export function fetchAssests() {
    //return entire assets mockStore
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {assets: mockAssets}}), 1000)
    );
}

export function fetchItem(item) {
    //return specified item from mockStore
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries: mockAssets[item]}}), 1000)
    );
}

export function deleteEntries(item, entry) {
    // delete entries with same id in all blocks
    // BUG: when investments account is deleted, transfers will receive the investments id for deletion :( 
    let entryIndexes = mockAssets[item]
        .map((currentEntry, entryIndex) => {if(currentEntry.id === entry.id) return entryIndex;})
        .filter(currentIndex => currentIndex !== undefined)
        .reverse();
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

export function updateNaming(item, entry, prevEntry) {
    //update entries (group and title only!) with same title in all blocks 
    let entryIndexes = mockAssets[item]
        .map((currentEntry, entryIndex) => {if(currentEntry.title === prevEntry.title) return entryIndex;})
        .filter(currentIndex => currentIndex !== undefined);

    const updatedEntries = entryIndexes.map(currentIndex => mockAssets[item][currentIndex] = {...mockAssets[item][currentIndex], group: entry.group, title: entry.title})

    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries: updatedEntries}}), 1000)
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


  