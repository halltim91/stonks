import './App.css';
import Frame from './components/frame';
import NewsComponent from "./components/news/component";

function App() {
  return (
    <div className='App'>
      {/* You can delete this... */}
      <Frame title='Title'>
        <p>This is a test</p>
        <NewsComponent />
      </Frame>
    </div>
  );
}

export default App;
