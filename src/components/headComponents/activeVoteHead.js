import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography'
import '../../App.css';
import { Tween } from 'react-gsap';

class ActiveVoteHeader extends Component {


  render() {
    return(
      <Tween duration={3} from={{ opacity:0 }} to={{opacity:1}}>
        <div>
          <Typography className='routeTitle' style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} variant='display2' align='center' gutterBottom>Active Votes</Typography>
          <h3 style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} align='center'>Voice Your Opinion</h3>
        </div>
      </Tween>
    )
  }
}

export default ActiveVoteHeader;
