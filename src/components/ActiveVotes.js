import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getVotes, addVote } from '../actions/voteActions';
import propTypes from 'prop-types';
import { getMessages, clearMessages } from '../actions/messageActions';
import { Container, Row, Col, Card, CardBody, Alert } from 'reactstrap';
import NoButton from './noButton'
import YesButton from './yesButton';
import FrontIcon from './FrontIcon';
import PieChart from './activeVoteComponents/PieChart';
import '../App.css';
import icon from '../images/027-global-voting.svg';
import balance from '../images/014-balance.svg';
import graph from '../images/012-debate.svg';
import hand from '../images/041-raise-hand.svg';
import stats from '../images/016-analysis.svg';
import VoterList from './voterList';

class ActiveVotes extends Component {
  constructor(props) {
    super(props);
    this.yesVote = this.yesVote.bind(this);
    this.noVote = this.noVote.bind(this);
    this.scroll = this.scroll.bind(this);
  }
  scroll() {
    window.scroll(0,0)
  }
  componentDidMount(prevProps) {
    if (this.props.message.type === 'loginSuccess' || this.props.message.type === 'regSuccess') return
    else this.props.clearMessages();
    if (this.props.vote.fetched === false) {
      this.props.getVotes();
    }
    window.scrollTo(0,0);
    if (this.props.message.type === null) {
      this.clear()
    }
  }
  yesVote(id) {
    let thisVote = this.props.vote.votes.find(vote => vote._id === id);
    let voted = thisVote.voters.some(voter => voter.user === this.props.auth._id);
    if (this.props.auth.isAuthenticated) {
      if (!voted) {
        thisVote.type = 'yes';
        thisVote.voters.push({
          user: this.props.auth._id,
          name:this.props.auth.username,
          vote: 'yes'
        });
        thisVote.userId = this.props.auth._id;
        this.props.addVote(thisVote);
      }else {
        this.props.getMessages({'msg': 'You may only vote once.'}, thisVote._id , 'danger', 'yesno');
      }
    } else {
      this.props.getMessages({'msg': 'You must log in first.'}, thisVote._id , 'danger', 'yesno');
    }
  }
  noVote(id) {
    let thisVote = this.props.vote.votes.find(vote => vote._id === id);
    let voted = thisVote.voters.some(voter => voter.user === this.props.auth._id);
    if (this.props.auth.isAuthenticated) {
      if (!voted) {
        // thisVote.no += 1;
        thisVote.type = 'no';
        thisVote.voters.push({
          user: this.props.auth._id,
          username: this.props.auth.username,
          vote: 'no',
        });
        thisVote.userId = this.props.auth._id;
        this.props.addVote(thisVote);
      }else {
        this.props.getMessages({'msg': 'You may only vote once.'}, thisVote._id , 'danger', 'yesno');
      }
    } else {
      this.props.getMessages({'msg': 'You must log in first.'}, thisVote._id , 'danger', 'yesno');
    }
  }
  clear = () => {
    this.props.clearMessages();
  }
  renderMessage() {
    if (this.props.message.id === 'yesno') {
      return (
        <Alert align='center' color={this.props.message.type}>{this.props.message.msg}</Alert>
      )
    }
  }

  render() {
    // this.scroll();
    let icons = [balance, graph, icon, hand]
    const colors = ['showCard darkCadetBlue','showCard slateblue','showCard darkBlue'];
    let activeVotes = this.props.vote.fetched === true ? this.props.vote.votes.filter(vote => vote.active === true) : null;
    let votes = activeVotes !== null ? activeVotes.map((v, index) =>
      <Col lg={6} key={v._id}>
        <Card className={colors[index%3]} body>
          <img width='20%' src={icons[index%4]} alt='vote icon'style={{marginLeft:'40%'}}  />
          <p className='showName' align='center'>{v.name}</p>
          <p align='center' className='showDesc'>{v.desc}</p>
          {this.props.message.status === v._id ? this.renderMessage() : null}
          <Container>
            <Row>
              <Col><YesButton voteId={v._id} yesVote={this.yesVote} index={index}/></Col>
              <Col><NoButton voteId={v._id} noVote={this.noVote} index={index}/></Col>
            </Row>
          </Container><hr />
          <CardBody>
            <p style={{marginBottom:'0', float: 'none'}} className='showCreator'>Created By: {v.creator}</p><hr />
            <PieChart yes={v.yes} no={v.no} voteId={v.Id}/><hr />
            <VoterList voters={v.voters} background={colors[index%3]}/>
          </CardBody>
        </Card>
      </Col>) : null;
    let alert = this.props.message.msg !== '' && this.props.message.id !== 'modal' && this.props.message.id !== 'yesno' ?
    <Alert align='center' color={this.props.message.type}>{this.props.message.msg}</Alert> : null;
    return(
      <div>
        <FrontIcon view='activeVotes' loggedIn={this.props.auth.isAuthenticated}/>
        <div className='introDiv'>
          <div className='alertDiv'>
            {alert}
          </div>
          <Container className='voteDiv'>
            <Row>
              {votes}
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

ActiveVotes.propTypes = {
  addVote: propTypes.func.isRequired,
  getVotes: propTypes.func.isRequired,
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

export default connect(mapStateToProps, { getVotes, addVote, getMessages, clearMessages })(ActiveVotes);
