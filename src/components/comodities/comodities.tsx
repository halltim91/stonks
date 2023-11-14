import React, { useState, useEffect } from "react";
import axios from "axios";

interface ComodityInfo {
  name: string;
  data : {date: string; value: string;}[];
}
const Commodity = () => {
  const [commodityData, setCommodityData] = useState<ComodityInfo[]>([]);
  console.log("at the very begining");

  useEffect(() => {
    console.log("in use Effect");
    const fetchData = async () => {
      const apiKey = "UPW9PUE4R389WR34";
      const symbol = ["WTI","BRENT", "NATURAL_GAS", "COPPER", "ALUMINUM", "WHEAT", "CORN", "COTTON", "SUGAR", "COFFEE" ];
      const interval = "daily";      
      console.log("interval :", interval);

      try {
        console.log("start of a try block");
        const responseData: ComodityInfo[] = [];
        for(let i = 0; i < symbol.length; i++) {
          const com_symbol = symbol[i];
          const url = `https://www.alphavantage.co/query?function=${com_symbol}&interval=${interval}&apikey=${apiKey}`; 
          const response = await axios.get(url);
          responseData.push(response.data);
         }
        console.log("data :", responseData);
        setCommodityData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
        }
        
    fetchData();
    
  }, []);

console.log("comodityData :", commodityData);
console.log("first row of first comodity", commodityData[0]);

//const latestData = commodityData[0].data.length > 0 ? commodityData[0].data[0] : {date: "", value: ""};
//console.log("latest data :", latestData);

/*

*/

  return (
    <div>
      <h2>Commodities</h2>
      <table>
        <thead>
          <tr>
            <th>Comodity</th>
            <th>Date</th>
            <th>Value (dollars per barrel)</th>
          </tr>
        </thead>
        <tbody>
          {commodityData.map((commodity) => (
            <tr key={commodity.name}>
            <td>{commodity.name}</td>
            <td>{commodity.data[0].date}</td>
            <td>{commodity.data[0].value}</td>                        
          </tr>
          ))}
          

        </tbody>
      </table>
    </div>
  );
};

export default Commodity;
