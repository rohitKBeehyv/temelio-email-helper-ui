import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import NonprofitForm from './components/NonProfitForm';
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.title = 'Foundation Email Service';
  })
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
