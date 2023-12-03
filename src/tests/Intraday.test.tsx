import axios from 'axios';
import Intraday from '../components/forex/Intraday';
import { IntradayInfo } from '../components/forex/Intraday';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

jest.mock('axios');
const maxios = axios as jest.Mocked<typeof axios>;

const mockData: IntradayInfo = {
  'Meta Data': {
    '1. Information': 'FX Intraday (5min) Time Series',
    '2. From Symbol': 'USD',
    '3. To Symbol': 'AED',
  },
  'Time Series FX (5min)': {
    '2023-12-01 13:40:00': {
      '1. open': '3.67170',
      '2. high': '3.67220',
      '3. low': '3.67170',
      '4. close': '3.67210',
    },
    '2023-12-01 13:45:00': {
      '1. open': '3.67220',
      '2. high': '3.67220',
      '3. low': '3.67170',
      '4. close': '3.67220',
    },
    '2023-12-01 13:50:00': {
      '1. open': '3.67210',
      '2. high': '3.67220',
      '3. low': '3.67170',
      '4. close': '3.67210',
    },
    '2023-12-01 13:55:00': {
      '1. open': '3.67190',
      '2. high': '3.67220',
      '3. low': '3.67160',
      '4. close': '3.67170',
    },
    '2023-12-01 14:00:00': {
      '1. open': '3.67210',
      '2. high': '3.67210',
      '3. low': '3.67160',
      '4. close': '3.67170',
    },
    '2023-12-01 14:05:00': {
      '1. open': '3.67180',
      '2. high': '3.67210',
      '3. low': '3.67160',
      '4. close': '3.67210',
    },
    '2023-12-01 14:10:00': {
      '1. open': '3.67180',
      '2. high': '3.67210',
      '3. low': '3.67170',
      '4. close': '3.67210',
    },
    '2023-12-01 14:15:00': {
      '1. open': '3.67190',
      '2. high': '3.67210',
      '3. low': '3.67170',
      '4. close': '3.67170',
    },
  },
};

async function loadMockData() {
  maxios.get.mockImplementation(() => {
    return Promise.resolve({
      data: mockData,
    });
  });
  await act(async () => {
    render(<Intraday toCurrency='AED' />);
  });
}

describe('Test Intraday component', () => {
  it('Should load the data correctly', async () => {
    await loadMockData();
    expect(screen.getByText('Intraday')).toBeInTheDocument();
    expect(
      screen.getByText('FX Intraday (5min) Time Series')
    ).toBeInTheDocument();
  });
});
