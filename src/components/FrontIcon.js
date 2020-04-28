import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../App.css';
import YesIcon from './headComponents/yesIcon';
import NoIcon from './headComponents/noIcon';


class FrontIcon extends Component {
// SWITCH STATEMENT FOR PAGE TITLE, BASED ON ROUTE PASSED IN FROM APP.JS ROUTER.

  render() {
    let top;
    switch(this.props.view) {
      case 'activeVotes':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Active Votes</h1>
        <h3 className='routeSubTitle' align='center'>Ask The Internet</h3></div>
        break;
      case 'makeVote':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Public Votes</h1>
        <h3 className='routeSubTitle' align='center'>Voice Your Opinion</h3></div>
        break;
      case 'archive':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Public Archive</h1>
        <h3 className='routeSubTitle' align='center'>View Past Votess</h3></div>
        break;
      case 'private':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Private Vote</h1>
        <h3 className='routeSubTitle' align='center'>Ask Your Social Circle</h3></div>
        break;
      case 'privateArchive':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Private Archive</h1>
        <h3 className='routeSubTitle' align='center'>View Past Votes</h3></div>
        break;
      case 'privacyPolicy':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Privacy Policy</h1>
        <h3 className='routeSubTitle' align='center'>Be Informed</h3></div>
        break;
      default:
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>YessNo</h1>
        <h3 className='routeSubTitle' align='center'>Get Answers.. Fast.</h3></div>
        break;
    }
    // let cta = this.props.view === '/' ? <button className='CTAButton'>Make A Vote</button> : ''
    return(
      <div className='topDiv'>
        {top}
        <Container>
          <Row>
            <Col><YesIcon /></Col>
            <Col><NoIcon /></Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export default FrontIcon;
