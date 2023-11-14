import React, { useState, useEffect } from "react";
import axios from "axios";

const Commodity = () => {
  const [commodityData, setCommodityData] = useState({ data: [{ date: "", value: "" }] });

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "UPW9PUE4R389WR34";
      const symbol = "WTI";
      const interval = "daily";
      
       
      const url = `https://www.alphavantage.co/query?function=${symbol}&interval=${interval}&apikey=${apiKey}`;      

      try {
        const response = await axios.get(url);
        console.log(response.data);
        setCommodityData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
        }
        
    fetchData();
    
  }, []);

  // Access the first row (latest date) from the data array
  const latestData = commodityData.data.length > 0 ? commodityData.data[0] : {date: "", value: ""};

  return (
    <div>
      <h2>Commodities</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Value (dollars per barrel)</th>
          </tr>
        </thead>
        <tbody>
          <tr key={latestData.date}>
            <td>{latestData.date}</td>
            <td>{latestData.value}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Commodity;
