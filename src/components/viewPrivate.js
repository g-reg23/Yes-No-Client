import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { connect } from 'react-redux';
import { getPrivateView } from '../actions/privateActions'
import propTypes from 'prop-types'

import FrontIcon from './FrontIcon';
import { addPrivateVote } from '../actions/privateActions';
import PieChart from './activeVoteComponents/PieChart';
import NoButton from './noButton'
import YesButton from './yesButton';
import { Container, Row, Col, Card, CardBody, Alert } from 'reactstrap';
import queryString from 'query-string';
import EndTimer from './endTimer';
import VoterList from './voterList';

class PrivateVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVoterList: false
    }
  }
  toggleList = () => {
    this.setState({showVoterList: !this.state.showVoterList});
  }
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
  componentDidMount() {
    window.scrollTo(0,0);
    let id = this.props.location.pathname.split('/');
    this.props.getPrivateView(id[2]);
    // const values = queryString.parse(this.props.location.search)
  }
  render() {
    // const values = queryString.parse(this.props.location.search)
    let alert = this.props.message.msg !== '' ?
    <Alert color='success' align='center'>{this.props.message.msg}</Alert> : null;
    return (
      <div>
        <FrontIcon view='private'/>
        <Container>
          <Row>
            <Col lg={6}>
              <Card className='showCard' body>
                <p className='showName' align='center'>{this.props.private.vote.name}</p>
                <p align='center' className='showDesc'>{this.props.private.vote.desc}</p>
                {alert}
                <Container>
                  <Row>
                    <Col><YesButton voteId={this.props.private.vote._id} yesVote={this.yesVote.bind(this)} index='0'/></Col>
                    <Col><NoButton voteId={this.props.private.vote._id} noVote={this.noVote.bind(this)} index='0'/></Col>
                  </Row>
                </Container><hr />
                {!this.props.private.loaded ? <p>No Time Remaining</p> : <EndTimer end={this.props.private.vote.endDate} /> }
                <hr />
                <CardBody>
                  <p style={{marginBottom:'0'}} className='showCreator'>Created By: {this.props.private.vote.creator}</p><hr />
                  <PieChart yes={this.props.private.vote.yes} no={this.props.private.vote.no} voteId={this.props.private.vote._id} /><hr />
                  <VoterList voters={this.props.private.vote.voters}/>
                </CardBody>
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
