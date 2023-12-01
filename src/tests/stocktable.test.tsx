import { render, screen, fireEvent } from '@testing-library/react';
import { StockTable, GAINERS, LOSERS } from '../components/stocks/stocktable';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import '@testing-library/jest-dom';
import { clear } from 'console';

jest.mock('axios');
const maxios = axios as jest.Mocked<typeof axios>;

const mockedGainerData = {
  top_gainers: [
    {
      ticker: 'AAPL',
      price: '150.00',
      change_amount: '5.00',
      change_percentage: '3.33',
    },
    {
      ticker: 'GOOGL',
      price: '2500.00',
      change_amount: '10.00',
      change_percentage: '2.00',
    },
    {
      ticker: 'MSFT',
      price: '300.00',
      change_amount: '7.50',
      change_percentage: '2.50',
    },
    {
      ticker: 'AMZN',
      price: '3500.00',
      change_amount: '15.00',
      change_percentage: '4.29',
    },
    {
      ticker: 'TSLA',
      price: '800.00',
      change_amount: '20.00',
      change_percentage: '2.56',
    },
  ],
};

const mockedLoserData = {
  top_losers: [
    {
      ticker: 'AAPL',
      price: '150.00',
      change_amount: '-5.00',
      change_percentage: '-3.33',
    },
    {
      ticker: 'GOOGL',
      price: '2500.00',
      change_amount: '-10.00',
      change_percentage: '-2.00',
    },
    {
      ticker: 'MSFT',
      price: '300.00',
      change_amount: '-7.50',
      change_percentage: '-2.50',
    },
    {
      ticker: 'AMZN',
      price: '3500.00',
      change_amount: '-15.00',
      change_percentage: '-4.29',
    },
    {
      ticker: 'TSLA',
      price: '800.00',
      change_amount: '-20.00',
      change_percentage: '-2.56',
    },
  ],
};

const mockedTimeSeries = {
  'Time Series (Daily)': {
    '2023-11-30': {
      '1. open': '156.9500',
      '2. high': '158.6000',
      '3. low': '156.8900',
      '4. close': '158.5600',
    },
    '2023-11-29': {
      '1. open': '156.1500',
      '2. high': '157.5100',
      '3. low': '156.0200',
      '4. close': '156.4100',
    },
  },
};

//sets up the stocktable component
const setup = async (data: any, type: string, title: string) => {
  maxios.get.mockResolvedValueOnce({ data: data });
  await act(async () => {
    render(<StockTable type={type} title={title} />);
  });
};

describe('StockTable - Rendering', () => {
  afterEach(() => {
    maxios.get.mockRestore();
  });

  it('should load with out error - gainers', async () => {
    const title = 'Top Gainers';
    await setup(mockedGainerData, GAINERS, title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('GOOGL')).toBeInTheDocument();
    expect(screen.getByText('MSFT')).toBeInTheDocument();
    expect(screen.getByText('$2500.00')).toBeInTheDocument();
    expect(screen.getByText('$7.50')).toBeInTheDocument();
    expect(screen.getByText('4.29%')).toBeInTheDocument();
    // Top gainers should have green values
    expect(screen.getByText('4.29%')).toHaveClass('positive');
    // There should be 6 rows in the table
    expect(screen.getAllByRole('row').length).toBe(6);
  });
  it('should load with out error - losers', async () => {
    const title = 'Top Losers';
    await setup(mockedLoserData, LOSERS, title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText('AAPL')).toBeInTheDocument();
    expect(screen.getByText('GOOGL')).toBeInTheDocument();
    expect(screen.getByText('MSFT')).toBeInTheDocument();
    expect(screen.getByText('$2500.00')).toBeInTheDocument();
    expect(screen.getByText('$-7.50')).toBeInTheDocument();
    expect(screen.getByText('-4.29%')).toBeInTheDocument();
    // Top losers should have red values
    expect(screen.getByText('-4.29%')).toHaveClass('negative');
    // There should be 6 rows in the table
    expect(screen.getAllByRole('row').length).toBe(6);
  });

  it('should display an error message when there is no data', async () => {
    await setup({}, GAINERS, 'Top Gainers');
    //the only row in the table should be the header
    expect(screen.getAllByRole('row').length).toBe(1);
    expect(
      screen.getByText('Request limit exceeded or market is closed')
    ).toBeInTheDocument();
  });
});

describe('StockTable - Modal', () => {
  afterEach(() => {
    maxios.get.mockRestore();
  });

  it('modal is initially hidden', async () => {
    await setup(mockedGainerData, GAINERS, 'title');
    expect(screen.queryByTestId('stock-popup')).toBeNull();
  });

  it('modal becomes visible on stock row click', async () => {
    await setup(mockedGainerData, GAINERS, 'title');
    maxios.get.mockResolvedValueOnce({ data: mockedTimeSeries });
    await act(async () => {
      fireEvent.click(screen.getByText('AAPL'));
    });
    expect(screen.getByTestId('stock-popup')).toBeInTheDocument();
  });

  it('modal closes on close button click', async () => {
    await setup(mockedGainerData, GAINERS, 'title');
    maxios.get.mockResolvedValueOnce({ data: mockedTimeSeries });
    await act(async () => {
      fireEvent.click(screen.getByText('AAPL'));
    });
    expect(screen.getByTestId('stock-popup')).toBeInTheDocument();
    await act(async () => {
      fireEvent.click(screen.getByText('close'));
    });
    expect(screen.queryByTestId('stock-popup')).toBeNull();
  });
});
