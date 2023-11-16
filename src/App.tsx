import './App.css';
import Frame from './components/frame';
import Commodity from './components/comodities/comodities';
import CurrencyExchange from './components/currency/currency';

function App() {
  return (
    <div className='App'>
      {/* You can delete this... */}
      <Frame title='Title'>
        <p>This is a test</p>
        <div>
        {Commodity()}        
      </div>
      <div>
        {CurrencyExchange()}
      </div>
      </Frame>
      
    </div>
  );
}

export default App;
