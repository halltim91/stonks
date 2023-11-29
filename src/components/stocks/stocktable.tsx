import './stocktable.css';
import { ReactNode, useEffect, useState} from 'react';
import axios from 'axios';
import Frame from '../frame';
import StockPopUp from './stockPopup';
import StockGraph from './stockGraph';
import '../../css/table.css';

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
export function StockTable(props: { type: string; title: string }) {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [graph, setGraph] = useState<ReactNode | null>(null);
  let stockList: ReactNode[] = [];

  function showModal(symbol: string) {
    setGraph(<StockGraph symbol={symbol} />);
    setModalVisible(true);
    return true;
  }

  useEffect(() => {
    axios
      .get(URL)
      .then((resp) => resp.data)
      .then((data) => {
        if (props.type === GAINERS) {
          if (data.hasOwnProperty('top_gainers')) setData(data.top_gainers); 
        } else if (props.type === LOSERS)
          if (data.hasOwnProperty('top_losers')) {
            setData(data.top_losers);
            console.log(data);
          }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.type]);

  if (stockList.length === 1) stockList.pop(); // remove the error message
  if (stockList.length < 1) {
    if (data !== undefined && data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        const { ticker } = data[i];
        stockList.push(
          <StockRow
            type={props.type}
            stock={data[i]}
            key={i}
            onClick={() => showModal(ticker)}
          />
        );
      }
    } else {
      stockList.push(
        <tr key='1'>
          <td className='negative'>Request limit exceeded or Market is closed</td>
        </tr>
      );
    }
  }

  return (
    <Frame title={props.title}>
      <table className='stock-table'>
        <thead>
          <HeaderRow />
        </thead>
      </table>
      <div style={{ maxHeight: '33vh', overflowY: 'scroll' }}>
        <table className='stock-table'>
          <tbody style={{ maxHeight: '33vh', overflow: 'scroll' }}>
            {stockList}
          </tbody>
        </table>
      </div>
      <StockPopUp
        trigger={modalVisible}
        closeModal={() => setModalVisible(false)}
      >
        {graph}
      </StockPopUp>
    </Frame>
  );
}

function StockRow(props: {
  type: string;
  stock: StockData;
  onClick: () => {};
}) {
  const color = props.type === GAINERS ? 'positive' : 'negative';
  return (
    <tr>
      <td className='s-td'>
        <button onClick={props.onClick}>{props.stock.ticker}</button>
      </td>
      <td>${formatNumber(props.stock.price, 3)}</td>
      <td className={color}>${formatNumber(props.stock.change_amount, 3)}</td>
      <td className={color}>
        {formatNumber(props.stock.change_percentage) + '%'}
      </td>
    </tr>
  );
}

function HeaderRow() {
  return (
    <tr>
      <th className='s-td'>Stocks</th>
      <th>Price</th>
      <th>Chg Amt</th>
      <th>% Chg</th>
    </tr>
  );
}

/**Trims number string to only have 2 characters after decimal (X.XX) */
function formatNumber(num: string, decimals = 2) {
  if (!num) return 'nothing';
  let x = num.split('.');
  return `${x[0]}.${x[1].substring(0, decimals)}`;
}
