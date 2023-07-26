import mockAssets from '../utils/mockAssets';


export function fetchAssets() {
    // return entire assets mockStore
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {assets: mockAssets}}), 1000)
    );
}

export function fetchItem(item) {
    // return specified item from mockStore
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries: mockAssets[item]}}), 1000)
    );
}

export function createEntries(item, entries) {
    // create entries for all blocks
    mockAssets[item].push(...entries);
      
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries}}), 1000)
    );
}

export function updateEntry(item, entry) {
    // update entry
    const entryIndex = mockAssets[item].findIndex(currentEntry => {
        return currentEntry.id === entry.id && currentEntry.block === entry.block;
    });
    mockAssets[item][entryIndex] = entry;

    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entry}}), 1000)
    );
}

export function updateNaming(item, entry, prevEntry) {
    // update entries (group and title only) with same title in all blocks 
    let entryIndexes = mockAssets[item]
        .map((currentEntry, entryIndex) => {if(currentEntry.title === prevEntry.title) return entryIndex;})
        .filter(currentIndex => currentIndex !== undefined);

    const updatedEntries = entryIndexes.map(currentIndex => mockAssets[item][currentIndex] = {...mockAssets[item][currentIndex], group: entry.group, title: entry.title})

    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries: updatedEntries}}), 1000)
    );
}

export function deleteEntries(item, entry, byTitle) {
    // delete entries with same id in all blocks
    // BUG: when investments account is deleted, transfers will receive the investments id for deletion :( 
    console.log('deleting');
    console.log(item);
    console.log(entry);
    let key = 'id';

    if (byTitle){
        key = 'title';
    }
    const entryIndexes = mockAssets[item]
        .map((currentEntry, entryIndex) => {if(currentEntry[key] === entry[key]) return entryIndex;})
        .filter(currentIndex => currentIndex !== undefined)
        .reverse();
  
    console.log(entryIndexes);
    const deletedEntries = (entryIndexes.map(currentIndex => mockAssets[item].splice(currentIndex, 1))).flat();
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries: deletedEntries}}), 1000)
    );
}




  