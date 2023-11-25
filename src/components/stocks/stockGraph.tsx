import Plot from 'react-plotly.js';
import Data from 'react-plotly.js';
import { useEffect, useState } from 'react';
import axios from 'axios';


export default function StockGraph(props: { symbol: string }) {
  const [dates, setDates] = useState<string[]>([]);
  const [close, setClose] = useState<number[]>([]);
  const [open, setOpen] = useState<number[]>([]);
  const [high, setHigh] = useState<number[]>([]);
  const [low, setLow] = useState<number[]>([]);

  useEffect(() => {
    axios
      .get(URL(props.symbol))
      .then((resp) => resp.data)
      .then((data) => {
        const _data = data['Time Series (Daily)'];
        setDates(Object.keys(_data));
        let temp = [], temp2 = [], temp3 = [], temp4 = []
        for (let item in _data) {
          let x = _data[item];
          temp.push(parseFloat(x['4. close']));
          temp2.push(parseFloat(x['1. open']));
          temp3.push(parseFloat(x['2. high']));
          temp4.push(parseFloat(x['3. low']));

          // setClose(close.concat(parseFloat(x['4. close'])));
          // setOpen(open.concat(parseFloat(x['1. open'])));
          // setHigh(high.concat(parseFloat(x['2. high'])));
          // setLow(low.concat(parseFloat(x['3. low'])));
        }
        setClose(temp);
        setOpen(temp2);
        setHigh(temp3);
        setLow(temp4);
      })
      .catch((err) => console.log(err));
  }, []);

    const layout = {
        showlegend: false,
        xaxis: {
          // autorange: true,
          type: 'date',
          title: 'Date',
        },
        yaxis: {
          type: 'linear',
        }
    };
  
    // close open high low

  return (
    <>
    <Plot
      data={[{
        x: dates,
        close: close,
        open: open,
        high: high,
        low: low,
        type: 'candlestick'
      }]}
      layout={
        {
          showlegend: false,
          xaxis: {
          // autorange: true,
          type: 'date',
          title: 'Date',
          },
          yaxis: {
          type: 'linear',
          }
      }}
      config={{ responsive: true }}
    />
    </>
  );
}

function URL(symbol: string) {
  const key = 'apikey=UPW9PUE4R389WR34';
  const fcn = 'function=TIME_SERIES_DAILY';
  const opts = `symbol=${symbol}&outputsize=full`;
  return `https://www.alphavantage.co/query?${fcn}&${opts}&${key}`;
}
