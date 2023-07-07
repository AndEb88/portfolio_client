export function toAmountElement (number, sign = false){
    let prefix = '';
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    if (sign && number > 0){prefix = '+'}
    return (<>{prefix}{integer}<span class='decimals'> {decimals}</span></>)
}

export function toPercentElement (number, sign = false){
    let prefix = '';
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    if (sign && number > 0){prefix = '+'}
    return (<>{prefix}{integer}<span class='decimals'> {decimals}</span></>)
}