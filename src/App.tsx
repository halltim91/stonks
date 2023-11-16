import './App.css';
import NewsComponent from "./components/news/component";
import BondsComponent from './components/bonds/component';
import { StockTable, GAINERS, LOSERS } from './components/stocktable';

function App() {
  return (
    <div className='justify-content-around d-flex wrap'>
        <StockTable type={GAINERS} title='Top Gainers' />
        <StockTable type={LOSERS} title='Top Losers' />
        <NewsComponent />
        <BondsComponent />
    </div>
  );
}

export default App;
