import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getVotes } from '../actions/voteActions';
import propTypes from 'prop-types';
import { getMessages, clearMessages } from '../actions/messageActions';
import { Container, Row, Col, Card, CardBody, Alert } from 'reactstrap';
import FrontIcon from './FrontIcon';
import PieChart from './activeVoteComponents/PieChart';
import '../App.css';


class Archive extends Component {
  scroll() {
    window.scroll(0,0)
  }
  componentDidMount(prevProps) {
    if (this.props.vote.fetched === false) {
      this.props.getVotes();
    }
    this.props.getMessages({'msg': 'Welcome to the Archive!'}, null, 'success', null);
  }

  renderMessage() {
    if (this.props.message.id === 'yesno') {
      return (
        <div className='alertDiv'>
          <Alert align='center' color='success'>{this.props.message.msg}</Alert>
        </div>
      )
    }
  }
  componentDidUpdate(prevProps) {
    // if (prevProps.message.msg !== this.props.message.msg && this.props.message.id !== 'yesno') {
    //   window.scroll(0,50);
    // }
  }

  render() {
    let inactiveVotes = this.props.vote.votes.filter(vote => vote.active === false)
    let votes = inactiveVotes.length < 1 ? <div><h3 align='center'>Sorry, no public votes have made it to the archive yet.</h3><h6 align='center'>Keep voting and some will make it here soon.</h6></div> :
      inactiveVotes.map((v, index) =>
        <Row>
          <Col lg={6} key={v._id}>
            <Card className='showCard' body>
              <p className='showName' align='center'>{v.name}</p>
              {this.props.message.status === v._id ? this.renderMessage() : null}
              <CardBody>
                <p align='center' className='showDesc'>{v.desc}</p>
                <p style={{marginBottom:'0'}} className='showCreator'>Created By: {v.creator}</p>
              </CardBody><hr />
              <PieChart yes={v.yes} no={v.no} voteId={v.Id}/>
            </Card>
          </Col>
        </Row>)
    let alert = this.props.message.msg !== '' && this.props.message.id !== 'modal' && this.props.message.id !== 'yesno' ?
    <Alert color={this.props.message.type} align='center'>{this.props.message.msg}</Alert> : null;
    return(
      <div>
        <FrontIcon view='archive' loggedIn={this.props.auth.isAuthenticated}/>
          <div className='alertDiv'>
            {alert}
          </div>
          <hr />
          <Container>
            {votes}
          </Container>
          <hr />
      </div>
    )
  }
}

Archive.propTypes = {
  vote: propTypes.object.isRequired,
  message: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  getMessages: propTypes.func.isRequired,
  clearMessages: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  vote: state.voteObject,
  addVote: state.addVote,
  message: state.messageObject,
  auth: state.authObject
})

export default connect(mapStateToProps, {getVotes, getMessages, clearMessages})(Archive);
