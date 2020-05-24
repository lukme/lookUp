import React from 'react';
import './App.scss';
import { MainPage } from './components/MainPage/MainPage';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <MainPage />
    </div>
  );
}

export default App;
