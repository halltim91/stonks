import Commodity from './components/comodities/comodities';
import ExchangeRates from './components/forex/exchangeRates';
import NewsComponent from './components/news/component';
import BondsComponent from './components/bonds/mainComponent';
import { StockTable, GAINERS, LOSERS } from './components/stocks/stocktable';
import Intraday from './components/forex/Intraday';

function App() {
  return (
    <div className='justify-content-around d-flex flex-wrap'>
      <StockTable type={GAINERS} title='Top Gainers' />
      <StockTable type={LOSERS} title='Top Losers' />
      <Commodity />
      <ExchangeRates />
      <NewsComponent />
      <BondsComponent />
    </div>
  );
}

export default App;
