import React, { Component } from 'react';
import { Card, CardBody,
  CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import '../../App.css';
import { connect } from 'react-redux';
import { voteInfo } from '../../actions/voteActions';
import { getMessages, clearMessages } from '../../actions/messageActions';
import propTypes from 'prop-types';
import { Tween } from 'react-gsap';
class ConstructVote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      description: '',
      nameSet: false,
      descSet: false
    }
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setName = this.setName.bind(this);
    this.setDesc = this.setDesc.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }
  setName() {
    if (this.props.auth.isAuthenticated) {
      if (this.state.name.length > 5 && this.state.name.length < 61) {
        this.setState({
          nameSet: !this.state.nameSet
        })
        this.props.clearMessages();
      } else {
        this.props.getMessages({'msg': 'The vote name must be at least 5 characters and no longer than 30 characters.'}, null, 'danger', 'constructVote');
      }
    } else this.props.getMessages({'msg': 'You must log in first.'}, null, 'danger', 'constructVote')
  }
  setDesc() {
    if (this.state.description.length > 9 && this.state.description.length < 101) {
      this.setState({
        descSet: !this.state.descSet
      })
      this.props.clearMessages();
    } else {
      this.props.getMessages({'msg': 'The vote description must be at least 10 characters and no more than 100 characters.'}, null, 'danger', 'constructVote');
    }
  }
  goBack() {
    if (this.state.descSet) {
      this.setState({
        descSet: !this.state.descSet,
      })
    }else {
      this.setState({
        nameSet: !this.state.nameSet
      })
    }
  }
  onSubmit(e) {
    if (this.props.auth.isAuthenticated) {
      if (this.state.name.length > 3) {
        if (this.state.description.length > 8) {
          let newVote = {
            name: this.state.name,
            desc: this.state.description,
            creator: this.props.auth.username,
            saved: true,
          }
          this.props.voteInfo(newVote)
          // this.props.addVote(newVote);
        }else {this.toggle()}
      }else{this.toggle()}
    } else {
      this.props.getMessages({'msg': 'You must log in first'}, 'client', 'danger', 'login')
    }

  }

  componentDidMount() {
    if (this.props.message.id === 'constructVote' || this.props.message.id === 'loginSuccess' || this.props.message.id === 'regSuccess') {
      return
    }else {
      this.props.clearMessages();
    }
  }


  render() {
    let innerAlert = this.props.message.id !== 'constructVote' ? null :
     <Alert color={this.props.message.type} align='center'>{this.props.message.msg}</Alert>

    let name = this.state.nameSet === false ?
      <Tween duration={3} from={{ opacity:0 }}><div className='inputDiv'><input className='textInput' style={{marginTop:'3%'}} name='name' type='text' placeholder='Vote Question' onChange={this.handleChange}/><div className='centerButtonRow'><Button color='primary' className='setButton' onClick={this.setName}>SET</Button><br /></div></div></Tween> :
      <Tween duration={3} from={{ opacity:0 }}><div className='inputDiv'><div><textarea className='textInput' style={{fontSize:'.85em', height:'5em'}} name='description' type='text' placeholder='Description/Additional Information' onChange={this.handleChange}></textarea>
      <div className='centerButtonRow'><Button color='primary' className='setButton' onClick={this.setDesc}>SET</Button><Button color='primary' className='goBackButton' onClick={this.goBack}>Go Back</Button></div></div><div><p align='center' className='voteNameHead'>Vote Name</p><p className='voteNameTrue' align='center'>{this.state.name}</p></div></div></Tween>

    let intro1 = this.state.nameSet === false ? <CardTitle className='voteInfoHeader'>Please enter the question to be voted on in the box below. It should be a simple yes/no question. Then click the Set button</CardTitle> :
      <CardTitle className='voteInfoHeader'>Now you may enter any additional details and a brief description of the vote and enter the Set button.</CardTitle>

    let finalReview =<div><CardTitle className='voteInfoHeader'>Click save to view your vote before submitting. Otherwise click Go Back.</CardTitle>
      <p align='center' className='voteNameHead'>Vote Name</p><p className='voteNameTrue' align='center'>{this.state.name}</p>
      <p align='center' className='voteNameHead'>Vote Description</p><p className='voteNameTrue' align='center'>{this.state.description}</p>
      <div className='centerButtonRow'><Button style={{marginTop:'5%'}} onClick={this.onSubmit} color='primary' type='submit' value='Submit'><span>Save</span></Button><Button color='primary' className='goBackButton' onClick={this.goBack}>Go Back</Button></div></div>

    let show = this.state.nameSet === true && this.state.descSet === true ? finalReview : name;

    return (
      <div>
          <Card className='innerCard' body>
            <h1 className='infoTitle'><u>Vote Information</u></h1>
            <CardBody>
              {this.state.nameSet === true && this.state.descSet === true ? null : intro1}
              {innerAlert}
              <hr className='my-2' />
              {show}
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
  getMessages: propTypes.func.isRequired,
  clearMessages : propTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  vote: state.voteObject,
  auth: state.authObject,
  message: state.messageObject
})

export default connect(mapStateToProps, { voteInfo, getMessages, clearMessages })(ConstructVote);
