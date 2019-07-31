import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
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
import { Spring } from 'react-spring/renderprops'


class ActiveVotes extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.yesVote = this.yesVote.bind(this);
    this.noVote = this.noVote.bind(this);
    this.scroll = this.scroll.bind(this);
  }
  scroll() {
    window.scroll(0,0)
  }
  componentDidMount(prevProps) {
    this.props.getVotes();
    this.props.clearMessages();
    // window.scrollTo(0,0);
  }
  yesVote(id) {
    let thisVote = this.props.vote.votes.find(vote => vote._id === id);
    // let voted = thisVote.voters.some(voter => voter.user === this.props.auth._id);
    let voted;
    if (this.props.auth.isAuthenticated) {
      if (!voted) {
        // thisVote.yes += 1;
        thisVote.type = 'yes';
        thisVote.voters.push({
          user: this.props.auth._id,
          vote: 'yes'
        });
        thisVote.userId = this.props.auth._id;
        this.props.addVote(thisVote);
      }else {
        this.props.getMessages({'msg': 'You may only vote once.'}, thisVote._id , 'error', 'yesno');
      }
    } else {
      this.props.getMessages({'msg': 'You must log in first.'}, thisVote._id , 'error', 'yesno');
    }
  }
  noVote(id) {
    console.log('say what?')
    let thisVote = this.props.vote.votes.find(vote => vote._id === id);
    let voted = thisVote.voters.includes(this.props.auth._id);
    if (this.props.auth.isAuthenticated) {
      if (!voted) {
        // thisVote.no += 1;
        thisVote.type = 'no';
        thisVote.voters.push({
          user: this.props.auth._id,
          vote: 'no'
        });
        thisVote.userId = this.props.auth._id;
        this.props.addVote(thisVote);
      }else {
        this.props.getMessages({'msg': 'You may only vote once.'}, thisVote._id , 'error', 'yesno');
      }
    } else {
      this.props.getMessages({'msg': 'You must log in first.'}, thisVote._id , 'error', 'yesno');
    }
  }
  handleDelete(id) {
    console.log(id);
    this.props.deleteVote(id);
  }
  renderMessage() {
    if (this.props.message.id === 'yesno') {
      return (
        <Alert align='center' color='success'>{this.props.message.msg}</Alert>
      )
    }
  }
  scroll() {
    window.scrollTo(0,0)
  }
  componentDidUpdate(prevProps) {
    // if (prevProps.message.msg !== this.props.message.msg && this.props.message.id !== 'yesno') {
    //   window.scroll(0,50);
    // }
  }

  render() {
    // this.scroll();
    let activeVotes = this.props.vote.fetched === true ? this.props.vote.votes.filter(vote => vote.active === true) : null
    let votes = activeVotes !== null ? activeVotes.map((v, index) =>
      <Col lg={6} key={v._id}>
        <Card className='showCard' body>
          <p className='showName' align='center'>{v.name}</p>
          {this.props.message.status === v._id ? this.renderMessage() : null}
          <Container>
            <Row style={{margin:'5% 0 0 0'}}>
              <Col><YesButton voteId={v._id} yesVote={this.yesVote} index={index}/></Col>
              <Col><NoButton voteId={v._id} noVote={this.noVote} index={index}/></Col>
            </Row>
          </Container><hr />
          <CardBody>
            <p align='center' className='showDesc'>{v.desc}</p>
            <p style={{marginBottom:'0'}} className='showCreator'>Created By: {v.creator}</p>
          </CardBody><hr />
          <PieChart yes={v.yes} no={v.no} voteId={v.Id}/>
        </Card>
      </Col>) : null;
    let alert = this.props.message.msg !== '' && this.props.message.id !== 'modal' && this.props.message.id !== 'yesno' ?
    <Alert color='success' align='center'>{this.props.message.msg}</Alert> : null;
    return(
      <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 0 }}>
        {props => (
          <div style={props}>
            <FrontIcon view='activeVotes' />
            <div className='introDiv'>
              {alert}
              <Container>
                <Row>
                  {votes}
                </Row>
              </Container>
            </div>
          </div>
          )
        }
      </Spring>
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
