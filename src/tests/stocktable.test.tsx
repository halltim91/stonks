import {render, screen, waitFor} from '@testing-library/react'
import { StockTable, GAINERS, LOSERS } from '../components/stocks/stocktable';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import '@testing-library/jest-dom'


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
            { ticker: 'AAPL', price: '150.00', change_amount: '-5.00', change_percentage: '-3.33' },
            { ticker: 'GOOGL', price: '2500.00', change_amount: '-10.00', change_percentage: '-2.00' },
            { ticker: 'MSFT', price: '300.00', change_amount: '-7.50', change_percentage: '-2.50' },
            { ticker: 'AMZN', price: '3500.00', change_amount: '-15.00', change_percentage: '-4.29' },
            { ticker: 'TSLA', price: '800.00', change_amount: '-20.00', change_percentage: '-2.56' },
    ]
};


describe("StockTable", () => {
    afterEach(() => {
        maxios.get.mockRestore();
    })

    it('should load with out error - gainers', async () => {
        const title = 'Top Gainers';
        maxios.get.mockResolvedValueOnce({data: mockedGainerData});
        await act(async () => {
            render(<StockTable type={GAINERS} title={title} />);
        })
            expect(screen.getByText(title)).toBeInTheDocument();
            expect(screen.getByText('AAPL')).toBeInTheDocument();
            expect(screen.getByText('GOOGL')).toBeInTheDocument();
            expect(screen.getByText('MSFT')).toBeInTheDocument();
            expect(screen.getByText('$2500.00')).toBeInTheDocument();
            expect(screen.getByText('$7.50')).toBeInTheDocument();
            expect(screen.getByText('4.29%')).toBeInTheDocument();
            // Top gainers should have green values
            expect(screen.getByText('4.29%')).toHaveClass('positive');
    });
    it('should load with out error - losers', async () => {
        const title = 'Top Losers';
        maxios.get.mockResolvedValueOnce({data: mockedLoserData});
        await act(async () => {
            render(<StockTable type={LOSERS} title={title} />);
        })
            expect(screen.getByText(title)).toBeInTheDocument();
            expect(screen.getByText('AAPL')).toBeInTheDocument();
            expect(screen.getByText('GOOGL')).toBeInTheDocument();
            expect(screen.getByText('MSFT')).toBeInTheDocument();
            expect(screen.getByText('$2500.00')).toBeInTheDocument();
            expect(screen.getByText('$-7.50')).toBeInTheDocument();
            expect(screen.getByText('-4.29%')).toBeInTheDocument();
            // Top losers should have red values
            expect(screen.getByText('-4.29%')).toHaveClass('negative');
    });

    it('should display an error message when there is no data', async () => {
        const title = 'Top Losers';
        maxios.get.mockResolvedValueOnce({data: {}});
        await act(async () => {
            render(<StockTable type={GAINERS} title={title} />);
        })
    })
});

