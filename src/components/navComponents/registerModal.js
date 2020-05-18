import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { getMessages, clearMessages } from '../../actions/messageActions';
import ProfileModal from './profile';
import Google from './google'

import propTypes from 'prop-types';

const style = {
  paddingLeft:'3%',
}


class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registerMod: false,
      regName: '',
      regEmail: '',
      regPass: '',
      regVPass: ''
    }
    this.registerModal = this.registerModal.bind(this);
  }
  static propTypes = {
    register: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    message: propTypes.object.isRequired,
  }
  registerModal(e)  {
    this.setState({
      registerMod: !this.state.registerMod
    })
    if (this.props.colState === true) {
      this.props.handleClick();
    }
  }
  componentDidUpdate() {
    if (this.props.auth.isAuthenticated) {
      if (this.state.registerMod) {
        this.registerModal();
      }
    }
  }

  submitReg = () => {
    if(this.state.regPass === this.state.regVPass) {
      // Simple email regex for frontend validation.
      let re = /\S+@\S+\.\S+/;
      let passre = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
      if (re.test(this.state.regEmail)) {
        if (this.state.regPass === this.state.regVPass) {
          if (passre.test(this.state.regPass)){
            if (this.state.regName.length > 1 && this.state.regName.length <= 21) {
              let info = {
                username: this.state.regName,
                email: this.state.regEmail,
                password: this.state.regPass
              }
              this.props.register(info);
              this.registerModal();
            } else {
              this.props.getMessages({'msg': 'Username must be at least 2 characters long and no longer than 20 characters.'}, 'client', 'danger', '')
            }
          } else {
            this.props.getMessages({'msg': 'Your password must contain 1 uppercase letter, 1 lowercase letter, and 1 number.'}, 'client', 'danger', 'modal')
          }
        } else {
          this.props.getMessages({'msg': 'Passwords must match.'}, 'client', 'danger', 'modal')
        }
      } else {
        this.props.getMessages({'msg': 'Email must be in standard email format.'}, 'client', 'danger', 'modal')
      }
    }else {
      this.props.getMessages({'msg': 'Passwords do not match'}, 'client', 'danger', 'modal')
    }
  }

  handleRegChange = e => {
    this.setState({[e.target.name]: e.target.value})

  }
  render() {
    let modAlert = this.props.message.id === 'modal' ? <Alert align='center' color={this.props.message.type}>{this.props.message.msg}</Alert> : null;
    const reg = !this.props.auth.isAuthenticated ? <Link className='nav-link navLink white-text' onClick={this.registerModal} to='#' style={style}>Sign Up</Link>:
    <ProfileModal handleClick={this.props.handleClick} colState={this.props.colState}/>
    return (
        <div>
            {reg}
            <Modal isOpen={this.state.registerMod} toggle={this.registerModal} className='register-modal' centered style={{marginTop:'3.5%'}}>
              <h3 className='mt-5' align='center'>Register with YessNo</h3>
              <ModalBody style={{padding:'7% 5% 7% 5%'}}>
                {modAlert}
                <input placeholder='Username' type='text'  className='textInput' ref='username' name='regName' onChange={this.handleRegChange} />
                <input placeholder='Email' type='email'  className='textInput' ref='email' name='regEmail' onChange={this.handleRegChange} />
                <input placeholder='Password' type='password'  className='textInput' ref='password' name='regPass' onChange={this.handleRegChange} />
                <input placeholder='Verify Password' type='password'  className='textInput' ref='verifypass' name='regVPass' onChange={this.handleRegChange} />
              </ModalBody>
              <ModalFooter style={{background:'lightgray'}}>
                <Button color="primary" onClick={this.submitReg}>Submit</Button>
                <Button color="danger" onClick={this.registerModal}>Cancel</Button>
              </ModalFooter>
              <h3 className='socialHead' align='center'>Social Login</h3>
              <ModalFooter className='socialFooter' style={{background:'lightgray'}}>
                <Google />
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

export default connect(mapStateToProps, { register, getMessages, clearMessages })(RegisterModal);
