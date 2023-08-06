import mockAssets from '../utils/mockAssets';

function capitalize (string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function fetchAssets() {
    // return entire assets mockStore
    const assets = mockAssets;
    const message = 'Fetched all data';
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {assets, message}}), 1000)
    );
}

export function fetchItem(item) {
    // return specified item from mockStore
    const entries = mockAssets[item];
    const message = `Fetched ${capitalize(item)} data`;
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entries, message}}), 1000)
    );
}

export function createEntries(item, entries) {
    // create entries for all blocks
    mockAssets[item].push(...entries);
    
    const message = `Created ${entries.length} entries in ${capitalize(item)}`;
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {message}}), 1000)
    );
}

export function updateEntry(item, entry) {
    // update entry
    const entryIndex = mockAssets[item].findIndex(currentEntry => {
        return currentEntry.id === entry.id && currentEntry.block === entry.block;
    });
    mockAssets[item][entryIndex] = entry;

    const message = `Updated entry in ${capitalize(item)}`;
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {message}}), 1000)
    );
}

export function updateNaming(item, entry, prevEntry) {
    // update entries (group and title only) with same title in all blocks 
    let entryIndexes = mockAssets[item]
        .map((currentEntry, entryIndex) => {if(currentEntry.title === prevEntry.title) return entryIndex;})
        .filter(currentIndex => currentIndex !== undefined);

    const updatedEntries = entryIndexes.map(currentIndex => mockAssets[item][currentIndex] = {...mockAssets[item][currentIndex], group: entry.group, title: entry.title})

    const message = `Renamed ${updatedEntries.length} entries in ${capitalize(item)}`;
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {message}}), 1000)
    );
}

export function deleteEntries(item, entry, byTitle) {
    let key = 'id';
    if (byTitle){
        key = 'title';
    }
    const entryIndexes = mockAssets[item]
        .map((currentEntry, entryIndex) => {if(currentEntry[key] === entry[key]) return entryIndex;})
        .filter(currentIndex => currentIndex !== undefined)
        .reverse();
    const deletedEntries = (entryIndexes.map(currentIndex => mockAssets[item].splice(currentIndex, 1))).flat();

    const message = `Deleted ${deletedEntries.length} ${entry.group} ${entry.title} entries from ${capitalize(item)}`;
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {message}}), 1000)
    );
}




  