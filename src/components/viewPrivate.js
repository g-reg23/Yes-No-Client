import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { connect } from 'react-redux';
import { getPrivateView,noVote, yesVote } from '../actions/privateActions'
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
    const values = queryString.parse(this.props.location.search)
    let thisVote = this.props.private.vote;
    thisVote.type = 'yes';
    thisVote.voter = values.name;
    thisVote.token = values.token;
    this.props.addPrivateVote(thisVote);
  }
  noVote() {
    const values = queryString.parse(this.props.location.search)
    let thisVote = this.props.private.vote;
    thisVote.type = 'no';
    thisVote.voter = values.name;
    thisVote.token = values.token;
    this.props.addPrivateVote(thisVote);
  }
  //
  componentDidMount() {
    window.scrollTo(0,0);
    let id = this.props.location.pathname.split('/');
    this.props.getPrivateView(id[2]);
    const values = queryString.parse(this.props.location.search)
  }
  render() {
    const values = queryString.parse(this.props.location.search)
    let alert = this.props.message.msg !== '' ?
    <Alert color='success' align='center'>{this.props.message.msg}</Alert> : null;

    return (
      <div>
        <FrontIcon view='private'/>
        <Container>
          {alert}
          <Row>
            <Col>
              <Card className='showCard' body>
                <p className='showName' align='center'>{this.props.private.vote.name}</p>
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
  message: propTypes.object.isRequired,
  private: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  addPrivateVote: propTypes.func.isRequired,
  getPrivateView: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  message: state.messageObject,
  vote: state.voteObject,
  auth: state.authObject,
  private: state.privateObject,
})

export default connect(mapStateToProps, {getPrivateView, addPrivateVote})(PrivateVote);
