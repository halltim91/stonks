import './App.css';
<<<<<<< HEAD
import Frame from './components/frame';
import Commodity from './components/comodities/comodities';
import CurrencyExchange from './components/currency/currency';
=======
import NewsComponent from "./components/news/component";
import BondsComponent from './components/bonds/component';
import { StockTable, GAINERS, LOSERS } from './components/stocktable';
>>>>>>> 7a7758705190467268bfeb7dc6c53598e1756ae4

function App() {
  //<div>
    //    {Commodity()}        
      //</div>
  return (
    <div className='justify-content-around d-flex wrap'>
<<<<<<< HEAD
      {/* You can delete this... */}
      <Commodity/>
      <CurrencyExchange/>
           
=======
        <StockTable type={GAINERS} title='Top Gainers' />
        <StockTable type={LOSERS} title='Top Losers' />
        <NewsComponent />
        <BondsComponent />
>>>>>>> 7a7758705190467268bfeb7dc6c53598e1756ae4
    </div>
  );
}

export default App;
