import React, { useState, useEffect } from 'react';
import ApiReq, { apiReqData, preReq } from './apiReq';
import axios from 'axios';
import Frame from '../frame';
import Intraday, { IntradayInfo } from './Intraday';
import CommodityPopup from '../comodities/commodityPopup';

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
            <tr className='row mt-3 w-100'>
              <th className='col p-3 fw-bold'>To</th>
              <th className='col p-3 fw-bold'>country&currency</th>
              <th className='col p-3 fw-bold'>Exch rate</th>
            </tr>
          </thead>
          <tbody className='data'>
            {exchangeRate.slice(0, 5).map((exchangeRateData) => (
              <tr className='row mt-3 w-100'>
                <td className='col p-3'>
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
                <td className='col p-3'>
                  {
                    exchangeRateData['Realtime Currency Exchange Rate'][
                      '4. To_Currency Name'
                    ]
                  }
                </td>
                <td className='col p-3'>
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
          <CommodityPopup
            trigger={buttonState}
            closeModal={() => setButtonState(false)}
          >
            <Intraday toCurrency={selectedIntraday}></Intraday>
          </CommodityPopup>
        </div>
      )}
    </>
  );
};

export default ExchangeRates;
