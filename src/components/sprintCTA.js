import React, { useState } from 'react';
import {useSpring, animated as a} from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';
import { Link } from 'react-router-dom';

function SprintCTA() {
  const [vis, setVis] = useState(false);
  const backgroundAnim = useSpring({
    opacity: vis ? 1 : 0,
    from: {opacity:0},
    config: {duration: 1200},
  })
  // const anim = useSpring({
  //   to: async (next, cancel) => {
  //     await next({fontSize:'2rem'})
  //     await next({fontSize:'1.5rem'})
  //   },
  //   from: {fontSize:'1.5rem'},
  // })
  return(
    <VisibilitySensor onChange={(isVisible) => setVis(isVisible)} partialVisibility>
      <a.div className='cTADiv' style={backgroundAnim}>
        <Link className='sprintCTA' to='sprint'>Sprint Anonymously!</Link>
      </a.div>
    </VisibilitySensor>
  )
}

export default SprintCTA;
