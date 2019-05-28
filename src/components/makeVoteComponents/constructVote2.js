import React, { Component } from 'react';
// import { Button } from 'reactstrap';
import { Card, CardBody,
  CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../../App.css';
import { connect } from 'react-redux';
import { voteInfo } from '../../actions/voteActions';
import { getMessages } from '../../actions/messageActions';
import propTypes from 'prop-types';





class ConstructVote extends Component {
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
  // handleChange(e) {
  //   this.setState({
  //     selectValue: e.target.value,
  //   })
  // }

  onSubmit(e) {
    if (this.props.auth.isAuthenticated) {
      if (this.refs.name.value.length > 3) {
        if (this.refs.desc.value.length > 8) {
          let newVote = {
            name: this.refs.name.value,
            desc: this.refs.desc.value,
            creator: this.props.auth.username,
            saved: true,
          }
          console.log(newVote)
          this.props.voteInfo(newVote)
          // this.props.addVote(newVote);
          this.refs.name.value = '';
          this.refs.desc.value = '';
        }else {this.toggle()}
      }else{this.toggle()}
    } else {
      this.props.getMessages({'msg': 'You must log in first'}, 'client', 'error', 'login')
    }

  }

  componentDidMount() {

  }


  render() {
    return (
      <div>
          <Card className='innerCard' body>
            <h1 className='infoTitle'><u>Vote Information</u></h1>
            <CardBody>
              <CardTitle style={{fontSize:'1.25rem'}}>Enter the question to be voted on in the Vote Question box. It should be a simple yes/no question. Below that
              your may enter any additional details and a brief description of the vote. Lastly enter the desired length of the vote</CardTitle>
              <hr className='my-2' />
              <input className='textInput' style={{marginTop:'3%'}} type='text' placeholder='Vote Question' ref='name' /> <br />
              <textarea className='textInput' style={{fontSize:'.85em', height:'5em'}} type='text' placeholder='Description/Additional Information' ref='desc'></textarea>
              <Button style={{marginTop:'5%'}} onClick={this.onSubmit.bind(this)} color='primary' type='submit' value='Submit'><span>Save</span></Button>
            </CardBody>
          </Card>
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered style={{marginTop:'3.5%'}}>
            <ModalHeader style={{background:'lightgray'}}>Input Error</ModalHeader>
            <ModalBody style={{padding:'7% 5% 7% 5%'}}>
              Sorry, The vote question must be at least 3 characters and the vote description must be at least 10 characters.
            </ModalBody>
            <ModalFooter style={{background:'lightgray'}}>
              <Button color="primary" onClick={this.toggle}>OK</Button>
            </ModalFooter>
          </Modal>
      </div>
    );
  }
}
ConstructVote.propTypes = {
  voteInfo: propTypes.func.isRequired,
  vote: propTypes.object.isRequired,
  message: propTypes.object.isRequired,
  auth: propTypes.object.isRequired,
  getMessages: propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  vote: state.voteObject,
  auth: state.authObject,
  message: state.messageObject
})

export default connect(mapStateToProps, { voteInfo, getMessages })(ConstructVote);
