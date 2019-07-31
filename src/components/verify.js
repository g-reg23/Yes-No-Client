import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { Redirect } from 'react-router'
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
import queryString from 'query-string';
import {verifyEmail} from '../actions/authActions'

class Verify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    }
    this.redirect = this.redirect.bind(this);
  }
  redirect() {
    this.setState({loaded: !this.state.loaded})
  }
  componentDidMount() {
    const values = queryString.parse(this.props.location.search)
    console.log(values.user + ': ' + values.hash + ': ' + this.props.match.params.id);
    this.props.verifyEmail(values.user, values.hash, this.props.match.params.id);
    this.redirect()
  }

  render() {
    if (this.state.loaded) {
       return <Redirect to='/' fromVerify={true} />;
     }
    let message = this.props.message.msg !== '' && this.props.message.id !== 'modal' && this.props.message.id !== 'yesno' ? <Alert align='center' color='success'>{this.props.message.msg}</Alert> : null
    return (
          <div>
            <FrontIcon view='/'/>
            <Container id='about'>
            {message}
            <Tween duration={2} from={{transform:'rotate(180deg)'}}><div style={{marginBottom:'3%'}} align='center'><Link to='/active' className='CTAButton'>VOTE NOW!</Link></div></Tween>
              <Row>
                <Col className='subsectDiv firstSub' md={4}>
                  <p className='subsectTitle'>Build</p>
                  <div align='center'>
                    <img alt='computerVoteIcon' src={onlineVote} width='45%' />
                  </div>
                  <p className='subsectBody'>At YessNo anyone can put out a simple yes/no vote to the internet. Anytime you have an interesting question to vote on, just follow the simple instructions and you can have a vote up in minutes.</p>
                  <div align='center'>
                    <Link to='/makevote' className='subsectButton' style={{padding:'2.5% 5% 2.5% 5%'}}>Build</Link>
                  </div>
                </Col>
                <Col className='subsectDiv middleDiv' md={4}>
                  <p style={{color:'whitesmoke'}} className='subsectTitle'>Participate</p>
                  <div align='center'>
                    <img alt='votingIcon' src={vote} width='45%' />
                  </div>
                  <p style={{color:'whitesmoke'}} className='subsectBody'>Browse the active votes section to vote in any poll you choose. All votes are active for 1 week and then the most popular votes are archived.</p>
                  <div align='center'>
                    <Link to='/active' className='subsectButton'>Vote</Link>
                  </div>
                </Col>
                <Col className='subsectDiv' md={4}>
                  <p className='subsectTitle'>Archive</p>
                  <div align='center'>
                    <img alt='userIcon' src={hacker} width='45%' />
                  </div>
                  <p className='subsectBody'>All votes at YessNo have a limited voting period, 200 votes. After that they are stored in the archive. Browse the archive to see all the archived votes.</p>
                  <div align='center'>
                    <Link to='/active' className='subsectButton'>Browse</Link>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
    )
  }
}
Verify.propTypes = {
  message: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  verifyEmail: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  message: state.messageObject,
  auth: state.authObject
})

export default connect(mapStateToProps, {verifyEmail})(Verify);
