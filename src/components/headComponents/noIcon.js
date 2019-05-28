import React, { Component } from 'react';
import { Tween } from 'react-gsap';
import no from '../../images/047-negative.svg';

class NoIcon extends Component {


  render() {

    return(
      <Tween duration={3} from={{ opacity:0 }}>
        <img width='25%' src={no} alt='no vote icon'  />
      </Tween>
    )
  }
}

export default NoIcon;
