import React from 'react';
import './App.css';
import {connect} from 'react-redux';
import CryptoChart from './Components/CryptoChart';

const mapStateToProps = state => {
  return {state}
}

function App(props) {
  return (
      <div className="App">
        <CryptoChart></CryptoChart>
      </div>
  );

}

export default connect(mapStateToProps, {})(App);
