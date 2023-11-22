import './stocktable.css';
import { ReactNode, useEffect, useState, ReactElement} from 'react';
import axios from 'axios';
import Frame from '../frame';
import StockModal from './stockModal';
import { idText } from 'typescript';

const URL: string =
  'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=UPW9PUE4R389WR34';

export const GAINERS = 'gainers';
export const LOSERS = 'losers';
interface StockData {
  ticker: string;
  price: string;
  change_amount: string;
  change_percentage: string;
}

// Type Property should only be either GAINERS or LOSERS consts
export function StockTable(props: { type: string, title: string }) {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState<ReactElement>();
  //const [stockList, setStockList] = useState([] as ReactNode[]);
  const [stockList, setStockList] = useState([] as ReactNode[]);

  function showModal(symbol: string){
    console.log("Clicked", symbol);
   //setStockList(stockList.concat(<p>slkfjsdlkfjsdlkfjsdlkfjsdlkfj</p>));
    //setStockList(stockList.concat(<StockModal symbol={symbol} key="7897"/>));
    setModal(<StockModal symbol={symbol}/>);
    return true;
  }

  useEffect(() => {
    console.log("blah");
    axios
      .get(URL)
      .then((resp) => resp.data)
      .then((data) => {
        if (props.type === GAINERS) {
          if (data.hasOwnProperty('top_gainers'))
            setData(data.top_gainers);
        } else if (props.type === LOSERS)
          if (data.hasOwnProperty('top_losers'))
            setData(data.top_losers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if(stockList.length === 1) stockList.pop(); // remove the error message
  if(stockList.length < 1){
    if (data !== undefined && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const { ticker } = data[i];
        stockList.push(<StockRow stock={data[i]} key={i} onClick={() => showModal(ticker)}/>);
      }
    } else {
      stockList.push(
        <p className='text-danger' key='1'>
          Request limit exceeded or Market is closed
        </p>
      );
    }
  }

  return (
    <Frame title={props.title}>
      <div className='container'>
        <HeaderRow />
        <div className=' stock-table'>
          {stockList}
        </div>
        {modal}
      </div>
    </Frame>
  );
}

function StockRow(props: { stock: StockData, onClick: ()=>{}}) {
  // const fcn = useCallback(() => onClick(props.stock.ticker),[onClick, props.stock.ticker]);
  return (
    <div className='row w-100 stock-row' onClick={props.onClick}>
      <p className='col'>{props.stock.ticker}</p>
      <p className='col'>${formatNumber(props.stock.price, 3)}</p>
      <p className='col'>${formatNumber(props.stock.change_amount, 3)}</p>
      <p className='col'>{formatNumber(props.stock.change_percentage) + '%'}</p>
    </div>
  );
}

function HeaderRow() {
  return (
    <div className='row w-100'>
      <p className='col fw-bold'>Stock</p>
      <p className='col fw-bold'>Price</p>
      <p className='col fw-bold'>Chg Amt</p>
      <p className='col fw-bold'>% Chg</p>
    </div>
  );
}

function createModal(symbol: string){
  return (<StockModal symbol={symbol}/>)
}

/**Trims number string to only have 2 characters after decimal (X.XX) */
function formatNumber(num: string, decimals = 2) {
  if (!num) return 'nothing';
  let x = num.split('.');
  return `${x[0]}.${x[1].substring(0, decimals)}`;
}
