//import './App.css';
import Frame from './components/frame';
import Commodity from './components/comodities/comodities';
import CurrencyExchange from './components/currency/currency';
import NewsComponent from './components/news/component';
import BondsComponent from './components/bonds/mainComponent';
import { StockTable, GAINERS, LOSERS } from './components/stocktable';

function App() {
  return (
    <div className='justify-content-around d-flex wrap'>
      {/* You can delete this... */}
      {/* <StockTable type={GAINERS} title='Top Gainers' />
      <StockTable type={LOSERS} title='Top Losers' />
      <Commodity />
      <CurrencyExchange /> */}
      <NewsComponent />
      <BondsComponent />
    </div>
  );
}

export default App;
