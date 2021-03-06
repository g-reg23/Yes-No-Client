import React, { Component } from 'react';
import '../../App.css';
import { Card, CardBody, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { resetInfo, postVote } from '../../actions/voteActions'
import propTypes from 'prop-types'
import yes from '../../images/iconfinder_checkmark-24_103184.svg';
import no from '../../images/iconfinder_No_984759.svg';
import { getMessages, clearMessages } from '../../actions/messageActions';
import PieChart from '../activeVoteComponents/PieChart';
import balance from '../../images/014-balance.svg';

class ShowVote extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onEdit() {
    this.props.resetInfo();
  }
  onSubmit() {
    if (this.props.auth.isAuthenticated) {
      let newVote = {
        name: this.props.vote.info.name,
        desc: this.props.vote.info.desc,
        yes: 0,
        no: 0,
        voters: [],
        creator: this.props.auth.username,
        userId: this.props.auth._id
      };
      this.props.postVote(newVote);
    } else {
      this.props.getMessages({'msg': 'You must be logged in to make a vote.'}, 'client', 'error', 'nolognovote');
    };
  }
  componentDidMount() {
    this.props.clearMessages();
  }

  render() {
    return (
      <div>
        <h3 style={{fontWeight:'700'}} align='center'>Vote Review</h3>
        <h3 style={{fontWeight:'500', marginTop: '3.5%', textAlign: 'center'}}>Click Submit if you are ready to submit this vote to the public, or  click edit to go back and work on the vote.</h3>
        <hr />
        <div className='buttonDiv'>
          <button onClick={this.onSubmit} className='setButton subButton'>Submit</button>
          <button onClick={this.onEdit} className='goBackButton'>Edit</button>
        </div>
        <Col>
          <Card className='showCard slateBlue' body>
            <img width='20%' src={balance} alt='vote icon' className='buildPic' />
            <p className='showName' align='center'>{this.props.vote.info.name}</p>
            <Container>
              <Row style={{margin:'5% 0 0 0'}}>
                <Col><img alt='yes vote icon' style={{float:'right'}} src={yes} className='yesVote showButtons yes_no_buttons' /></Col>
                <Col><img alt='no vote icon' src={no} className='noVote showButtons yes_no_buttons' /></Col>
              </Row>
            </Container><hr />
            <CardBody>
              <p align='center' className='showDesc'>{this.props.vote.info.desc}</p>
              <p style={{marginBottom:'0'}} className='showCreator'>Created By: {this.props.auth.username}</p>
            </CardBody><hr />
            <PieChart yes={0} no={0} voteId={0}/>
          </Card>
        </Col>
      </div>
    );
  }
}

ShowVote.propTypes = {
  postVote: propTypes.func.isRequired,
  resetInfo: propTypes.func.isRequired,
  vote: propTypes.object.isRequired,
  message: propTypes.object.isRequired,
  getMessages: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  vote: state.voteObject,
  resetInfo: state.resetInfo,
  getMessages: state.getMessages,
  postVote: state.postVote,
  message: state.messageObject,
  auth: state.authObject
})

export default connect(mapStateToProps, { resetInfo, postVote, getMessages, clearMessages })(ShowVote);
