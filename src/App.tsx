import './App.css';
import Frame from './components/frame';
import BondsComponent from './components/bonds';

function App() {
  return (
    <div className='App'>
      {/* You can delete this... */}
      <Frame title='Title'>
        <p>This is a test</p>
      </Frame>
      <Frame title='Bonds'>
        <BondsComponent />
      </Frame>
    </div>
  );
}

export default App;
