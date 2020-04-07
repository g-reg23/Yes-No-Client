import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import ConstructPrivate from './makeVoteComponents/constructPrivate';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import { Container, Row, Col, Button, Alert, Card, CardBody } from 'reactstrap';
import GetVoters from './makeVoteComponents/getVoters';
import { resetPrivateInfo, postPrivateVote } from '../actions/privateActions'
import { Link } from 'react-router-dom';
import { getMessages, clearMessages } from '../actions/messageActions';

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
    };
    this.props.postPrivateVote(newVote);
  }
  handleGoBack = () => {
    this.props.resetPrivateInfo()
  }
  handleError(type) {
    switch (type) {
      case 'email':
        this.props.getMessages({'msg': 'Each voter email must be a unique email address.'}, null, 'danger', 'getVoterError');
        break;
      case 'number':
        this.props.getMessages({'msg': 'Each voter phone number must be a unique value.'}, null, 'danger', 'getVoterError');
        break;
      case 'nameLength':
        this.props.getMessages({'msg': 'The voter name must be at least 4 characters in length and no longer than 10 characters.'}, null, 'danger', 'getVoterError');
        break;
      case 'notEmail':
        this.props.getMessages({'msg': 'The voter email must be in standard email format.'}, null, 'danger', 'getVoterError');
        break;
      case 'phoneLength':
        this.props.getMessages({'msg': 'The voter phone number must be exactly 10 digits.'}, null, 'danger', 'getVoterError');
        break;
      case 'voters':
        this.props.getMessages({'msg': 'You must have at least 2 voters, but no more than 15.'}, null, 'danger', 'getVoteError');
        break;
      default:
        this.props.getMessages({'msg': 'Each voter name must be a unique value.'}, null, 'danger', 'getVoterError');
        break;
    }
  }
  handleClear = () => {
    this.props.clearMessages()
  }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    // if (this.props.auth.isAuthenticated === false) {
    //    this.handleGoBack()
    // }
    let alert = this.props.message.id === 'constructPrivateServer' ? <Alert color={this.props.message.type} align='center'>{this.props.message.msg}</Alert>
      : null
    let form = this.props.private.info.saved === false ? <ConstructPrivate /> :
      <Row>
        <Col lg={6}>
          <h3 className='headingDiv'>Review the vote information below, click Edit to make changes.</h3>
          <Card style={{background:'aquamarine'}} body>
            <h1 className='infoTitle'><u>Vote Information</u></h1>
            <CardBody>
              <p align='center' className='voteNameHead'>Vote Name</p><p className='voteNameTrue' align='center'>{this.props.private.info.name}</p>
              <p align='center' className='voteNameHead'>Vote Description</p><p className='voteNameTrue' align='center'>{this.props.private.info.desc}</p>
              <p align='center' className='voteNameHead'>VoteLength</p><p className='voteNameTrue' align='center'>{this.props.private.info.voteLength}</p>
              <p align='center'><Button onClick={this.handleGoBack}>Edit</Button></p>
            </CardBody>
          </Card>
        </Col>
        <Col lg={6}>
          {this.props.private.info.saved === true ? <div><h3 className='headingDiv'>Add voters here. Give each voter a unique name, U.S. phone number, and email. You may add anywhere from 2 to 10 voters.</h3><GetVoters submitVote={this.handleSubmit.bind(this)} alert={this.props.message} error={this.handleError.bind(this)} clear={this.handleClear}/></div> : <h3>You must make your vote first, before adding voters.</h3>}
        </Col>
      </Row>
    return (
      <div>
        <Container>
          {alert}
          <div className='linkDiv'>
            <Link align='center' className='links' to='/privateArchive'><Button className='linkButton'>View My Past Private Votes</Button></Link>
          </div>
          {form}
          <br />
          <hr /> <br />
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

export default connect(mapStateToProps, { resetPrivateInfo, postPrivateVote, getMessages, clearMessages })(MakePrivate);
