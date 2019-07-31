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
  }
  componentDidUpdate(prevProps) {
    console.log(prevProps);
    if (prevProps.message.msg !== this.props.message.msg) {
      window.scroll(0,50);
    }
  }
  render() {
    let voteInfoCard = this.props.vote.info.saved === false ? <ConstructVote /> : <ShowVote />;
    let alert = this.props.message.msg !== '' && this.props.message.id !== 'modal'  && this.props.message.id !== 'yesno' ?
    <Alert align='center' color='success'>{this.props.message.msg}</Alert> : null;
    return (
      <Spring from={{ opacity: 0, marginTop: -1000 }} to={{ opacity: 1, marginTop: 0 }}>
        {props => (
          <div style={props}>
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
