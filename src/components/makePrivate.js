import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import ConstructPrivate from './makeVoteComponents/constructPrivate';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import { Container, Row, Col, Alert } from 'reactstrap';
import GetVoters from './makeVoteComponents/getVoters';
import { resetPrivateInfo, postPrivateVote } from '../actions/privateActions'
import {Button} from 'reactstrap';

class MakePrivate extends Component {

  handleSubmit(voters) {
    let newVote = {
      name: this.props.private.info.name,
      desc: this.props.private.info.desc,
      voteLength: this.props.private.info.voteLength,
      yes: 0,
      no: 0,
      voters: voters,
      creator: this.props.auth.username,
      userId: this.props.auth._id,
      csrfToken: this.props.auth.csrfToken
    };
    this.props.postPrivateVote(newVote);
  }
  handleGoBack = () => {
    this.props.resetPrivateInfo()
  }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    // if (this.props.auth.isAuthenticated === false) {
    //    this.handleGoBack()
    // }
    let alert = this.props.message.msg !== '' ?
    <Alert color='success' align='center'>{this.props.message.msg}</Alert> : null;
    let form = this.props.private.info.saved === false ? <ConstructPrivate /> :
      <Row>
        <Col lg={6}>
          <p align='center' className='voteNameHead'>Vote Name</p><p className='voteNameTrue' align='center'>{this.props.private.info.name}</p>
          <p align='center' className='voteNameHead'>Vote Description</p><p className='voteNameTrue' align='center'>{this.props.private.info.desc}</p>
          <p align='center'><Button onClick={this.handleGoBack}>Edit</Button></p>
        </Col>
        <Col lg={6}>
          {this.props.private.info.saved === true ? <GetVoters submitVote={this.handleSubmit.bind(this)} /> : <h3>You must make your vote first, before adding voters.</h3>}
        </Col>
      </Row>
    return (
      <div>
        <Container>
          {alert}
          {form}
        </Container>
      </div>
    );
  }
}

MakePrivate.propTypes = {
  private: propTypes.object.isRequired,
  message: propTypes.object.isRequired,
  postPrivateVote: propTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  message: state.messageObject,
  auth: state.authObject,
  private: state.privateObject,
})

export default connect(mapStateToProps, { resetPrivateInfo, postPrivateVote, })(MakePrivate);
