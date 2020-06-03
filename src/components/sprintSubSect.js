import React, { useState } from 'react';
import '../App.css';
import {useSpring, animated as a} from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';
import hacker from '../images/012-hacker.svg';
import { Link } from 'react-router-dom';

function SprintSubSect(props) {
  const [vis, setVis] = useState(false);
  const backgroundAnim = useSpring({
    opacity: vis ? 1 : 0,
    from: {opacity:0},
    config: {duration: 1200},
  })
  return (
    <VisibilitySensor onChange={(isVisible) => setVis(isVisible)} partialVisibility>
      <a.div style={backgroundAnim} className='subsectDiv secondary-text-color' md={4}>
          <p className='subsectTitle'>Sprint</p>
          <div align='center'>
            <img alt='userIcon' src={hacker} width='45%' />
          </div>
          <p className='subsectBody'>YessNo Sprints are quick yes-no surveys on interesting and important
          topics. Currently the YessNo team makes the questions, which are for the enitre internet to participate in
          anonymously. Coming soon YessNo members will be able to create YessNo community Sprints as well as small group
          or private Sprints.</p>
          <div align='center'>
            <Link to='/sprint' className='subsectButton'>Sprint</Link>
          </div>
      </a.div>
    </VisibilitySensor>
  )
}

export default SprintSubSect;
