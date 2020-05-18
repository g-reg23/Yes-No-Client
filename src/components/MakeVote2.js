import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import ConstructVote from './makeVoteComponents/constructVote2';
import ShowVote from './makeVoteComponents/showVote2';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { voteInfo } from '../actions/voteActions'
import propTypes from 'prop-types'
import { Container, Row, Col, Alert } from 'reactstrap';
import FrontIcon from './FrontIcon';
// import { Redirect } from 'react-router'
import { getMessages, clearMessages } from '../actions/messageActions';
// import LoginPage from './loginPage';

class MakeVote extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
    if (this.props.message.type === 'loginSuccess' || this.props.message.type === 'regSuccess' || 'makeVote') return
    else this.props.clearMessages();
  }
  componentDidUpdate() {
    if (this.props.message.id === 'votePosted') {

    }
  }
  render() {
    let voteInfoCard = this.props.vote.info.saved === false ? <ConstructVote /> : <ShowVote />;
    let alert = this.props.message.id === 'constructVote' ? null :
    <Alert align='center' color={this.props.message.type}>{this.props.message.msg}</Alert>;
    return (
          <div>
            <FrontIcon view='makeVote' mustLogin={true}/>
            <div ref='makeVoteDiv'>
              <Container className='voteInfoContainer'>
                <Row>
                  <Col>
                    <div className='alertDiv'>
                      {alert}
                    </div>
                    {voteInfoCard}
                    <hr /><br />
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
    );
  }
}

MakeVote.propTypes = {
  voteInfo: propTypes.func.isRequired,
  vote: propTypes.object.isRequired,
  message: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  message: state.messageObject,
  vote: state.voteObject,
  auth: state.authObject,
})

export default connect(mapStateToProps, { voteInfo, getMessages, clearMessages, })(MakeVote);
