import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import { fetchPastPrivateVotes } from '../actions/privateActions'
import FrontIcon from './FrontIcon';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Privy from './privy';
import { Spring } from 'react-spring/renderprops';
import { clearMessages } from '../actions/messageActions';


class PrivateArchive extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
    if (this.props.message.type === 'loginSuccess' || this.props.message.type === 'regSuccess') return
    else this.props.clearMessages();
    if (this.props.auth.isAuthenticated) {
      this.props.fetchPastPrivateVotes(this.props.auth.username)
    }
  }
  componentDidUpdate() {
    if (this.props.isAuthenticated && this.props.private.past === []) {
      this.props.fetchPastPrivateVotes(this.props.auth.username)
    }
  }
  render() {
    let alert = this.props.message.msg !== '' ?
    <Alert color={this.props.message.type} align='center'>{this.props.message.msg}</Alert> : null;
    let votes = this.props.private.past.length === 0 ? <div><h3>Whoa, nothing to see here!! :) You have not made a private vote yet.</h3></div> :
      this.props.private.past.map((v, index) =>
        <Col key={v._id} lg={6}>
          <Privy vote={v} />
        </Col>
      )
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <div style={props}>
            <FrontIcon view={'privateArchive'}/>
            <hr />
            <Container>
              {alert}
              <Row>
                {votes}
              </Row>
            </Container>
            <Container>
              <Row>
                <Col>
                  <Link align='center' className='nav-link navLink dropdownItem' to='/private'><Button>Make A Private Vote</Button></Link>
                </Col>
                <Col>
                  <Link align='center' className='nav-link navLink dropdownItem' to='/active'><Button>View Public Votes</Button></Link>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </Spring>
    )
  }
}

PrivateArchive.propTypes = {

  message: propTypes.object.isRequired,
  private: propTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  message: state.messageObject,
  auth: state.authObject,
  private: state.privateObject
})

export default connect(mapStateToProps, {fetchPastPrivateVotes, clearMessages})(PrivateArchive);
