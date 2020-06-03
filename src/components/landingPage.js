import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Container, Row, Col, Alert } from 'reactstrap';
import FrontIcon from './FrontIcon';
import { Link } from 'react-router-dom';
import { clearMessages, getMessages } from '../actions/messageActions';
import SprintCTA from './sprintCTA';
import PrivateSubSect from './privateSubSect';
import PublicSubSect from './publicSubSect';
import SprintSubSect from './sprintSubSect';

class LandingPage extends Component {
  componentDidMount() {
    if (this.props.message.id === 'loginSuccess' || this.props.message.id === 'regSuccess' || this.props.message.id === 'verifySuccess') return
    else this.props.clearMessages();
  }

  render() {
    // this.scroll();
    let message = this.props.message.msg !== '' && this.props.message.id !== 'modal' && this.props.message.id !== 'yesno' ? <Alert align='center' color={this.props.message.type}>{this.props.message.msg}</Alert> : null
    return (
          <div>
            <FrontIcon view='/' loggedIn={this.props.auth.isAuthenticated}/>
            <div id='about'>
              <div className='alertDiv'>
                {message}
              </div>
              <SprintCTA />
              <div className='subsectContainer'>
                <PrivateSubSect />
                <PublicSubSect />
                <SprintSubSect />
              </div>
            </div>
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
