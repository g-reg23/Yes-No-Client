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

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.scroll = this.scroll.bind(this);
  }
  scroll() {
    window.scrollTo(0,0)
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.message.msg !== this.props.message.msg) {
      window.scroll(0,50);
    }
  }

  render() {
    console.log(this.props.state);
    this.scroll();
    let message = this.props.message.msg !== '' && this.props.message.id !== 'modal' && this.props.message.id !== 'yesno' ? <Alert align='center' color='success'>{this.props.message.msg}</Alert> : null
    return (
      <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 0 }}>
        {props => (
          <div style={props}>
            <FrontIcon view='/'/>
            <Container id='about'>
            <Tween duration={2} from={{transform:'rotate(180deg)'}}><div style={{marginBottom:'3%'}} align='center'><Link to='/private' className='CTAButton'>Make a Private Vote!</Link></div></Tween>
            {message}
              <Row>
                <Col className='subsectDiv firstSub' md={4}>
                  <p className='subsectTitle'>Private Votes</p>
                  <div align='center'>
                    <img alt='computerVoteIcon' src={onlineVote} width='45%' />
                  </div>
                  <p className='subsectBody'>Build votes for your social circle. If you have a burning question that must be answered quick, make a Private Vote. Each vote member will be sent a link to the vote via email, text message or both.</p>
                  <div align='center'>
                    <Link to='/private' className='subsectButton' style={{padding:'2.5% 5% 2.5% 5%'}}>Private</Link>
                  </div>
                </Col>
                <Col className='subsectDiv middleDiv' md={4}>
                  <p style={{color:'whitesmoke'}} className='subsectTitle'>Public Votes</p>
                  <div align='center'>
                    <img alt='votingIcon' src={vote} width='45%' />
                  </div>
                  <p style={{color:'whitesmoke'}} className='subsectBody'>At YessNo anyone can put out a simple yes/no vote to the entire internet. Anytime you have an interesting question to vote on, just follow the simple instructions and you can have a vote up in minutes.</p>
                  <div align='center'>
                    <Link to='/makevote' className='subsectButton'>Public</Link>
                  </div>
                </Col>
                <Col className='subsectDiv' md={4}>
                  <p className='subsectTitle'>Vote</p>
                  <div align='center'>
                    <img alt='userIcon' src={hacker} width='45%' />
                  </div>
                  <p className='subsectBody'>All public votes at YessNo have a limited voting period, 500 votes. After that they are stored in the archive. To participate in currently active votes, click Vote. Or browse the archive to see all that made it to 500!</p>
                  <div align='center'>
                    <Link to='/active' className='subsectButton'>Active</Link>
                    <Link to='/active' className='subsectButton'>Archive</Link>
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

export default connect(mapStateToProps, {})(LandingPage);
