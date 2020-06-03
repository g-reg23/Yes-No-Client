import React, { Component } from 'react';
import { Card, CardBody,
  CardTitle, Alert } from 'reactstrap';
import '../../App.css';
import { connect } from 'react-redux';
import { privInfo } from '../../actions/privateActions';
import { getMessages, clearMessages } from '../../actions/messageActions';
import propTypes from 'prop-types';
import debate from '../../images/012-debate.svg';



class ConstructPrivate extends Component {

  /**
   * Takes in name of vote, if name is set asks for description, if description is set
   * asks for vote length, if all are set, reviews all vote data and can submit for final review or
   * go back to beginning.
   */
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: '',
      description: '',
      voteLength: '2 hour',
      nameSet: false,
      descSet: false
    }
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.setName = this.setName.bind(this);
    this.setDesc = this.setDesc.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.goBack = this.goBack.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  selectChange(e) {
    this.setState({
      voteLength: e.target.value,
    })
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }
  setName() {
    if (this.props.auth.isAuthenticated) {
      if (this.state.name.length >= 5 && this.state.name.length < 61) {
        this.setState({
          nameSet: !this.state.nameSet
        })
        this.props.clearMessages()
      } else {
        this.props.getMessages({'msg': 'The vote name must be at least 5 characters in length, and not longer than 60 characters.'}, null, 'danger', 'constructPrivate')
      }
    } else this.props.getMessages({'msg': 'You must login first.'}, null, 'danger', 'constructPrivate');
  }
  setDesc() {
    if (this.state.description.length > 9 && this.state.description.length < 101) {
      this.setState({
        descSet: !this.state.descSet
      })
      this.props.clearMessages();
    } else {
      this.props.getMessages({'msg': 'Sorry the vote description must be at least 10 characters in length, and no longer that 100 characters.'}, null, 'danger', 'constructPrivate')
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
            voteLength: this.state.voteLength,
            saved: true,
          }
          this.props.privInfo(newVote)
          // this.props.addVote(newVote);
        }else {this.toggle()}
      }else{this.toggle()}
    } else {
      this.props.getMessages({'msg': 'You must log in first'}, null, 'danger', 'constructPrivate')
    }
  }
  componentDidMount() {
    if (this.props.message.id === 'loginSuccess' || this.props.message.id === 'regSuccess') return
    else this.props.clearMessages();
  }


  render() {
    let innerAlert = this.props.message.id !== 'constructPrivate' ? null :
     <Alert color={this.props.message.type} align='center'>{this.props.message.msg}</Alert>

    let name = this.state.nameSet === false ?
      <div className='inputDiv'>
        <CardTitle align='center' className='voteInfoHeader'>Please enter the question to be voted on in the box below. It should be a simple yes/no question. Then click the Set button</CardTitle>
        <input className='textInput' style={{marginTop:'3%'}} name='name' type='text' placeholder='Vote Question' onChange={this.handleChange}/>
        <div className='buttonDiv'><button className='setButton' onClick={this.setName}>Set Vote</button><br />
        </div>
      </div> :
      <div className='inputDiv'>
        <div className='voteInformation'>
          <p align='center' className='voteInfoPara infoHeader'><b>Vote Name</b></p>
          <p className='voteInfoPara' align='center'>{this.state.name}</p>
        </div>
        <hr />
        <CardTitle align='center' className='voteInfoHeader'>Now you may enter any additional details and a brief description of the vote and enter the Set button.</CardTitle>
        <textarea className='textInput' style={{fontSize:'.85em', height:'5em'}} name='description' type='text' placeholder='Description/Additional Information' onChange={this.handleChange}>
        </textarea>
        <div className='buttonDiv'>
          <button className='setButton' onClick={this.setDesc}>Set Vote</button>
          <button className='goBackButton' onClick={this.goBack}>Go Back</button>
        </div>
      </div>

    // let intro1 = this.state.nameSet === false ?
    //   <CardTitle className='voteInfoHeader'>Please enter the question to be voted on in the box below. It should be a simple yes/no question. Then click the Set button</CardTitle> :
    //   <CardTitle className='voteInfoHeader'>Now you may enter any additional details and a brief description of the vote and enter the Set button.</CardTitle>

    let finalReview =
      <div>
        <div className='voteInformation'>
          <p align='center' className='voteNameHead infoHeader'><b>Vote Name</b></p><p className='voteNameTrue' align='center'>{this.state.name}</p>
          <p align='center' className='voteNameHead infoHeader'><b>Vote Description</b></p><p className='voteNameTrue' align='center'>{this.state.description}</p>
        </div>
        <hr />
        <CardTitle align='center' className='voteInfoHeader'>Now choose the length of your vote and click save. Otherwise click Go Back.</CardTitle>
        <select className='textInput' value={this.state.voteLength} onChange={this.selectChange}>
          <option name='length' value='2 Hours'>2 Hours</option>
          <option name='length' value='3 Hours'>3 Hours</option>
          <option name='length' value='6 Hours'>6 Hours</option>
          <option name='length' value='12 Hours'>12 Hours</option>
          <option name='length' value='24 Hours'>24 Hours</option>
        </select><br />
      <div className='buttonDiv'><button onClick={this.onSubmit} className='setButton'><span>Save Vote</span></button><button className='goBackButton' onClick={this.goBack}>Go Back</button></div></div>

    let show = this.state.nameSet === true && this.state.descSet === true ? finalReview : name;

    let alert = this.props.message.id === 'constructPrivate' ? null :
      <Alert color={this.props.message.type} align='center'>{this.props.message.msg}</Alert>

    return (
      <div>
        {alert}
          <Card className='innerCard' body>
            <h1 className='infoTitle'><u>Vote Information</u></h1>
            <img className='buildPic' src={debate} alt='vote icon' />
            <CardBody>
              {innerAlert}
              {show}
            </CardBody>
          </Card>
      </div>
    );
  }
}
ConstructPrivate.propTypes = {
  privInfo: propTypes.func.isRequired,
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

export default connect(mapStateToProps, { privInfo, getMessages, clearMessages })(ConstructPrivate);
