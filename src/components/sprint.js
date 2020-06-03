import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getMessages, clearMessages } from '../actions/messageActions';
import {getSprints, postSprintData} from '../actions/sprintActions';
import { Container, Row, Col, Card, CardBody, Alert } from 'reactstrap';
import balance from '../images/014-balance.svg';
import graph from '../images/012-debate.svg';
import hand from '../images/041-raise-hand.svg';
import NoButton from './noButton'
import YesButton from './yesButton';
import FrontIcon from './FrontIcon';
import SprintCard from './sprintCard';
import PieChart from './activeVoteComponents/PieChart';
import '../App.css';
import icon from '../images/027-global-voting.svg';
import VoterList from './voterList';
import {Transition} from 'react-spring/renderprops';
import ClickTitle from './sprintComponents/clickTitle';
import SprintRes from './sprintComponents/sprintRes';

class Sprint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votes:[],
      index:0,
      complete:false,
      selected: false,
      selectedSprint: {},
    }
  }
  yesVote = (index) => {
    if (this.state.complete) return;
    console.log(this.state.votes);
    let newArray = this.state.votes;
    newArray.push('yes')
    let that = this;
    this.props.clearMessages();
    setTimeout(function() {
      if (that.state.index === that.state.selectedSprint.votes.length-1) {
        let voteInfo = {
          _id: that.state.selectedSprint._id,
          vote: newArray,
          completed: that.props.sprint.completed,
        }
        that.setState({complete:true});
        that.props.postSprintData(voteInfo);
        return;
      }
      that.setState({
        votes:newArray,
        index: index + 1,
      })
      that.props.getMessages({'msg':'You voted YES to the previous question.'}, null, 'success', '')
    }, 800);
  }
  noVote = (index) => {
    let newArray = this.state.votes;
    newArray.push('no');
    let id = this.state.selectedSprint._id
    if (this.state.complete) return;
    let that = this;
    this.props.clearMessages();
    setTimeout(function() {
      if (index === that.state.selectedSprint.votes.length-1) {
        let voteInfo = {
          _id:id,
          vote: newArray,
          completed: that.props.sprint.completed,
        }
        that.setState({
          complete:true,
        });
        that.props.postSprintData(voteInfo);
        return;
      }
      that.setState({
        votes:newArray,
        index: index + 1,
      })
      that.props.getMessages({'msg':'You voted NO to the previous question.'}, null, 'success', '')
    }, 800);
  }
  clickBack = () => {
    this.setState({
      votes:[],
      index:0,
      complete:false,
      selected: false,
      selectedSprint: {},
    })
  }
  setComplete = () => {
    this.setState({complete:true});
  }
  selectSprint = sprint => {
    this.setState({
      selected:!this.state.selected,
      selectedSprint: sprint
    })
  }
  componentDidMount() {
    this.props.getSprints();
  }
  render() {
    const icons = [balance, graph, hand, icon];
    const colors = ['showCard darkCadetBlue sprintCard','showCard slateblue sprintCard','showCard darkBlue sprintCard'];
    let alert = this.props.message.msg !== '' && this.props.message.id !== 'modal' && this.props.message.id !== 'yesno' ?
    <Alert align='center' color={this.props.message.type}>{this.props.message.msg}</Alert> : null;
    return (
      <div>
        <FrontIcon view='sprint' loggedIn={this.props.auth.isAuthenticated}/>
        <div className='alertDiv'>
          {alert}
        </div>
        <div className='outerSprintDiv'>
          {!this.state.selected ?
            this.props.sprint.sprints.map((sprint,i) =>
              <ClickTitle key={i} sprint={sprint} selectSprint={this.selectSprint} />
            ) : this.props.sprint.completed.includes(this.state.selectedSprint._id) || this.state.complete ?
              <SprintRes clickBack={this.clickBack} sprints={this.props.sprint.sprints} sprintId={this.state.selectedSprint._id} />
              :
              this.props.sprint.fetched ?
                <SprintCard image={icons[this.state.index%4]} name={this.state.selectedSprint.name} question={this.state.selectedSprint.votes[this.state.index].question} key={this.state.index} index={this.state.index} yesVote={this.yesVote} noVote={this.noVote}/>
                : <h3>Sorry we could not retrieve the sprints. Please check your internet connection and refresh page.</h3>
          }
        </div>
      </div>
    )
  }
}
Sprint.propTypes = {
  getSprints: propTypes.func.isRequired,
  message: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  sprint: state.sprintObject,
  message: state.messageObject,
  auth: state.authObject,
})

export default connect(mapStateToProps, {getSprints, postSprintData, getMessages, clearMessages})(Sprint);
