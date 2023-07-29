import content from '../utils/content';


export function getAvailableId(item, block, state) { 
    const ids = state[item][block].entries
      .map(currentEntry => currentEntry.id)
      .sort((a, b) => a - b);
    let expected = 1;
    for (let i = 0; i < ids.length; i++) {        
        if (ids[i] !== expected) {
          return expected;
        }
        expected++;
    }
    return ids.length + 1;
  }
  
   export function getTaxRate(year) {
    for (const currentYear in content[2].taxRates) {
      if (year >= currentYear) {
        return content[2].taxRates[currentYear];
      }
    }
  }
  
   export function roundAmount(number){
    let rounded = Math.round(number * 100) / 100;
    if(rounded === 0){
      rounded = Math.abs(rounded);
    }
    return rounded;
  }
  
   export function calcROI(profit, transfers){
    if(!profit || !transfers){
      return '-';
    }
    const number = profit / transfers;
    let rounded = Math.round(number * 1000) / 10;
    if(rounded === 0){
      rounded = Math.abs(rounded);
    }
    return rounded.toFixed(1);
  }
  
   export function getDaysPassed(date, year) {
    const providedDate = new Date(date);
    const startOfYear = new Date(year, 0, 1);   
    const timeDifference = providedDate.getTime() - startOfYear.getTime();
    const daysPassed = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    if(daysPassed > 365) return 365;
    return daysPassed;
  }