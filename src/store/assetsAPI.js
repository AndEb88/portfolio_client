import mockDatabase from '../utils/mockDatabase';


// API must update the datbase
// reducers must update the store

function findItemIndex(item) {
    const itemIndex = content[2].items.find(currentItem => currentItem.route === item);
    return itemIndex;
}

//trigger after each update?
export function fetchAssests() {
    //return entire assets mockStore
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: mockDatabase[2]}), 1000)
    );
}

export function deleteEntry(item, block, entry) {
    //delete entry
    const itemIndex = findItemIndex(item);
    const entryIndex = mockDatabase[mainIndex][itemIndex].findIndex(currentEntry => {
        return currentEntry.id = entry.id && currentEntry.block === block;
    });
    mockDatabase[mainIndex][itemIndex].splice(entryIndex, 1);
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, block, entry}}), 1000)
    );
}

export function updateEntry(item, block, entry) {
    //update entry
    mockDatabase[mainIndex][itemIndex][entryIndex] = entry;
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, block, entry}}), 1000)
    );
}

export function createEntry(item, block, entry) {
    //create entry
    mockDatabase[mainIndex][item][block].push(entry);
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: {item, block, newEntry}}), 1000)
    );
}



  