import './App.css';
import Frame from './components/frame';
import NewsComponent from "./components/news/component";
import BondsComponent from './components/bonds/component';

function App() {
  return (
    <div className='App'>
      {/* You can delete this... */}
      <Frame title='Title'>
        <p>This is a test</p>
        <NewsComponent />
        <BondsComponent />
      </Frame>
    </div>
  );
}

export default App;
