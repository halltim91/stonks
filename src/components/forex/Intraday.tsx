import React, { useState, useEffect } from 'react';
import ApiReq, { apiReqData, preReq } from './apiReq';
import axios from 'axios';
import { ReactNode } from 'react';

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

const Intraday: React.FC<{ toCurrency: string | undefined }> = (props) => {
  const [intradayData, setIntradayData] = useState<IntradayInfo>();

  useEffect(() => {
    const fetchData = async () => {
      console.log("to currency :", props.toCurrency);

      const url = `https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=USD&to_symbol=${props.toCurrency}&interval=5min&apikey=${apiReqData.apiKey}`;
      console.log("url :", url);
      
      const response = await axios.get(url);

      setIntradayData(response.data);
    };
    fetchData();
  }, []);

  return (<div>
    <h1>Intraday</h1>
    <p>{intradayData?.['Meta Data']['1. Information']}</p>
    </div>)
};

export default Intraday;
