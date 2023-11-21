import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Frame from '../frame';
import CommodityPopup from './commodityPopup';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';

Chart.register(CategoryScale);
Chart.register(...registerables);

interface ComodityInfo {
  name: string;
  data: { date: string; value: string }[];
}

const Commodity = () => {
  const [commodityData, setCommodityData] = useState<ComodityInfo[]>([]);
  const [buttonState, setButtonState] = useState(false);
  const [selectedCommodity, setSelectedCommodity] =
    useState<ComodityInfo | null>(null);

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

        setCommodityData(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateChange = (commodity: ComodityInfo) => {
    let num1 = commodity.data[1].value;
    let num0 = commodity.data[0].value;

    let i = 1;
    while (num1 === '.') {
      i++;
      num1 = commodity.data[i].value;
    }
    const chg = (parseFloat(num1) - parseFloat(num0)).toFixed(2);

    return chg;
  };

  const percentChange = (commodity: ComodityInfo) => {
    const chg = calculateChange(commodity);
    const ratio = parseFloat(chg) / parseFloat(commodity.data[0].value);
    let percentChg = (ratio * 100).toFixed(2);

    return percentChg;
  };

  const handleCommodityClick = (commodity: ComodityInfo) => {
    setButtonState(true);
    setSelectedCommodity(commodity);
    console.log(
      'selected comodity date :',
      selectedCommodity !== null
        ? selectedCommodity.data.map(
            (item: { date: string }) => new Date(item.date)
          )
        : 'date is null'
    );
  };
  console.log(commodityData);

  return (
    <>
      <Frame title='Commodities'>
        <table>
          <thead>
            <tr className='row'>
              <th className='col fw-bold'>Commodity</th>
              <th className='col fw-bold'>Value (dollars per barrel)</th>
              <th className='col fw-bold'>Chg Amt</th>
              <th className='col fw-bold'>%Chg</th>
            </tr>
          </thead>
          <tbody className='data'>
            {commodityData.slice(0, 5).map((commodity) => (
              <tr className='row' key={commodity.name}>
                <td className='col'>
                  <button onClick={() => handleCommodityClick(commodity)}>
                    {commodity.name}
                  </button>
                </td>
                <td className='col'>
                  $
                  {commodity.data[0].value.slice(
                    0,
                    commodity.data[0].value.indexOf('.') + 2 + 1
                  )}
                </td>
                <td className='col'>${calculateChange(commodity)} </td>
                <td className='col'>{percentChange(commodity)}% </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Frame>

      {buttonState && (
        <CommodityPopup
          trigger={buttonState}
          closeModal={() => setButtonState(false)}
        >
          <h3>Chart for {selectedCommodity?.name}</h3>
          <div className='lineChart'>
            {selectedCommodity !== null ? (
              <Line
                data={{
                  //x axis

                  labels: selectedCommodity.data
                    .slice(0, 10)
                    .map((item: { date: string }) => new Date(item.date)),

                  datasets: [
                    {
                      //y axis
                      label: selectedCommodity.name,
                      data: selectedCommodity.data.map(
                        (item: { value: string }) => parseFloat(item.value)
                      ),
                      backgroundColor: 'rgba(0,0,255,1.0)',
                      borderColor: 'rgba(0,0,255,0.1)',
                      fill: false,
                    },
                  ],
                }}
                options={{
                  scales: {
                    x: {
                      type: 'time',
                      time: {
                        unit: 'day',
                        displayFormats: {
                          day: 'MMM D',
                        },
                      },
                    },
                  },
                }}
              />
            ) : (
              <div>No data available</div>
            )}
          </div>
        </CommodityPopup>
      )}
    </>
  );
};

export default Commodity;
