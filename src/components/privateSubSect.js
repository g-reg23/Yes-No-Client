import React, { useState } from 'react';
import '../App.css';
import {useSpring, animated as a} from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';
import onlineVote from '../images/026-online-voting.svg';
import { Link } from 'react-router-dom';

function PrivateSubSect(props) {
  const [vis, setVis] = useState(false);
  const backgroundAnim = useSpring({
    opacity: vis ? 1 : 0,
    from: {opacity:0},
    config: {duration: 1200},
  })
  return (
    <VisibilitySensor onChange={(isVisible) => setVis(isVisible)} partialVisibility>
      <a.div style={backgroundAnim} className='subsectDiv secondary-text-color' md={4}>
        <p className='subsectTitle'>Private Votes</p>
        <div align='center'>
          <img alt='computerVoteIcon' src={onlineVote} width='45%' />
        </div>
        <p className='subsectBody'>Build votes for your social circle.
          If you have a burning question that must be answered quick, make a Private Vote.
          Each vote member will be immediately sent a link to the vote via SMS text message.
          Vote members, including the vote creator, must vote within a time-frame specified by the creator.
          all past private votes are stored in the<Link className='subLink' to='privateArchive'>Private Archive</Link>
        </p>
        <div align='center'>
          <Link to='/private' className='subsectButton' style={{padding:'2.5% 5% 2.5% 5%'}}>Private</Link>
        </div>
      </a.div>
    </VisibilitySensor>
  )
}

export default PrivateSubSect;
