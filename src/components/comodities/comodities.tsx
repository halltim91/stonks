import { useState, useEffect } from 'react';
import axios from 'axios';
import Frame from '../frame';
import GeneratePopup from '../popup/popup';
import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart, registerables } from 'chart.js';
import 'chartjs-adapter-moment';
import '../../css/table.css'
import "../../css/frame.css";

import { apiKey } from './cmApiKey';

Chart.register(CategoryScale);
Chart.register(...registerables);

export interface CommoditySymbolMap {
  symbol: string;
  commodityInfo: ComodityInfo;
}

export interface ComodityInfo {
  name: string;
  data: { date: string; value: string }[];
}

export function calculateChange(commodity: ComodityInfo): string{
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

export function percentChange(commodity: ComodityInfo): string {
    const chg = calculateChange(commodity);
    const ratio = parseFloat(chg) / parseFloat(commodity.data[0].value);
    let percentChg = (ratio * 100).toFixed(2);

    return percentChg;
  };

function Commodity(){
  const [commodityData, setCommodityData] = useState<CommoditySymbolMap[]>([]);
  const [buttonState, setButtonState] = useState(false);
  const [selectedCommodity, setSelectedCommodity] =
    useState<ComodityInfo | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      //const apiKey = 'UPW9PUE4R389WR34';
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

  const handleCommodityClick = (commodity: ComodityInfo) => {
    setButtonState(true);
    setSelectedCommodity(commodity);
  };

  return (
    <>
      <Frame title='Commodities'>
        <table>
          <thead>
            <tr>
              <th>Commodity</th>
              <th>Value</th>
              <th>Chg Amt</th>
              <th>%Chg</th>
            </tr>
          </thead>
          <tbody>
            {commodityData.slice(0, 10).map((commoditySymbolPair) => (
              <tr key={commoditySymbolPair.symbol}>
                <td>
                  <button
                    onClick={() =>
                      handleCommodityClick(commoditySymbolPair.commodityInfo)
                    }
                  >
                    {commoditySymbolPair.symbol.replace('_', ' ')}
                  </button>
                </td>
                <td>
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
                 <td className={parseFloat(calculateChange(commoditySymbolPair.commodityInfo)) >= 0 ? 'positive' : 'negative'}>
                  ${calculateChange(commoditySymbolPair.commodityInfo)}{' '}
                </td>
                <td className={parseFloat(percentChange(commoditySymbolPair.commodityInfo)) >= 0 ? 'positive' : 'negative'}>
                  {percentChange(commoditySymbolPair.commodityInfo)}%{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Frame>

      {buttonState && (
        <div className='overlay'>
          <GeneratePopup
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
                          (item: { value: string }) => parseFloat(item.value)
                        ),
                        backgroundColor: '#191970',
                        borderColor: '#191970',
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
          </GeneratePopup>
        </div>
      )}
    </>
  );
};

export default Commodity;
