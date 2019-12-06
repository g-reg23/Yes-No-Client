import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { login, logout, forgotPassword } from '../../actions/authActions';
import { getMessages, clearMessages } from '../../actions/messageActions';
import propTypes from 'prop-types';
import Facebook from './facebook'
import Google from './google'

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginMod: false,
      logName: '',
      logPass: '',
      forgotMod: false,
      emailName: '',
    }
    this.loginModal = this.loginModal.bind(this);
    this.logout = this.logout.bind(this);
  }
  static propTypes = {
    login: propTypes.func.isRequired,
    logout: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    message: propTypes.object.isRequired,
  }
  loginModal() {
    this.props.clearMessages();
    this.setState({
      loginMod: !this.state.loginMod
    })
    if (this.props.colState === true) {
      this.props.handleClick();
    }
    // togLoginModal();
  }
  submitLog = () => {
    if (this.state.logName.length >= 3 && this.state.logPass.length >= 3) {
      const info = {
        username: this.state.logName,
        password: this.state.logPass
      }
      this.props.login(info);
      this.setState({
        logName: '',
        logPass: '',
      })
    }else {
      this.props.getMessages({'msg': 'Username and password must be at least 3 characters.'}, 'client', 'danger', 'modal')
    }
  }
  forgotModal = () => {
    this.setState({
      loginMod: !this.state.loginMod,
      forgotMod: !this.state.forgotMod,
    })
  }
  cancelForgotModal = () => {
    this.setState({
      forgotMod: !this.state.forgotMod,
    })
  }
  submitForgot = () => {
    let re = /\S+@\S+\.\S+/;
    if (re.test(this.state.emailName)) {
      this.props.forgotPassword(this.state.emailName);
      this.props.getMessages({'msg': 'Thank you, your email was submitted, if there is an account associated with this email, one will arrive shortly.'}, 'client', 'success', null)
      this.cancelForgotModal();
      this.setState({emailName: ''})
    } else {
      this.props.getMessages({'msg': 'Please submit a valid email address.'}, 'client', 'danger', 'modal')
    }
  }
  logout() {
    let social;
    if (this.props.auth.facebook === true || this.props.auth.google === true) {
      social = true;
    } else {
      social = false
    }
    this.props.logout(social);
  }
  handleLogChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      if (this.state.loginMod) {
        this.loginModal();
      }
    }
  }
  render() {
    let modAlert = this.props.message.id === 'modal' ? <Alert color={this.props.message.type}>{this.props.message.msg}</Alert> : null;
    const auth = this.props.auth.isAuthenticated === false ? <Link className='nav-link navLink' onClick={this.loginModal} to='#'>Login</Link> :
    <Link to='#' className= 'nav-link navLink' onClick={this.logout}>Logout</Link>;
    return (
        <div>
            {auth}

            <Modal isOpen={this.state.loginMod} toggle={this.loginModal} className='login-modal' centered style={{marginTop:'3.5%'}}>
              <h3 className='mt-5' align='center'>Login with YessNo</h3>
              <ModalBody style={{padding:'7% 5% 7% 5%'}}>
                {modAlert}
                <input placeholder='Username' type='text'  className='textInput' name='logName' value={this.state.logName} onChange={this.handleLogChange} />
                <input placeholder='Password' type='password'  className='textInput' name='logPass' value={this.state.logPass} onChange={this.handleLogChange} />
              </ModalBody>
              <ModalFooter style={{background:'lightgray'}}>
                <Button color="primary" onClick={this.submitLog}>Submit</Button>
                <Button color="danger" onClick={this.loginModal}>Cancel</Button>
              </ModalFooter>
              <a href='#' align='center' onClick={this.forgotModal} style={{fontStyle:'bold', color:'blue', padding:'3%', paddingRight:'5%', cursor:'pointer'}}>Forgot Your Password? Click Here</a>
            </Modal>
            <Modal isOpen={this.state.forgotMod} toggle={this.forgotModal} className='login-modal' centered style={{marginTop:'3.5%'}}>
              <h3 className='mt-5' align='center'>Password Reset</h3>
              <ModalBody style={{padding:'7% 5% 7% 5%'}}>
                {modAlert}
                <p>Enter the email address associated with your YessNo account</p>
                <input placeholder='YessNo Email' type='text'  className='textInput' name='emailName' onChange={this.handleLogChange} />
              </ModalBody>
              <ModalFooter style={{background:'lightgray'}}>
                <Button color="primary" onClick={this.submitForgot}>Submit</Button>
                <Button color="danger" onClick={this.cancelForgotModal}>Cancel</Button>
              </ModalFooter>
            </Modal>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authObject,
  message: state.messageObject
})

export default connect(mapStateToProps, { login, logout, getMessages, clearMessages, forgotPassword })(LoginModal);
