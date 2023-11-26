//import './App.css';
import Frame from './components/frame';
import Commodity from './components/comodities/comodities';
import ExchangeRates from './components/forex/exchangeRates';
import NewsComponent from './components/news/component';
import BondsComponent from './components/bonds/component';
import { StockTable, GAINERS, LOSERS } from './components/stocktable';
import Intraday from './components/forex/Intraday';

function App() {
  return (
    <div className='justify-content-around d-flex wrap'>
      {/* You can delete this... */}
      {/*<StockTable type={GAINERS} title='Top Gainers' />
      <StockTable type={LOSERS} title='Top Losers' />
      <Commodity />
      <ExchangeRates />
      <NewsComponent />
      <BondsComponent /> */}   

      <Commodity />
      <ExchangeRates />  
   
    </div>
  );
}

export default App;
