import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../src/main/home/home';
import Modal from 'react-modal';
import './App.css';
import Dictionary from '../src/main/dictionary/dictionary';

Modal.setAppElement('#root')

function App() {
  return (
    <>
      <div className="content">
        <Switch>
          <Route path="/admin" component={Home} />
          <Route path="/" component={Dictionary} />
        </Switch>
      </div>
    </>
  );
}

export default App;
