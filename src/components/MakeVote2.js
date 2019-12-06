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
import { Spring } from 'react-spring/renderprops';

class MakeVote extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
    if (this.props.message.type === 'loginSuccess' || this.props.message.type === 'regSuccess' || 'makeVote') return
    else this.props.clearMessages();
  }
  render() {
    let voteInfoCard = this.props.vote.info.saved === false ? <ConstructVote /> : <ShowVote />;
    let alert = this.props.message.msg.length >= 0 || this.props.message.id === 'constructVote' ? null :
    <Alert align='center' color={this.props.message.type}>{this.props.message.msg}</Alert>;
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <div style={props}>
            <FrontIcon view='makeVote'/>
            <div ref='makeVoteDiv'>
              <Container className='voteInfoContainer'>
                <Row>
                  <Col>
                    {alert}
                    {voteInfoCard}
                    <hr /><br />
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
          )
        }
      </Spring>
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
