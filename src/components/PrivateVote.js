import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { connect } from 'react-redux';
import { getPrivateVotes, addPrivateVote } from '../actions/privateActions'
import propTypes from 'prop-types'
import { clearMessages } from '../actions/messageActions';
import PieChart from './activeVoteComponents/PieChart';
import NoButton from './noButton'
import YesButton from './yesButton';
import { Container, Row, Col, Card, CardBody, Alert, Button } from 'reactstrap';
import icon from '../images/027-global-voting.svg';
import EndTimer from './endTimer';
import VoterList from './voterList';
import { Link } from 'react-router-dom';

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
  clearMessage = () => {
    this.props.clearMessages();
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
    if (this.props.message.type === 'loginSuccess' || this.props.message.type === 'regSuccess' || 'privateVote' || 'logoutSuccess') return
    else this.props.clearMessages();
  }
  componentDidUpdate() {
    if (this.props.message.status === 200) {
      this.clearMessage();
    }
  }
  render() {
    let today = new Date();
    let cool = new Date(this.props.auth.private.coolDown);
    let message = cool > today && new Date(this.props.private.vote.endDate < today) ?
      <Alert color='success' align='center'>You must wait for the cool down period to end in order to make another Private Vote.<EndTimer end={this.props.auth.private.coolDown} color='black'/></Alert> :
      <Alert color='success' align='center'>Make sure to vote before time runs out. After the vote expires, you will have a 1 day cool down period before you can do another Private Vote.</Alert>;
    let alert = this.props.message.msg === '' || this.props.message.id === 'addPrivVote' ? null :
    <Alert color={this.props.message.type} align='center'>{this.props.message.msg}</Alert>;
    let innerAlert = this.props.message.id === 'addPrivVote' ?
    <Alert color={this.props.message.type} align='center'>{this.props.message.msg}</Alert> : null;
    return (
      <div>
        <Container>
          {message}
          <Link align='center' className='nav-link navLink dropdownItem' to='/privateArchive'><Button>View My Past Private Votes</Button></Link>
          {alert}
          <Row>
            <Col lg={6}>
              <Card className='showCard' body>
                <img width='20%' src={icon} alt='vote icon'style={{marginLeft:'40%'}}  />
                <p className='showName' align='center' style={{fontSize: '2rem'}}>{this.props.private.vote.name}</p>
                <p align='center' className='showDesc'>{this.props.private.vote.desc}</p>
                {innerAlert}
                <Container>
                  <Row>
                    <Col><YesButton voteId={this.props.private.vote._id} yesVote={this.yesVote.bind(this)} index='0'/></Col>
                    <Col><NoButton voteId={this.props.private.vote._id} noVote={this.noVote.bind(this)} index='0'/></Col>
                  </Row>
                </Container><hr />
                {!this.props.private.loaded ? <p>No Time Remaining</p> : <EndTimer end={this.props.private.vote.endDate} color='white'/> }
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
          {alert}
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

export default connect(mapStateToProps, {getPrivateVotes, addPrivateVote, clearMessages})(PrivateVote);
