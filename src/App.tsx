import './App.css';
import Frame from './components/frame';
import BondsComponent from './components/bonds/component';

function App() {
  return (
    <div className='App'>
      {/* You can delete this... */}
      <Frame title='Title'>
        <p>This is a test</p>
        <BondsComponent />
      </Frame>
      <Frame title='Bonds'>
        
      </Frame>
    </div>
  );
}

export default App;
