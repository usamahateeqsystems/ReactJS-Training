import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import CryptoMain from './Components/cryptoMain';
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <CryptoMain />
      </Provider>
    </div>
  );
}

export default App;
