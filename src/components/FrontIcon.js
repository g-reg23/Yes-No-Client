import React, { Component } from 'react';
import { Container, Row, Col } from 'react-grid-system';
import '../App.css';
import HomeHeader from './headComponents/homeHead'
import MakeVoteHeader from './headComponents/makeVoteHead';
import ActiveVoteHeader from './headComponents/activeVoteHead';
import YesIcon from './headComponents/yesIcon'
import NoIcon from './headComponents/noIcon'

class FrontIcon extends Component {
// SWITCH STATEMENT FOR PAGE TITLE, BASED ON ROUTE PASSED IN FROM APP.JS ROUTER.

  render() {
    let top;
    switch(this.props.view) {
      case 'activeVotes':
        top = <ActiveVoteHeader />
        break;
      case 'makeVote':
        top = <MakeVoteHeader />
        break;
      default:
        top = <HomeHeader />
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
