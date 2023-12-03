import { useState, useEffect } from 'react';
import { apiReqData } from './apiReq';
import axios from 'axios';
import Frame from '../frame';
import Intraday from './Intraday';
import GeneratePopup from '../popup/popup';
import '../../css/table.css';
import '../../css/frame.css';

export interface exchangeRateData {
  'Realtime Currency Exchange Rate': {
    '3. To_Currency Code': string;
    '4. To_Currency Name': string;
    '5. Exchange Rate': string;
  };
}

function ExchangeRates(props: { className?: string }) {
  const [exchangeRate, setExchangeRate] = useState<exchangeRateData[]>([]);
  const [buttonState, setButtonState] = useState(false);
  const [selectedIntraday, setSelectedIntraday] = useState<
    string | undefined
  >();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData: exchangeRateData[] = [];

        for (let toSym = 0; toSym < apiReqData.toSymbol.length; toSym++) {
          const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${apiReqData.fromSymbol}&to_currency=${apiReqData.toSymbol[toSym]}&apikey=${apiReqData.apiKey}`;
          const response = await axios.get(url);
          responseData.push(response.data);
        }

        setExchangeRate(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleButtonClick = (currencyCode: string | undefined) => {
    setButtonState(true);
    setSelectedIntraday(currencyCode || 'INR');
  };

  return (
    <>
      <Frame title='Forex' className={props.className}>
        <table>
          <thead className='headT'>
            <tr>
              <th id='thEx'>To</th>
              <th id='thEx'>country&currency</th>
              <th id='thEx'>RER</th>
            </tr>
          </thead>
          <tbody>
            {exchangeRate.slice(0, 10).map((exchangeRateData, index) => (
              <tr key={index}>
                <td id='tdEx' className='tdEx'>
                  <button
                    aria-label={
                      exchangeRateData['Realtime Currency Exchange Rate'][
                        '3. To_Currency Code'
                      ]
                    }
                    onClick={() =>
                      handleButtonClick(
                        exchangeRateData['Realtime Currency Exchange Rate'][
                          '3. To_Currency Code'
                        ]
                      )
                    }
                  >
                    {
                      exchangeRateData['Realtime Currency Exchange Rate'][
                        '3. To_Currency Code'
                      ]
                    }
                  </button>
                </td>
                <td id='tdEx' className='tdEx'>
                  {
                    exchangeRateData['Realtime Currency Exchange Rate'][
                      '4. To_Currency Name'
                    ]
                  }
                </td>
                <td id='tdEx' className='tdEx'>
                  {parseFloat(
                    exchangeRateData['Realtime Currency Exchange Rate'][
                      '5. Exchange Rate'
                    ]
                  ).toFixed(2)}
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
            <Intraday toCurrency={selectedIntraday}></Intraday>
          </GeneratePopup>
        </div>
      )}
    </>
  );
}

export default ExchangeRates;
