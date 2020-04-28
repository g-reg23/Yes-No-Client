import React, { Component } from 'react';
import yes from '../../images/046-positive.svg';

class YesIcon extends Component {


  render() {

    return(
      <img className='titleIcons yesTitleIcon' src={yes} alt='yes vote'  />
    )
  }
}

export default YesIcon;
