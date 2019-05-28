import React, { Component } from 'react';
import '../../App.css';
import { Card, CardBody,
  CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { addVoter, removeVoter } from '../../actions/voteActions'
import propTypes from 'prop-types'


class GetVoter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    }
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }
  onSubmit(e){
    let re = /\d{10}/
    if (this.refs.name.value.length > 2) {
      if (re.test(this.refs.voterNumber.value)) {
        let voterArray = [];
        voterArray = this.props.vote.voters.concat({
          name: this.refs.name.value,
          number: this.refs.voterNumber.value
        })
        this.props.addVoter(voterArray);
        this.refs.name.value = '';
        this.refs.voterNumber.value = '';
      }else {this.toggle()}
    }else {
      this.toggle();
    }
  }
  onClear(e) {
    let currentIndex = this.props.vote.voters.findIndex((voter, index) => index === e.target.parentElement.value);
    let voters = this.props.vote.voters.filter((voter, index) => index !== currentIndex);

    this.props.removeVoter(voters);
    // console.log(voters)
  }

  render() {
    let voterDisplay =  this.props.vote.voters.length > 0 ?
    this.props.vote.voters.map((votr, i) => <li className='voterListItem' key={i} align='center' value={i}><strong>{votr.name} {votr.number}</strong><span onClick={this.onClear.bind(this)} className='clearNumber'>Clear</span></li>) :
    'No current voters added';
    return (
      <div>
          <Card className='innerCard' body >
            <h1 className='infoTitle'><u>Voter Information</u></h1>
            <CardBody>
              <CardTitle style={{fontSize:'1.25rem'}}>Add all voters name and valid US phone number.</CardTitle>
              <hr className='my-2' />
              <ol className='voterList'>
                {voterDisplay}
              </ol>
              <hr className='my-2' />
              <input className='textInput' type='text' placeholder='Voter Name' ref='name' />
              <input className='textInput' type="number" name="telephone" ref='voterNumber' pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxLength="12" placeholder='888 888 8888'  title="Ten digits code" required />
              <Button style={{marginTop:'5%'}} onClick={this.onSubmit.bind(this)} color='primary' >Add Voter</Button>
            </CardBody>
          </Card>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered style={{marginTop:'3.5%'}}>
            <ModalHeader toggle={this.toggle}>Input Error</ModalHeader>
            <ModalBody>
              Sorry, Voter Name must be at least 2 characters and no longer than 20 characters. Phone number must be 10 digits exactly.
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.toggle}>OK</Button>
            </ModalFooter>
          </Modal>
      </div>
    );
  }
}

GetVoter.propTypes = {
  removeVoter: propTypes.func.isRequired,
  addVoter: propTypes.func.isRequired,
  vote: propTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  removeVoter: state.removeVoter,
  addVoter: state.getVoter,
  vote: state.voteObject
})

export default connect(mapStateToProps, { addVoter, removeVoter })(GetVoter);
