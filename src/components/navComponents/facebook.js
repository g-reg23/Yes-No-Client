import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import { facebookLogin, logout } from '../../actions/authActions';
import { getMessages, clearMessages } from '../../actions/messageActions';
import propTypes from 'prop-types';


class Facebook extends Component {
  constructor(props) {
    super(props);
    this.componentClicked = this.componentClicked.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
  }
  static propTypes = {
    facebookLogin: propTypes.func.isRequired,
    logout: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    message: propTypes.object.isRequired,
  }

  componentClicked()  {
    console.log('hi');
  }

  responseFacebook(response) {
    console.log(response.status);
    if (response.status !== undefined) {
      this.props.facebookLogin(response);
    }
  }

  render() {
    let fbContent = <FacebookLogin
          appId="2395650710760969"
          autoLoad={false}
          fields="name,email,picture"
          onClick={this.componentClicked}
          callback={this.responseFacebook} />

    return(
      <div className='mt-3'>{fbContent}</div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.authObject,
  message: state.messageObject
})

export default connect(mapStateToProps, { facebookLogin, logout, getMessages, clearMessages })(Facebook);
