import React, { useState, useEffect } from 'react';
import axios from 'axios';
axios.defaults.timeout = 3000;


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
            CurrencyArray[j].result = response.data
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
    <div>
      <h2>Currency Exchange</h2>
      
      {exchangeData && (
        <div>
          <p>Currency Conversion: </p>
                <table>
        <thead>
          <tr className="labels">
            <th>From</th>
            <th>To</th>
            <th>Rate</th>
          </tr>
        </thead>      
          <tbody className="data">            
               {exchangeData.map((entry) => (
              <tr key={entry.param.to}>
                <td>{entry.param.from}</td>
                <td>{entry.param.to}</td>
                <td>{entry.result}</td>
              </tr>
            ))}
          </tbody>
       
      </table>
          {/* Add more rendering logic based on the structure of your API response */}
        </div>
      )}
    </div>
  );
};

export default CurrencyExchange;
