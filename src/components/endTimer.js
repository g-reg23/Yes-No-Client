import React, { Component } from 'react';
import '../App.css';



class EndTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: ((new Date(this.props.end).getTime()/1000) - (new Date().getTime()/1000)).toFixed(0),
      time: {},
      intervalId: null
    }
    this.ticker = this.ticker.bind(this);
    this.setSeconds = this.setSeconds.bind(this);
  }
  ticker() {
    let newTime = this.state.seconds;
    let set = this.setSeconds;
    let id = setInterval(function() {
      newTime--;
      set(newTime)
    }, 1000);
    this.setState({intervalId: id})
  }
  setSeconds(newTime) {
    this.setState({seconds: newTime})
  }
  componentDidMount() {
    if (this.state.seconds > 0) {
      this.ticker();
    } else {
      this.setSeconds(0)
    }
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  render() {
    return(
      <p style={{color: 'white'}}><strong>Time Remaining:</strong> {Math.floor(this.state.seconds%(3600*24)/3600)} hours, {Math.floor(this.state.seconds%3600/60)} minutes, {Math.floor(this.state.seconds%60)} seconds.</p>
    )
  }
}
export default EndTimer;
