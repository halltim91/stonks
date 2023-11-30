import Commodity from './components/comodities/comodities';
import ExchangeRates from './components/forex/exchangeRates';
import NewsComponent from './components/news/component';
import BondsComponent from './components/bonds/mainComponent';
import { StockTable, GAINERS, LOSERS } from './components/stocks/stocktable';
import Intraday from './components/forex/Intraday';
import './css/frame.css';

function App() {
  //<StockTable type={GAINERS} title='Top Gainers' />
  //<StockTable type={LOSERS} title='Top Losers' />
  return (

    <div className='background'>
      <div id='container' className='container'>
        <div className='heading-background'>
          <h1 className='heading'>Stonks</h1>
        </div>
        <div className='col1'>
          <StockTable type={GAINERS} title='Top Gainers' />
        </div>
        <div className='col2'>
          <StockTable type={LOSERS} title='Top Losers' />
        </div>
        <div className='col3'>
          <Commodity />
        </div>
        <div className='col4'>
          <ExchangeRates />
        </div>
        <div className='col5'>
          <NewsComponent />
        </div>
        <div className='col6'>
          <BondsComponent />
        </div>
      </div>

    </div>
  );
}

export default App;
