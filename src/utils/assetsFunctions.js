export function toAmountElement (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = number.toFixed(2).slice(-2);
    return (<>{integer}<span className='decimals'> {decimals}</span></>)
}

export function toPercentElement (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    return (<>{integer}<span className='decimals'> {decimals}</span></>)
}

export function toAmountString (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    return integer + ',' + decimals;
}

export function toPercentString (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    return integer + ',' + decimals;
}

export function toNumberString (text){
    return parseFloat(text.replace('.', '').replace(',', '.'));
}

export function toDate (date){
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
}

export function toShortDate (date){
    const [year, month, day] = date.split('-');
    const formattedDate = `${day}.${month}.`;
    return formattedDate;
}

export function setColorClass (value){
    if(value < 0) return 'negative-color';
    if(value > 0) return 'positive-color';
    return undefined;
}

export function setImgClass (value, pending){
    if(pending){
       if(value < 0) return 'negative-pending-img';
       if(value > 0) return 'positive-pending-img';
       return 'pending-img';
    }  
    if(value < 0) return 'negative-img';
    if(value > 0) return 'positive-img';
    return undefined;
}