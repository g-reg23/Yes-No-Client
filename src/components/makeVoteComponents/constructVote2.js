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
      if (this.state.nameSet) {
        let newVote = {
          name: this.state.name,
          desc: this.state.description,
          creator: this.props.auth.username,
          saved: true,
        }
        this.props.voteInfo(newVote)
      } else {
        this.props.getMessages({'msg': 'Please make sure the vote name is set.'}, '','','');
        return;
      }
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
      <div className='inputDiv'>
        <CardTitle align='center' className='voteInfoHeader'>Please enter the question to be voted on in the box below. It should be a simple yes/no question. Then click the Set button</CardTitle>
        <input className='textInput' style={{marginTop:'3%'}} name='name' type='text' placeholder='Vote Question' onChange={this.handleChange}/>
        <div className='buttonDiv'>
          <button className='setButton' onClick={this.setName}>SET</button>
          <br />
        </div>
      </div> :
      <div className='inputDiv'>
        <div className='voteInformation'>
          <p align='center' className='voteInfoPara'><b>Vote Name:</b></p>
          <p align='center' className='voteInfoPara'>{this.state.name}</p>
        </div>
        <div>
          <CardTitle align='center' className='voteInfoHeader'>Now you may enter any additional details and a brief description of the vote and enter the Set button.</CardTitle>
        </div>
        <textarea className='textInput' style={{fontSize:'.85em', height:'5em'}} name='description' type='text' placeholder='Description/Additional Information' onChange={this.handleChange}>
        </textarea>
        <div className='buttonDiv'>
          <button className='setButton' onClick={this.setDesc}>Set Vote</button>
          <button  className='goBackButton' onClick={this.goBack}>Go Back</button>
        </div>
      </div>
    return (
      <div>
          <Card className='innerCard accent-color-four white-text' body>
            <h1 className='infoTitle'><u>Vote Information</u></h1>
            <CardBody>
              {innerAlert}
              <hr className='my-2' />
              {name}
            </CardBody>
          </Card>
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
