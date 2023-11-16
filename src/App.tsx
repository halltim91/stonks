import { StockTable, GAINERS, LOSERS } from './components/stocktable';

function App() {
  return (
    <div className='justify-content-around d-flex wrap'>
        <StockTable type={GAINERS} title='Top Gainers' />
        <StockTable type={LOSERS} title='Top Losers' />
    </div>
  );
}

export default App;
