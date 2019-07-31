import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import { fetchPastPrivateVotes } from '../actions/privateActions'
import FrontIcon from './FrontIcon';
import PieChart from './activeVoteComponents/PieChart';
import NoButton from './noButton'
import YesButton from './yesButton';
import { Container, Row, Col, Card, CardBody, Alert, Button } from 'reactstrap';
import queryString from 'query-string';
import { Link } from 'react-router-dom';

class PrivateArchive extends Component {

  componentDidMount() {
    window.scrollTo(0,0);
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
    <Alert color='success' align='center'>{this.props.message.msg}</Alert> : null;
    console.log(this.props.private.past)
    let votes = this.props.private.past.length === 0 ? <div><h1>Whoa, nothing to see here!! :) You have not made a private vote yet. Click below to start</h1><Link className='nav-link navLink dropdownItem' to='/private' onClick={this.toggle}><Button>Make a Private Vote</Button></Link></div> :
      this.props.private.past.map((v, index) =>
        <Col lg={6} key={v._id}>
          <Card className='showCard' body>
            <p className='showName' align='center'>{v.name}</p>
            {this.props.message.status === v._id ? this.renderMessage() : null}
            <CardBody>
              <p align='center' className='showDesc'>{v.desc}</p>
              <p style={{marginBottom:'0'}} className='showCreator'>Created By: {v.creator}</p>
            </CardBody><hr />
            <PieChart yes={v.yes} no={v.no} voteId={v.Id}/>
          </Card>
        </Col>)
    return (
      <div>
        <FrontIcon view={'privateArchive'}/>
        {alert}
        <Container><Row>{votes}</Row></Container>
      </div>
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

export default connect(mapStateToProps, {fetchPastPrivateVotes})(PrivateArchive);
