import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { connect } from 'react-redux';
import { getPrivateVotes } from '../actions/privateActions'
import propTypes from 'prop-types'
import { addPrivateVote } from '../actions/privateActions';
import PieChart from './activeVoteComponents/PieChart';
import NoButton from './noButton'
import YesButton from './yesButton';
import { Container, Row, Col, Card, CardBody, Alert } from 'reactstrap';
import icon from '../images/026-online-voting.svg';
import EndTimer from './endTimer';
import VoterList from './voterList'

class PrivateVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showVoterList: false,
      seconds: 0
    }
  }
  toggleList = () => {
    this.setState({showVoterList:!this.state.showVoterList})
  }
  yesVote() {
    // const values = queryString.parse(this.props.location.search)
    let thisVote = this.props.private.vote;
    thisVote.type = 'yes';
    thisVote.voter = this.props.auth.username;
    this.props.addPrivateVote(thisVote);
  }
  noVote() {
    // const values = queryString.parse(this.props.location.search)
    let thisVote = this.props.private.vote;
    thisVote.type = 'no';
    thisVote.voter = this.props.auth.username;
    this.props.addPrivateVote(thisVote);
  }
  getTheVoters = () => {
    let list;
    if (this.props.private.vote.loaded === true) {
      list = this.props.private.vote.voters.map((v, index) =>
        <div key={index}>{v.name}</div>
      )
    }
    return list;
  }
  componentDidMount() {
    window.scrollTo(0,0);
    let data = {
      id: this.props.auth.private.id,
    }
    this.props.getPrivateVotes(data);
  }
  render() {
    let alert = this.props.message.msg !== '' ?
    <Alert color='success' align='center'>{this.props.message.msg}</Alert> : null;
    return (
      <div>
        <Container>
          {alert}
          <Row>
            <Col lg={6}>
              <Card className='showCard' body>
                <img width='20%' src={icon} alt='vote icon'style={{marginLeft:'40%'}}  />
                <p className='showName' align='center' style={{fontSize: '2rem'}}>{this.props.private.vote.name}</p>
                <p align='center' className='showDesc'>{this.props.private.vote.desc}</p>
                <Container>
                  <Row>
                    <Col><YesButton voteId={this.props.private.vote._id} yesVote={this.yesVote.bind(this)} index='0'/></Col>
                    <Col><NoButton voteId={this.props.private.vote._id} noVote={this.noVote.bind(this)} index='0'/></Col>
                  </Row>
                </Container><hr />
                {!this.props.private.loaded ? <p>No Time Remaining</p> : <EndTimer end={this.props.private.vote.endDate} /> }
                <hr />
                <CardBody>
                  <p style={{marginBottom:'0'}} className='showCreator'>Created By: {this.props.private.vote.creator}</p><br /><br />
                  <PieChart yes={this.props.private.vote.yes} no={this.props.private.vote.no} voteId={this.props.private.vote._id} /><hr />
                  <VoterList voters={this.props.private.vote.voters} />
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}></Col>
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
