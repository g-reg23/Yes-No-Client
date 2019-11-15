import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Container, Row, Col, Alert, Button, Card, CardBody } from 'reactstrap';
import FrontIcon from './FrontIcon';
import queryString from 'query-string';
import {resetPass} from '../actions/authActions';
import { getMessages, clearMessages } from '../actions/messageActions';

class ResetPass extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pass: '',
      confirm: ''
    }
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  submitPassReset = () => {
    const values = queryString.parse(this.props.location.search);
    if (this.state.pass === this.state.confirm) {
      const info = {
        token: values,
        username: this.state.username,
        pass: this.state.pass,
        confirm: this.state.confirm
      }
      this.props.resetPass(info, this.props.match.params.id);
      this.props.getMessages({'msg': 'Submitted for approval'}, 'client', 'success', null)
      this.setState({
        username: '',
        pass: '',
        confirm: ''
      })
      this.props.clearMessages();
    } else {
      this.props.getMessages({'msg': 'Both passwords must match'}, 'client', 'error', null)
    }
  }

  render() {
    let alert = this.props.message.msg !== '' && this.props.message.id !== 'modal'  && this.props.message.id !== 'yesno' ?
    <Alert align='center' color='success'>{this.props.message.msg}</Alert> : null;
    return (
      <div>
        <FrontIcon view='/'/>
        <div ref='makeVoteDiv'>
          <Container className='voteInfoContainer'>
            <Row>
              <Col>
                {alert}
                <Card className='innerCard' body>
                  <CardBody>
                    <h3 align='center'>Password Reset</h3>
                    <input className='resetInput' type='text' placeholder='Username' name='username' value={this.state.username} onChange={this.handleChange}/>
                    <input className='resetInput' type='password' placeholder='New Password' value={this.state.pass} name='pass' onChange={this.handleChange}/>
                    <input className='resetInput' type='password' placeholder='Confirm Password' value={this.state.confirm} name='confirm' onChange={this.handleChange}/>
                    <div className='centerButtonRow'>
                      <Button color="primary" onClick={this.submitPassReset} className='setButton'>Submit</Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}
ResetPass.propTypes = {
  message: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  resetPass: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  message: state.messageObject,
  auth: state.authObject
})
export default connect(mapStateToProps, {resetPass, getMessages, clearMessages})(ResetPass);
