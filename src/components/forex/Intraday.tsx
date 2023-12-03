import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { apiReqData } from './apiReq';

export interface IntradayInfo {
  'Meta Data': {
    '1. Information': string;
    '2. From Symbol': string;
    '3. To Symbol': string;
  };
  'Time Series FX (5min)': {
    [timeStamp: string]: {
      '1. open': string;
      '2. high': string;
      '3. low': string;
      '4. close': string;
    };
  };
}

function Intraday(props: { toCurrency: string | undefined}) {
  const [intradayData, setIntradayData] = useState<IntradayInfo>();

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=USD&to_symbol=${props.toCurrency}&interval=5min&apikey=${apiReqData.apiKey}`;
      
      const response = await axios.get(url);

      setIntradayData(response.data);
    };
    fetchData();
  }, [props.toCurrency]);

  const chartData = Object.entries(intradayData?.['Time Series FX (5min)'] || {}).map(
    ([time, values]) => ({
      x: new Date(time),
      open: parseFloat(values['1. open']),
      high: parseFloat(values['2. high']),
      low: parseFloat(values['3. low']),
      close: parseFloat(values['4. close']),
    })
  );

  const layout = {
    title: `Intraday Chart (${props.toCurrency})`,
    xaxis: {
      type: 'date' as const,
      title: 'Time',
    },
    yaxis: {
      title: 'Price',
    },
  };

  return (
    <div>
      <h1>Intraday</h1>
      <p>{intradayData?.['Meta Data']['1. Information']}</p>
      <Plot data={[{
        type: 'candlestick',
        x: chartData.map(data => data.x),
        open: chartData.map(data => data.open),
        high: chartData.map(data => data.high),
        low: chartData.map(data => data.low),
        close: chartData.map(data => data.close),
      }]} layout={layout} />
    </div>
  );
};

export default Intraday;
