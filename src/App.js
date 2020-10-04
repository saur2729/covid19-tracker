import React from 'react';
import { BrowserRouter} from 'react-router-dom';

import Routes from './components/Routes'
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
