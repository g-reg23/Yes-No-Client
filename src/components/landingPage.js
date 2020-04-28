import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Container, Row, Col, Alert } from 'reactstrap';
import FrontIcon from './FrontIcon';
import { Link } from 'react-router-dom';
import hacker from '../images/012-hacker.svg';
import onlineVote from '../images/026-online-voting.svg';
import vote from '../images/022-vote-2.svg';
import LandingIcon from './landingIcon';
import { clearMessages, getMessages } from '../actions/messageActions';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this);
  }
  scroll() {
    window.scrollTo(0,0)
  }
  componentDidUpdate(prevProps) {
    if (prevProps.message.msg !== this.props.message.msg) {
      window.scroll(0,50);
    }
  }
  componentDidMount() {
    if (this.props.message.id === 'loginSuccess' || this.props.message.id === 'regSuccess' || this.props.message.id === 'verifySuccess') return
    else this.props.clearMessages();
  }

  render() {
    // this.scroll();
    let message = this.props.message.msg !== '' && this.props.message.id !== 'modal' && this.props.message.id !== 'yesno' ? <Alert align='center' color={this.props.message.type}>{this.props.message.msg}</Alert> : null
    return (
          <div>
            <FrontIcon view='/'/>
            <Container id='about'>
              <div className='alertDiv'>
                {message}
              </div>
              <div style={{marginBottom:'3%'}} align='center'><Link to='/active' className='CTAButton'>Vote!</Link></div>
              <Row>
                <Col className='subsectDiv firstSub divider-color primary-text-color' md={4}>
                  <p className='subsectTitle'>Private Votes</p>
                  <div align='center'>
                    <img alt='computerVoteIcon' src={onlineVote} width='45%' />
                  </div>
                  <p className='subsectBody'>Build votes for your social circle. If you have a burning question that must be answered quick, make a Private Vote. Each vote member will be immediately sent a link to the vote via SMS text message.</p>
                  <div align='center'>
                    <Link to='/private' className='subsectButton' style={{padding:'2.5% 5% 2.5% 5%'}}>Private</Link>
                  </div>
                </Col>
                <Col className='subsectDiv middleDiv secondary-text-color default-primary-color' md={4}>
                  <p style={{color:'whitesmoke'}} className='subsectTitle'>Public Votes</p>
                  <div align='center'>
                    <img alt='votingIcon' src={vote} width='45%' />
                  </div>
                  <p style={{color:'whitesmoke'}} className='subsectBody'>At YessNo anyone can put out a simple yes/no vote to the entire internet. Anytime you have an interesting question to vote on, just follow the simple instructions and you can have a vote up in minutes.</p>
                  <div align='center'>
                    <Link to='/makevote' className='subsectButtonOdd'>Public</Link>
                  </div>
                </Col>
                <Col className='subsectDiv divider-color primary-text-color' md={4}>
                  <p className='subsectTitle'>Vote</p>
                  <div align='center'>
                    <img alt='userIcon' src={hacker} width='45%' />
                  </div>
                  <p className='subsectBody'>All public votes at YessNo have a limited voting period, 500 votes. After that they are stored in the archive. To participate in currently active votes, click Vote. Or browse the archive to see all that made it to 500!</p>
                  <div align='center'>
                    <Link to='/active' className='subsectButton'>Vote</Link>
                    <Link to='/archive' className='subsectButton'>Archive</Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
    )
  }
}
LandingPage.propTypes = {
  votes: propTypes.object.isRequired,
  message: propTypes.object.isRequired,
  auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  votes: state.voteObject,
  message: state.messageObject,
  auth: state.authObject
})

export default connect(mapStateToProps, {clearMessages, getMessages})(LandingPage);
