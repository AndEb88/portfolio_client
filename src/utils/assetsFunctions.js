export function toAmountElement (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    return (<>{integer}<span class='decimals'> {decimals}</span></>)
}

export function toPercentElement (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    return (<>{integer}<span class='decimals'> {decimals}</span></>)
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