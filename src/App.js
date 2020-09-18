import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Home from '../src/main/home/home'
import './App.css';
import Dictionary from '../src/main/dictionary/dictionary';

function App() {
  return (
    <>
      <div className="content">
        <Switch>
          <Route path="/dictionary" component={Dictionary} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </>
  );
}

export default App;
