import React, { Component } from 'react';
import '../../App.css';
import { Card, CardBody,
  CardTitle, Button, Alert } from 'reactstrap';
import hand from '../../images/041-raise-hand.svg';


class GetVoter extends Component {

  /**
   * Add voter name, and/or both email and phone number to voters list.
   * Submits the entire vote to be sent to api, to be saved and links to the private vote will be
   * texted, emailed, or both (depending on method supplied), to all on voter list.
   */

  constructor(props) {
    super(props);
    this.state = {
      voters: [],
      name: '',
      number: '',
    }
    this.onAdd = this.onAdd.bind(this);
    this.submit = this.submit.bind(this);
  }
  handleChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }
  onClear(e) {
    let info = e.target.parentElement.firstChild.textContent.split(' ')
    let newList = this.state.voters.filter(x => x.name !== info[0])
    this.setState({voters: newList})
  }
  onAdd(e){
    if (this.state.voters.length > 0) {
      for (let i=0; i<this.state.voters.length; i++) {
        if (this.state.name === this.state.voters[i].name) {
          this.props.error('name');
          return;
        } else if (this.state.number === this.state.voters[i].number) {
          this.props.error('number');
          return;
        }
      }
    }

    // let re = /\S+@\S+\.\S+/;
    if (this.state.name.length >= 2 && this.state.name.length < 16) {
      if (this.state.number.toString().length === 10) {
        let voter = {
          name: this.state.name,
          number: this.state.number,
        }
        let newList = this.state.voters;
        newList.push(voter);
        this.setState({
          voters: newList,
          name: '',
          number: '',
        });
        this.props.clear();
      } else {
        this.props.error('phoneLength');
      }
    } else {
      this.props.error('nameLength');
    }

  }

  submit() {
    if (this.state.voters.length < 1 || this.state.voters.length > 10) {
      this.props.error('voters')
      return;
    } else {
      this.props.submitVote(this.state.voters);
    }
  }

  render() {
    let innerAlert = this.props.alert.id !== 'getVoterError' ? null :
     <Alert color={this.props.alert.type} align='center'>{this.props.alert.msg}</Alert>
    let voters = this.state.voters.length > 0 ? '' : 'No current voters added';
    let voterDisplay =  this.state.voters.length > 0 ? this.state.voters.map((votr, i) => <li className='voterListItem smoke-text' key={i} align='center' value={votr.voterId}><strong>{votr.name}  {votr.number}</strong><span onClick={this.onClear.bind(this)} className='clearNumber'>Clear</span></li>) : '';
    return (
      <Card className='getVoterCard slateblue' body >
        <h1 className='infoTitle smoke-text'><u>Voter Information</u></h1>
        <img className='buildPic' src={hand} alt='vote icon' />
        <CardBody>
          <p className='smoke-text'>{voters}</p>
          <CardTitle className='smoke-text' smoke-text style={{fontSize:'1.25rem'}}>Add voters name, valid US phone number, and email address.</CardTitle>
          <hr className='my-2' />
          <ol className='getVoterList'>
            {voterDisplay}
          </ol>
          {innerAlert}
          <hr className='my-2' />
          <input className='textInput' type='text' placeholder='Voter Name' name='name' value={this.state.name} onChange={this.handleChange}/>
          <input className='textInput' type="number" name='number' onChange={this.handleChange} value={this.state.number} pattern="[0-9]{3} [0-9]{3} [0-9]{4}" maxLength="12" placeholder='888 888 8888'  title="Ten digits code" required />
          <button style={{marginTop:'5%'}} className='setButton' onClick={this.onAdd} color='primary' >Add Voter</button>
        </CardBody>
        <Button onClick={this.submit}>Submit Vote</Button>
      </Card>
    );
  }
}

export default GetVoter;
