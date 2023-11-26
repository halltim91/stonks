import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Frame from '../frame';
import CommodityPopup from './commodityPopup';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';

Chart.register(CategoryScale);
Chart.register(...registerables);

interface CommoditySymbolMap {
  symbol: string;
  commodityInfo: ComodityInfo;
}

interface ComodityInfo {
  name: string;
  data: { date: string; value: string }[];
}

const Commodity = () => {
  const [commodityData, setCommodityData] = useState<CommoditySymbolMap[]>([]);
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
        const responseData: CommoditySymbolMap[] = [];
        for (let i = 0; i < symbol.length; i++) {
          const com_symbol = symbol[i];
          const url = `https://www.alphavantage.co/query?function=${com_symbol}&interval=${interval}&apikey=${apiKey}`;
          const response = await axios.get(url);
          responseData.push({
            symbol: com_symbol,
            commodityInfo: response.data,
          });
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
    const ratio =
      parseFloat(chg) / parseFloat(commodity.data[0].value);
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
            <tr className='row mt-3 w-100'>
              <th className='col p-3 fw-bold'>Commodity</th>
              <th className='col p-3 fw-bold'>
                Value (dollars per barrel)
              </th>
              <th className='col p-3 fw-bold'>Chg Amt</th>
              <th className='col p-3 fw-bold'>%Chg</th>
            </tr>
          </thead>
          <tbody className='data'>
            {commodityData.slice(0, 5).map((commoditySymbolPair) => (
              <tr
                className='row mt-3 w-100'
                key={commoditySymbolPair.symbol}
              >
                <td className='col p-3'>
                  <button
                    onClick={() =>
                      handleCommodityClick(
                        commoditySymbolPair.commodityInfo
                      )
                    }
                  >
                    {commoditySymbolPair.symbol}
                  </button>
                </td>
                <td className='col p-3'>
                  $
                  {commoditySymbolPair.commodityInfo.data[0].value.slice(
                    0,
                    commoditySymbolPair.commodityInfo.data[0].value.indexOf(
                      '.'
                    ) +
                      2 +
                      1
                  )}
                </td>
                <td className='col p-3'>
                  ${calculateChange(commoditySymbolPair.commodityInfo)}{' '}
                </td>
                <td className='col p-3'>
                  {percentChange(commoditySymbolPair.commodityInfo)}%{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Frame>

      {buttonState && (
        <div className='overlay'>
          <CommodityPopup
            trigger={buttonState}
            closeModal={() => setButtonState(false)}
          >
            <h3>{selectedCommodity?.name}</h3>
            <div className='lineChart'>
              {selectedCommodity !== null ? (
                <Line
                  data={{
                    labels: selectedCommodity.data
                      .slice(0, 10)
                      .map((item: { date: string }) => new Date(item.date)),

                    datasets: [
                      {
                        label: selectedCommodity.name,
                        data: selectedCommodity.data.map(
                          (item: { value: string }) =>
                            parseFloat(item.value)
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
        </div>
      )}
    </>
  );
};

export default Commodity;
