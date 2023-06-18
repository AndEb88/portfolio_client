// A mock function to mimic making an async request for data

import mockStore from '../utils/mockStore';

//trigger after each update?
export function fetchAssests() {
    //return entire assets mockStore
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: mockStore[2]}), 1000)
    );
}


// Entry actions are the default actions

export function deleteEntry(block, id) {
    //delete entry
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: id}), 1000)
    );
}

export function updateEntry(block, entry) {
    //update entry
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: entry}), 1000)
    );
}

export function createEntry(block, entry) {
    //create entry
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: entry}), 1000)
    );
}

// Account actions are triggered by Generic actions
// but only if action is triggered by Resources, Investments or Pension

export function deleteAccount(id) {
    //delete for all blocks
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: id}), 1000)
    );
}

export function updateAccount(id) {
    //update group & title for all blocks
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: id}), 1000)
    );
}

export function createAccount(block, entry) {
    //create for current and all previous blocks
    return new Promise((resolve) =>
        setTimeout(() => resolve({data: entry}), 1000)
    );
}


  