import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import { googleLogin, logout } from '../../actions/authActions';
import { getMessages, clearMessages } from '../../actions/messageActions';
import propTypes from 'prop-types';

class Google extends Component {
  // constructor(props) {
  //   super(props);
  //   this.responseGoogle = this.response
  // }
  static propTypes = {
    googleLogin: propTypes.func.isRequired,
    logout: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    message: propTypes.object.isRequired,
  }
  responseGoogle = (response) => {
    if (!response.error) {
      this.props.googleLogin(response.profileObj);
    }

  }

  render() {
    let googleContent = <GoogleLogin
        clientId="845781917076-n579juhcqldi8c5h9u3ka042l1g4jgm8.apps.googleusercontent.com"
        buttonText="Login With Google"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={'single_host_origin'}
    />

    return(
      <div>{googleContent}</div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.authObject,
  message: state.messageObject
})

export default connect(mapStateToProps, { googleLogin, logout, getMessages, clearMessages })(Google);
