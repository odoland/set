import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'reactstrap';
import { connect } from 'react-redux';
import './Timer.css';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0
    };
    this.secondsToTime = this.secondsToTime.bind(this);
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
      <Navbar color="dark" light expand="md">
        <Nav className="mr-auto" navbar>
          <Button className="btn-secondary" disabled> Set </Button>
          <Button className='btn-info' disabled>{this.secondsToTime()}</Button>
          <Button className="btn-danger" disabled> Score: {this.props.score} </Button>
        </Nav>
      </Navbar>
    )
  }
}

function mapStatetoProps(state) {
  return { score: state.score };
}

export default connect(mapStatetoProps)(Timer);
