import React, { useState } from 'react';
import '../App.css';
import voteIcon from '../images/004-voting.svg';
import {useSpring, animated as a} from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';


function VoteIcon() {
  const [vis, setVis] = useState(false);
  const backgroundAnim = useSpring({
    opacity: vis ? 1 : 0,
    from: {opacity:0},
    config: {duration: 1000},
  })

  return(
    <VisibilitySensor onChange={(isVisible) => setVis(isVisible)} partialVisibility>
      <a.div className='voteIconDiv' style={backgroundAnim}>
        <img src={voteIcon} alt='vote icon' width='30%' className='centerPic' />
      </a.div>
    </VisibilitySensor>
  )
}

export default VoteIcon;
