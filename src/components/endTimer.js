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
    let color = this.props.color;
    let days = Math.floor(this.state.seconds/86400);
    let hours = Math.floor(this.state.seconds%(3600*24)/3600)
    let minutes = Math.floor(this.state.seconds%3600/60);
    let seconds = Math.floor(this.state.seconds%60);
    let day = days === 1 ? ' ' + days + ' day, '
      : days === 0 ? ''
      : days + ' days, ';
    let hour = hours === 1 ? hours + ' hour, '
      : hours + ' hours, '
    let minute = minutes === 1 ? minutes + ' minute, '
      : minutes + ' minutes, ';
    let second = seconds === 1 ? seconds + ' second.'
      : seconds + ' seconds.'
    return(
      <p align='center' style={{color: `${color}`}}><strong>Time Remaining:</strong> {day}{hour}{minute}{second}</p>
    )
  }
}
export default EndTimer;
