import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { connect } from 'react-redux';
import propTypes from 'prop-types'
import MakePrivate from './makePrivate';
import PrivateVote from './PrivateVote'
import FrontIcon from './FrontIcon';
import { Spring } from 'react-spring/renderprops'

class Private extends Component {

  render() {
    let today = new Date();
    let cool;
    let cd;
    let display;
    if (this.props.auth.isAuthenticated) {
      cool = this.props.auth.private.coolDown.split('(');
      cd = new Date(cool[0]);
      display = cd.getTime () >= today.getTime() ? <PrivateVote /> : <MakePrivate />
    } else {
      display = <MakePrivate />
    }
    return (
      <Spring from={{ opacity: 0 }} to={{ opacity: 1 }}>
        {props => (
          <div style={props}>
            <FrontIcon view='private'/>
            {display}
          </div>
        )}
      </Spring>
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
