export function toAmountElement (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    return (<>{integer}<span className='decimals'> {decimals}</span></>)
}

export function toPercentElement (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    return (<>{integer}<span className='decimals'> {decimals}</span></>)
}

export function toAmount (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    return integer + ',' + decimals;
}

export function toPercent (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    return integer + ',' + decimals;
}

export function toNumber (text){
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