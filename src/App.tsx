//import './App.css';
import Frame from './components/frame';
import Commodity from './components/comodities/comodities';
import CurrencyExchange from './components/currency/currency';
import NewsComponent from './components/news/component';
import BondsComponent from './components/bonds/component';
import { StockTable, GAINERS, LOSERS } from './components/stocktable';

function App() {
  return (
    <div className='justify-content-around d-flex wrap'>
      {/* You can delete this... */}
      {/*<StockTable type={GAINERS} title='Top Gainers' />
      <StockTable type={LOSERS} title='Top Losers' />
      <Commodity />
      <CurrencyExchange />
      <NewsComponent />
      <BondsComponent />
      */}

      <Commodity />
      <CurrencyExchange />
      <StockTable type={GAINERS} title='Top Gainers' />
      <StockTable type={LOSERS} title='Top Losers' />
    </div>
  );
}

export default App;
