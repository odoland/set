import React, { Component } from 'react';
import Board from './BoardComponents/Board';
import Timer from './MenuComponents/Timer';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Timer/>
        <Board />
      </div>
    )
  }
}

export default App;
