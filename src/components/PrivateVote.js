import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { connect } from 'react-redux';
import { getPrivateVotes, noVote, yesVote } from '../actions/privateActions'
import propTypes from 'prop-types'

import FrontIcon from './FrontIcon';
import { addPrivateVote } from '../actions/privateActions';
import PieChart from './activeVoteComponents/PieChart';
import NoButton from './noButton'
import YesButton from './yesButton';
import { Container, Row, Col, Card, CardBody, Alert } from 'reactstrap';
import queryString from 'query-string';

class PrivateVote extends Component {

  yesVote() {
    console.log('You voted yes');
    // const values = queryString.parse(this.props.location.search)
    let thisVote = this.props.private.vote;
    thisVote.type = 'yes';
    thisVote.voter = this.props.auth.username;
    this.props.addPrivateVote(thisVote);
  }
  noVote() {
    console.log('You voted no');
    // const values = queryString.parse(this.props.location.search)
    let thisVote = this.props.private.vote;
    thisVote.type = 'no';
    thisVote.voter = this.props.auth.username;
    this.props.addPrivateVote(thisVote);
  }

  componentDidMount() {
    window.scrollTo(0,0);
    this.props.getPrivateVotes(this.props.auth.private.id);
  }
  render() {
    let alert = this.props.message.msg !== '' ?
    <Alert color='success' align='center'>{this.props.message.msg}</Alert> : null;

    return (
      <div>
        <Container>
          {alert}
          <Row>
            <Col>
              <Card className='showCard' body>
                <p className='showName' align='center' style={{fontSize: '3rem'}}>{this.props.private.vote.name}</p>
                <Container>
                  <Row style={{margin:'5% 0 0 0'}}>
                    <Col><YesButton voteId={this.props.private.vote._id} yesVote={this.yesVote.bind(this)} index='0'/></Col>
                    <Col><NoButton voteId={this.props.private.vote._id} noVote={this.noVote.bind(this)} index='0'/></Col>
                  </Row>
                </Container><hr />
                <hr />
                <CardBody>
                  <p align='center' className='showDesc'>{this.props.private.vote.desc}</p>
                  <p style={{marginBottom:'0'}} className='showCreator'>Created By: {this.props.private.vote.creator}</p>
                </CardBody><hr />
                <PieChart yes={this.props.private.vote.yes} no={this.props.private.vote.no} voteId={this.props.private.vote._id} />
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

PrivateVote.propTypes = {
  vote: propTypes.object.isRequired,
  message: propTypes.object.isRequired,
  private: propTypes.object.isRequired,
  addPrivateVote: propTypes.func.isRequired,
  getPrivateVotes: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  message: state.messageObject,
  vote: state.voteObject,
  auth: state.authObject,
  private: state.privateObject
})

export default connect(mapStateToProps, {getPrivateVotes, addPrivateVote})(PrivateVote);
