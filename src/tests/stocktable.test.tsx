import {render} from '@testing-library/react'
import { StockTable, GAINERS } from '../components/stocks/stocktable';
import { act } from 'react-dom/test-utils';
import axios from 'axios';

jest.mock('axios');
const maxios = axios as jest.Mocked<typeof axios>;

const mockedGainerData = {
    top_gainers: [
        { ticker: 'AAPL', price: '150.00', change_amount: '5.00', change_percentage: '3.33' },
        { ticker: 'GOOGL', price: '2500.00', change_amount: '10.00', change_percentage: '2.00' },
        { ticker: 'MSFT', price: '300.00', change_amount: '7.50', change_percentage: '2.50' },
        { ticker: 'AMZN', price: '3500.00', change_amount: '15.00', change_percentage: '4.29' },
        { ticker: 'TSLA', price: '800.00', change_amount: '20.00', change_percentage: '2.56' },
    ]
};

const mockedLoserData = {
    top_losers: [
        [
            { ticker: 'AAPL', price: '150.00', change_amount: '-5.00', change_percentage: '-3.33' },
            { ticker: 'GOOGL', price: '2500.00', change_amount: '-10.00', change_percentage: '-2.00' },
            { ticker: 'MSFT', price: '300.00', change_amount: '-7.50', change_percentage: '-2.50' },
            { ticker: 'AMZN', price: '3500.00', change_amount: '-15.00', change_percentage: '-4.29' },
            { ticker: 'TSLA', price: '800.00', change_amount: '-20.00', change_percentage: '-2.56' },
        ]
    ]
}


describe("StockTable smoke test", () => {
    it('should load with out error', async () => {
        maxios.get.mockResolvedValueOnce({data: mockedGainerData});
        await act(async () => {
            render(<StockTable type={GAINERS} title='Top Gainers' />);

        })

    });
    
});

