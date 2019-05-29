import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import './Timer.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState(st => ({ seconds: st.seconds + 1 }))
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  secondsToTime() {
    const date = new Date(1000 * this.state.seconds);
    return date.toISOString().substr(11, 8);
  }
  render() {
    return (
      <div className='Timer'>
        <Button className='Clock btn-info' disabled>{this.secondsToTime()}</Button>
        <Button className="btn-primary" disabled> Set Game </Button>
        <Button className="btn-danger" disabled> Score: {this.props.score} </Button>
      </div>
    )
  }
}

function mapStatetoProps(state) {
  return { score: state.score };
}

export default connect(mapStatetoProps)(Timer);
