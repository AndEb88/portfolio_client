export    function toAmount (number){
    const integer = Math.floor(number).toLocaleString();
    const decimals = (number % 1).toFixed(2).slice(2);
    return (<>{integer}<span class='decimals'> {decimals}</span></>)
}