import React, { Component } from 'react';
import '../App.css';
import voteIcon from '../images/004-voting.svg';
// import { Tween, Timeline } from 'react-gsap';


class VoteIcon extends Component {


  render() {
    return(
      <div className='voteIconDiv'>
        <img src={voteIcon} alt='vote icon' width='30%' className='centerPic' />
      </div>
    )
  }
}

export default VoteIcon;
