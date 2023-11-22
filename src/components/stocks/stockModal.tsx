import {useState, useEffect} from 'react';
import axios from 'axios';
import BasicModal from '../modal';

const WEEKLY: string = 'TIME_SERIES_WEEKLY';

export default function StockModal(props: {symbol: string}){
    const [data, setData] = useState([]);


    useEffect(() => {
        axios
        .get(getURL(WEEKLY, props.symbol))
        .then((resp) => resp.data)
        .then((data) => {
            console.log(data);
        })
    },[]);

    return (
    <BasicModal title={props.symbol}>
        <div></div>
    </BasicModal>);
}

function getURL(fcn: string, symbol: string){
    return `https://www.alphavantage.co/query?function=${fcn}&symbol=${symbol}&apikey=UPW9PUE4R389WR34`;
}