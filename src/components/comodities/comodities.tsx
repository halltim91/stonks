import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Frame from '../frame';

interface ComodityInfo {
  name: string;
  data: { date: string; value: string }[];
}
const Commodity = () => {
  const [commodityData, setCommodityData] = useState<ComodityInfo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = 'UPW9PUE4R389WR34';
      const symbol = [
        'WTI',
        'BRENT',
        'NATURAL_GAS',
        'COPPER',
        'ALUMINUM',
        'WHEAT',
        'CORN',
        'COTTON',
        'SUGAR',
        'COFFEE',
      ];
      const interval = 'daily';

      try {
        const responseData: ComodityInfo[] = [];
        for (let i = 0; i < symbol.length; i++) {
          const com_symbol = symbol[i];
          const url = `https://www.alphavantage.co/query?function=${com_symbol}&interval=${interval}&apikey=${apiKey}`;
          const response = await axios.get(url);
          responseData.push(response.data);
        }
        console.log("respose data to make ti fixed :", responseData)
        setCommodityData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

 // console.log("comodityData :", commodityData);
 
 const calculateChange = (commodity: ComodityInfo) => {
  let num1 = commodity.data[1].value;
  let num0 = commodity.data[0].value;

  let i = 1;
  while(num1 === "."){
    i++
    num1 = commodity.data[i].value;
  } 
  const chg =(parseFloat(num1) - parseFloat(num0)).toFixed(2)

 return(
  chg
 )
 }

 const percentChange = (commodity: ComodityInfo) => {
  const chg = calculateChange(commodity);
  const ratio = parseFloat(chg) / parseFloat(commodity.data[0].value)
  let percentChg = (ratio * 100).toFixed(2);

  return(
    percentChg
  )
 }


  return (
    <Frame title='Commodities'>
    
      <table>
        <thead>
          <tr className='row'>
            <th className='col fw-bold'>Comodity</th>
            <th className='col fw-bold'>Value (dollars per barrel)</th>
            <th className='col fw-bold'>chg</th>
            <th className='col fw-bold'>%chg</th>
          </tr>
        </thead>
        <tbody className='data'>
          {commodityData.slice(0, 5).map((commodity) => (
            <tr className='row' key={commodity.name}>
              <td className='col'>{commodity.name}</td>
              <td className='col'>${commodity.data[0].value.slice(0, (commodity.data[0].value.indexOf(".")) + 2 + 1)}</td>
              <td className='col'>${calculateChange(commodity)} </td>  
              <td className='col'>{percentChange(commodity)}% </td>              
            
            </tr>
          ))}
        </tbody>
      </table>
  
    </Frame>
  );
};

export default Commodity;
