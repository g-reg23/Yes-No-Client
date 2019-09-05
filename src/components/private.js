import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import MakePrivate from './makePrivate';
import PrivateVote from './PrivateVote'
import FrontIcon from './FrontIcon';

class Private extends Component {

  render() {
    let display = this.props.auth.private.active === true ? <PrivateVote /> : <MakePrivate />

    return (
      <div>
        <FrontIcon view='private'/>
        {display}
      </div>
    )
  }
}

Private.propTypes = {
  auth: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.authObject,
})

export default connect(mapStateToProps, {})(Private);
