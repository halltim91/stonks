import Frame from './components/frame';
import { StockTable, GAINERS, LOSERS } from './components/stocktable';

function App() {
  return (
    <div className='justify-content-around d-flex wrap'>
      <Frame title='Top Gainers'>
        <StockTable type={GAINERS} />
      </Frame>
      <Frame title='Top Losers'>
        <StockTable type={LOSERS} />
      </Frame>
    </div>
  );
}

export default App;
