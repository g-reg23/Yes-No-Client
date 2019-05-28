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

class MakeVote extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
  }
  render() {
    let voteInfoCard = this.props.vote.info.saved === false ? <ConstructVote /> : <ShowVote />;
    let alert = this.props.message.msg !== '' && this.props.message.id !== 'modal'  && this.props.message.id !== 'yesno' ? 
    <Alert align='center' color='success'>{this.props.message.msg}</Alert> : null;
    return (
      <div>
        <FrontIcon view='makeVote'/>
        <div ref='makeVoteDiv'>
          <Container className='voteInfoContainer'>
            <Row>
              <Col>
                {alert}
                {voteInfoCard}
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
  message: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  message: state.messageObject,
  vote: state.voteObject
})

export default connect(mapStateToProps, { voteInfo })(MakeVote);
