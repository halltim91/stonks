import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Frame from '../frame';
//axios.defaults.timeout = 3000;


interface CurrencyConversion{
    param: {from: string, to: string, q: string}
    result: any
}

const CurrencyExchange = () => {
  const [exchangeData, setExchangeData] = useState<CurrencyConversion[]>();


  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'https://currency-exchange.p.rapidapi.com/exchange';
      const apiKey = '3dc26677dbmshc80792c1985d15ep1e2709jsn5aa6a266df60';
      const headers = {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com',
      };
    const countryCodes =["SGD","MYR","EUR"]; //,"USD" //,"AUD","JPY"]; //,"CNH"];//,"HKD","CAD","INR","DKK","GBP","RUB","NZD","MXN","IDR","TWD","THB","VND"];
    const CurrencyArray: CurrencyConversion[] = []
    for(let i = 0 ; i < countryCodes.length; i++) {
        CurrencyArray.push({param:{from: 'USD', to: countryCodes[i], q: '1.0'}, result: null})
    }

      try {
        for(let j=0 ; j < CurrencyArray.length ; j++){
            const params = CurrencyArray[j].param
            const response = await axios.get(apiUrl, { headers, params});
            CurrencyArray[j].result = response.data.toFixed(2)
            console.log("result :", CurrencyArray[j].result)
        }
        console.log(CurrencyArray)
        
        setExchangeData(CurrencyArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    
  }, []); 

 
  return (
    <Frame title='Currency Exchange'>
    <div>    
      {exchangeData && (
        <div>
          <p>Currency Conversion: </p>
                <table>
        <thead>
          <tr className='row'>
            <th className='col'>From</th>
            <th className='col'> To</th>
            <th className='col'>Rate</th>
          </tr>
        </thead>      
          <tbody className="data">            
               {exchangeData.map((entry) => (
              <tr className='row' key={entry.param.to}>
                <td className='col'>{entry.param.from}</td>
                <td className='col'>{entry.param.to}</td>
                <td className='col'>{entry.result}</td>
              </tr>
            ))}
          </tbody>
       
      </table>
        </div>
        
      )}
    </div>
    </Frame>
  );
};

export default CurrencyExchange;
