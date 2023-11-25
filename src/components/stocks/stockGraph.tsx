import Plot from 'react-plotly.js';
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
        }
        setClose(temp);
        setOpen(temp2);
        setHigh(temp3);
        setLow(temp4);
      })
      .catch((err) => console.log(err));
  }, []);


  return (
    <Plot
      data={[{
        x: dates,
        close: close,
        open: open,
        high: high,
        low: low,
        type: 'candlestick',
      }]}
      layout={{
        showlegend: false,
        title: props.symbol.toUpperCase(),
        xaxis: {
          autorange: true,
          type: 'date',
        },
          yaxis: {
          autorange: true,
          type: 'linear',
        }
      }}
      config={{ responsive: true}}
    />
  );
}

function URL(symbol: string) {
  const key = 'apikey=UPW9PUE4R389WR34';
  const fcn = 'function=TIME_SERIES_DAILY';
  const opts = `symbol=${symbol.replace(/[^\w\s]/gi, '')}&outputsize=full`;
  return `https://www.alphavantage.co/query?${fcn}&${opts}&${key}`;
}
