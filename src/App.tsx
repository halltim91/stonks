import Commodity from './components/comodities/comodities';
import ExchangeRates from './components/forex/exchangeRates';
import NewsComponent from './components/news/component';
import BondsComponent from './components/bonds/mainComponent';
import { StockTable, GAINERS, LOSERS } from './components/stocks/stocktable';
import './css/frame.css';

function App() {
  return (
    <div className='background'>
      <div id='container' className='container'>
        <div className='heading-background'>
          <h1 className='heading'>Stonks</h1>
        </div>
          <StockTable className='col1' type={GAINERS} title='Top Gainers' />
          <StockTable className='col2' type={LOSERS} title='Top Losers' />
          <Commodity className='col3' />
          <ExchangeRates className='col4' />
          <NewsComponent className='col5' />
          <BondsComponent className='col6' />
      </div>
    </div>
  );
}

export default App;
