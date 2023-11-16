import './App.css';
import Frame from './components/frame';
import Commodity from './components/comodities/comodities';
import CurrencyExchange from './components/currency/currency';

function App() {
  //<div>
    //    {Commodity()}        
      //</div>
  return (
    <div className='justify-content-around d-flex wrap'>
      {/* You can delete this... */}
      <Commodity/>
      <CurrencyExchange/>
           
    </div>
  );
}

export default App;
