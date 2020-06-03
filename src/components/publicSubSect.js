import React, { useState } from 'react';
import '../App.css';
import {useSpring, animated as a} from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';
import { Link } from 'react-router-dom';
import vote from '../images/022-vote-2.svg';

function PublicSubSect(props) {
  const [vis, setVis] = useState(false);
  const backgroundAnim = useSpring({
    opacity: vis ? 1 : 0,
    from: {opacity:0},
    config: {duration: 1200},
  })
  return (
    <VisibilitySensor onChange={(isVisible) => setVis(isVisible)} partialVisibility>
      <a.div style={backgroundAnim} className='subsectDiv middleDiv secondary-text-color' md={4}>
        <p className='subsectTitleOdd'>Public Votes</p>
        <div align='center'>
          <img alt='votingIcon' src={vote} width='45%' />
        </div>
        <p className='subsectBodyOdd'>At YessNo anyone can put out a simple yes/no vote to the entire internet. Anytime you have an interesting question to vote on, just follow the simple instructions and you can have a vote up in minutes.
        All pubic votes are retired votes at 1000 votes. View retired votes at the <Link to='/archive'className='subLink'>Public Archive</Link></p>
        <div align='center'>
          <Link to='/active' className='subsectButtonOdd'>Vote</Link>
          <Link to='/makevote' className='subsectButtonOdd'>Build</Link>
        </div>
      </a.div>
    </VisibilitySensor>
  )
}

export default PublicSubSect;
