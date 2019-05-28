import React, { Component } from 'react';
import { Tween } from 'react-gsap';
import yes from '../../images/046-positive.svg';

class YesIcon extends Component {


  render() {

    return(
      <Tween duration={3} from={{ opacity:0 }}>
        <img style={{float:'right'}} width='25%' src={yes} alt='yes vote'  />
      </Tween>
    )
  }
}

export default YesIcon;
