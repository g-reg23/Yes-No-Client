import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../App.css';
import Typography from '@material-ui/core/Typography'
import YesIcon from './headComponents/yesIcon';
import NoIcon from './headComponents/noIcon';
import { Tween } from 'react-gsap';

class FrontIcon extends Component {
// SWITCH STATEMENT FOR PAGE TITLE, BASED ON ROUTE PASSED IN FROM APP.JS ROUTER.

  render() {
    let top;
    switch(this.props.view) {
      case 'activeVotes':
        top = <div><Typography className='routeTitle' style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} variant='display2' align='center' gutterBottom>Active Votes</Typography>
        <h3 style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} align='center'>Ask The Internet</h3></div>
        break;
      case 'makeVote':
        top = <div><Typography className='routeTitle' style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} variant='display2' align='center' gutterBottom>Public Votes</Typography>
        <h3 style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} align='center'>Voice Your Opinion</h3></div>
        break;
      case 'archive':
        top = <div><Typography className='routeTitle' style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} variant='display2' align='center' gutterBottom>Public Archive</Typography>
        <h3 style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} align='center'>View Past Votess</h3></div>
        break;
      case 'private':
        top = <div><Typography className='routeTitle' style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} variant='display2' align='center' gutterBottom>Private Vote</Typography>
        <h3 style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} align='center'>Ask Your Social Circle</h3></div>
        break;
      case 'privateArchive':
        top = <div><Typography className='routeTitle' style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} variant='display2' align='center' gutterBottom>Private Archive</Typography>
        <h3 style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} align='center'>View Past Votes</h3></div>
        break;
      case 'privacyPolicy':
        top = <div><Typography className='routeTitle' style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} variant='display2' align='center' gutterBottom>Privacy Policy</Typography>
        <h3 style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} align='center'>Be Infromed</h3></div>
        break;
      default:
        top = <div><Typography className='routeTitle' style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} variant='display2' align='center' gutterBottom>YessNo</Typography>
        <h3 style={{fontWeight:'9', color:'rgb(211, 211, 211)'}} align='center'>Get Answers.. Fast.</h3></div>
        break;
    }
    // let cta = this.props.view === '/' ? <button className='CTAButton'>Make A Vote</button> : ''
    return(
      <div className='topDiv'>
        <Tween duration={3} from={{ opacity:0 }} to={{opacity:1}}>
          {top}
          <Container>
            <Row>
              <Col><YesIcon /></Col>
              <Col><NoIcon /></Col>
            </Row>
          </Container>
        </Tween>
      </div>
    )
  }
}

export default FrontIcon;
