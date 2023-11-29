import React, { useState, useEffect } from 'react';
import ApiReq, { apiReqData, preReq } from './apiReq';
import axios from 'axios';
import Frame from '../frame';
import Intraday, { IntradayInfo } from './Intraday';
import GeneratePopup from '../popup/popup';
import '../../css/table.css'
import '../../css/frame.css';




interface exchangeRateData {
  'Realtime Currency Exchange Rate': {
    '3. To_Currency Code': string;
    '4. To_Currency Name': string;
    '5. Exchange Rate': string;
  };
}

const ExchangeRates = () => {
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
    console.log('currency code :', currencyCode);
    setSelectedIntraday(currencyCode || 'INR');
  };

  return (
    <>
      <Frame title='Forex'>
        <table>
          <thead>
            <tr>
              <th className='headrow'>To</th>
              <th className='headrow'>country&currency</th>
              <th className='headrow'>Exg rate</th>
            </tr>
          </thead>
          <tbody>
            {exchangeRate.slice(0, 10).map((exchangeRateData) => (
              <tr>
                <td>
                  <button
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
                <td>
                  {
                    exchangeRateData['Realtime Currency Exchange Rate'][
                      '4. To_Currency Name'
                    ]
                  }
                </td>
                <td>
                  {
                    parseFloat(exchangeRateData['Realtime Currency Exchange Rate'][
                      '5. Exchange Rate'
                    ]).toFixed(2)
                  }
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
};

export default ExchangeRates;
