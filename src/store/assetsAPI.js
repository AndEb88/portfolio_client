import mockAssets from '../utils/mockAssets';


// API must update the datbase only
// reducers must update the store only

export function fetchAssests() {
    //return entire assets mockStore
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: mockAssets}), 1000)
    );
}

export function fetchItem(item) {
    //return specified item from mockStore
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: mockAssets[item]}), 1000)
    );
}

export function deleteEntry(item, entry) {
    //delete entry
    const entryIndex = mockAssets[item].findIndex(currentEntry => {
        return currentEntry.id === entry.id && currentEntry.block === entry.block;
    });
    const [deletedEntry] = mockAssets[item].splice(entryIndex, 1);
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, deletedEntry}}), 1000)
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

export function createEntry(item, entry) {
    //create entry
    mockAssets[item].push(entry);
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, entry}}), 1000)
    );
}



  