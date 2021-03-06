import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../../App.css';
import { Link } from 'react-router-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { updateProfile, deleteAccount } from '../../actions/authActions';
import { getMessages, clearMessages } from '../../actions/messageActions';
import propTypes from 'prop-types';

const style = {
  paddingLeft:'3%',
}

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profMod: false,
      profName: this.props.auth.username,
      profPass: ''
    }
    this.profModal = this.profModal.bind(this);
    this.handleProfChange = this.handleProfChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.delete = this.delete.bind(this);
  }
  static propTypes = {
    // update: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    message: propTypes.object.isRequired,
    updateProfile: propTypes.func.isRequired,
    deleteAccount: propTypes.func.isRequired
  }
  profModal()  {
    if (!this.props.auth.google) {
      this.setState({
        profMod: !this.state.profMod,
        profName: this.props.auth.username,
        profEmail: this.props.auth.email,
      });
      if (this.props.colState === true) {
        this.props.handleClick();
      }
    } else {
      this.setState({profMod:false});
      this.props.getMessages({'msg': 'Sorry you cannot edit your Google credentials.'}, '', 'warning', '');
      return;
    }
    // togRegModal();
  }
  updateProfile() {
    if (!this.props.auth.google){
      if (this.state.profName.length > 2 && this.state.profEmail.length > 2 && this.state.profPass.length > 2) {
        let newProfile = {
          _id: this.props.auth._id,
          username:this.props.auth.username,
          newUsername: this.state.profName,
          password: this.state.profPass,
        };
        this.props.updateProfile(newProfile);
      } else {
        this.props.getMessages({'msg': 'All fields must have at least 2 characters'}, null, 'danger', 'modal' )
      }
    } else {
      this.props.getMessages({'msg': 'Sorry you cannot edit your google credentials.'}, null, 'danger', '')
      return
    }
  }

  handleProfChange = e => {
    this.setState({[e.target.name]: e.target.value})

  }
  delete() {
    if (this.state.profPass.length < 3) {
      this.props.getMessages({'msg': 'You must enter your password.'}, null, 'error', 'modal');
    } else return this.props.deleteAccount(this.props.auth._id, this.state.profPass);

  }
  componentDidUpdate(prevProps) {
    if (prevProps.auth.username !== this.props.auth.username || prevProps.auth.email !== this.props.auth.email) {
      this.profModal();
    }
  }
  render() {
    let modAlert = this.props.message.id === 'modal' ? <Alert color={this.props.message.type} align='center'>{this.props.message.msg}</Alert> : null;
    let social = this.props.auth.facebook === true || this.props.auth.google === true ? <Alert color='warning'>You cannot edit your facebook or google information.</Alert> :
    null
    return (
        <div>
            <Link className='nav-link navLink navUsername white-text' onClick={this.profModal} to='#' style={style}>{this.props.auth.username}</Link>
            <Modal isOpen={this.state.profMod} toggle={this.profModal} className='register-modal' centered style={{marginTop:'3.5%'}}>
              <ModalHeader style={{background:'lightgray'}}>Update Profile</ModalHeader>
              <ModalBody style={{padding:'7% 5% 7% 5%'}}>
                {social}
                {modAlert}
                <p align='center'>Changing your email is currently disabled.</p>
                <input placeholder='Username' type='text'  className='textInput' ref='username' name='profName' value={this.state.profName} onChange={this.handleProfChange} />
                <input placeholder='Password' type='password'  className='textInput' ref='password' name='profPass' onChange={this.handleProfChange} />
              </ModalBody>
              <ModalFooter style={{background:'lightgray'}}>
                <Button color="primary" onClick={this.updateProfile}>Submit</Button>
                <Button color="danger" onClick={this.profModal}>Cancel</Button>
                <Button color="danger" onClick={this.delete}>Delete</Button>
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

export default connect(mapStateToProps, { updateProfile, getMessages, clearMessages, deleteAccount })(ProfileModal);
