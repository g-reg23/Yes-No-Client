import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Container, Row, Col, Alert } from 'reactstrap';
import FrontIcon from './FrontIcon';
import { Link } from 'react-router-dom';
import hacker from '../images/012-hacker.svg';
import onlineVote from '../images/026-online-voting.svg';
import vote from '../images/022-vote-2.svg';
import { Tween } from 'react-gsap';
import { Spring } from 'react-spring/renderprops';
import { clearMessages } from '../actions/messageActions';

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
    if (this.props.message.type === 'loginSuccess' || this.props.message.type === 'regSuccess' || this.props.message.type === 'verifySuccess') return
    else this.props.clearMessages();
  }

  render() {
    this.scroll();
    let message = this.props.message.msg !== '' && this.props.message.id !== 'modal' && this.props.message.id !== 'yesno' ? <Alert align='center' color={this.props.message.type}>{this.props.message.msg}</Alert> : null
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <div style={props}>
            <FrontIcon view='/'/>
            <Container id='about'>
            {message}
              <Tween duration={2} from={{transform:'rotate(180deg)'}}><div style={{marginBottom:'3%'}} align='center'><Link to='/active' className='CTAButton accent-color-two'>Vote!</Link></div></Tween>
              <Row>
                <Col className='subsectDiv firstSub divider-color primary-text-color' md={4}>
                  <p className='subsectTitle'>Private Votes</p>
                  <div align='center'>
                    <img alt='computerVoteIcon' src={onlineVote} width='45%' />
                  </div>
                  <p className='subsectBody'>Build votes for your social circle. If you have a burning question that must be answered quick, make a Private Vote. Each vote member will be sent a link to the vote via text message and email.</p>
                  <div align='center'>
                    <Link to='/private' className='subsectButton accent-color-two' style={{padding:'2.5% 5% 2.5% 5%'}}>Private</Link>
                  </div>
                </Col>
                <Col className='subsectDiv middleDiv secondary-text-color default-primary-color' md={4}>
                  <p style={{color:'whitesmoke'}} className='subsectTitle'>Public Votes</p>
                  <div align='center'>
                    <img alt='votingIcon' src={vote} width='45%' />
                  </div>
                  <p style={{color:'whitesmoke'}} className='subsectBody'>At YessNo anyone can put out a simple yes/no vote to the entire internet. Anytime you have an interesting question to vote on, just follow the simple instructions and you can have a vote up in minutes.</p>
                  <div align='center'>
                    <Link to='/makevote' className='subsectButton accent-color'>Public</Link>
                  </div>
                </Col>
                <Col className='subsectDiv divider-color primary-text-color' md={4}>
                  <p className='subsectTitle'>Vote</p>
                  <div align='center'>
                    <img alt='userIcon' src={hacker} width='45%' />
                  </div>
                  <p className='subsectBody'>All public votes at YessNo have a limited voting period, 500 votes. After that they are stored in the archive. To participate in currently active votes, click Vote. Or browse the archive to see all that made it to 500!</p>
                  <div align='center'>
                    <Link to='/active' className='subsectButton accent-color-two'>Vote</Link>
                    <Link to='/archive' className='subsectButton accent-color-two'>Archive</Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
          )
        }
      </Spring>
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

export default connect(mapStateToProps, {clearMessages})(LandingPage);
