import { useEffect } from "react";

export function StockTable() {


}



function StockRow(props: {name:string, price:string, changeAmount:string, percentChange:string}){
    return (
        <div className="flex">
            <h4>{props.name}</h4>
            <h4>{props.price}</h4>
            <h4>{formatNumber(props.changeAmount)}</h4>
            <h4>{formatNumber(props.percentChange)+'%'}</h4>
        </div>
    );
}

/**Trims number string to only have 2 characters after decimal */
function formatNumber(num:string){
    let x = num.split('.');
    return `${x[0]}.${x[1].substring(0, 2)}`;
}