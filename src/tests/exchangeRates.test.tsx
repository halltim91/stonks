// exchangeRates.test.ts
import ExchangeRates, { exchangeRateData } from '../components/forex/exchangeRates';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Intraday from '../components/forex/Intraday';

jest.mock('axios');
const maxios = axios as jest.Mocked<typeof axios>;

jest.mock('../components/forex/Intraday', ()=>{
  return {
    __esModule: true,
    default: jest.fn().mockImplementation((props) => {
      return <div><h1>Intraday</h1></div>
    })
  }
})

const AED: exchangeRateData = {
    'Realtime Currency Exchange Rate': {
      '3. To_Currency Code': 'AED',
      '4. To_Currency Name': 'United Arab Emirates Dirham',
      '5. Exchange Rate': '3.67190000',
    },
  };

const AFN: exchangeRateData = {
    'Realtime Currency Exchange Rate': {
      '3. To_Currency Code': 'AFN',
      '4. To_Currency Name': 'Afghan Afghani',
      '5. Exchange Rate': '69.7175',
    },
  };

const ALL: exchangeRateData = {
    'Realtime Currency Exchange Rate': {
      '3. To_Currency Code': 'ALL',
      '4. To_Currency Name': 'Albanian Lek',
      '5. Exchange Rate': '92.93000000',
    },
  };

const AMD: exchangeRateData = {
    'Realtime Currency Exchange Rate': {
      '3. To_Currency Code': 'AMD',
      '4. To_Currency Name': 'Armenian Dram',
      '5. Exchange Rate': '402.38000000',
    },
  };

async function loadMockData() {
  maxios.get.mockImplementation((url) => {
    if(url.includes('AED')) {
      return Promise.resolve({
        data: AED
      })
    } else if (url.includes('AFN')) {
      return Promise.resolve({
        data: AFN
      })
    } else if (url.includes('ALL')) {
      return Promise.resolve({
        data: ALL
      })
    } 
    return Promise.resolve({
      data: AMD
    })
  })
  await act(async () => {
    render(<ExchangeRates />);
  });
}

describe('exchangeRateData interface', () => {
  const mockData: exchangeRateData = {
    'Realtime Currency Exchange Rate': {
      '3. To_Currency Code': 'INR',
      '4. To_Currency Name': 'Rupees',
      '5. Exchange Rate': '83.22',
    },
  };

  it('should have the correct structure', () => {
    expect(mockData).toEqual({
      'Realtime Currency Exchange Rate': expect.objectContaining({
        '3. To_Currency Code': expect.any(String),
        '4. To_Currency Name': expect.any(String),
        '5. Exchange Rate': expect.any(String),
      }),
    });
  });
});

describe('Axios returns undefined data', () => {
  
  it('Should error on fetching data', async () => { 
    const consoleError = jest.spyOn(console, 'error').mockImplementation(()=>{})
    maxios.get.mockRejectedValueOnce(undefined)

    render(<ExchangeRates />);
    await waitFor(()=>{expect(consoleError).toHaveBeenCalledTimes(1)})
    consoleError.mockClear()
    consoleError.mockRestore()
  });
  
});


describe('ExchangeRates Component', () => {
  it('renders the table correctly', async () => {
    await loadMockData()
    expect(screen.getByRole('columnheader', { name: 'To' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'country&currency' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'RER' })).toBeInTheDocument();
    expect(screen.getByRole('button', {name:'AED'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name:'AFN'})).toBeInTheDocument();
    expect(screen.getByRole('button', {name:'ALL'})).toBeInTheDocument();
  });

  it('Test button click', async() => {
    await loadMockData()
    const buttonOpen = screen.getByRole('button', {name:'AED'})
    await act(async () => {
      fireEvent.click(buttonOpen)
    });
    const buttonClose = screen.getByRole('button', {name:'close'})
    await act(async () => {
      fireEvent.click(buttonClose);
    });
    expect(screen.queryByRole('button', {name:'close'})).toBeNull()
  })
});