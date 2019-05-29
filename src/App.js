import React, { Component } from 'react';
import BoardContainer from './BoardContainers/BoardContainer';
import Timer from './MenuComponents/Timer';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Timer/>
        <BoardContainer />
      </div>
    )
  }
}

export default App;
