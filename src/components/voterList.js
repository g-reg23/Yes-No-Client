import React from 'react';
import { Table } from 'reactstrap';

class VoterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showVoterList: false
    };
  }
  toggleList = () => {
    this.setState({showVoterList: !this.state.showVoterList})
  }
  render() {
    let table = this.state.showVoterList ?
      <div>
        {this.props.voters.length > 4 ?
          <p align='center' className='smoke-text clickable' onClick={this.toggleList}>Scroll down to see all voters.</p> : null
        }
        <Table className={this.props.background + ' clickable voterList'} dark onClick={this.toggleList}>
          <thead>
            <tr className='voterListRow'>
              <th className='voterListCell'>Voter</th>
              <th className='voterListCell'>Vote</th>
            </tr>
          </thead>
          <tbody className='tableBody'>
            {this.props.voters.map((voter, index) =>
              <tr className='voterListRow' key={index}><td className='voterListCell'>{voter.name}</td><td className='voterListCell'>{voter.vote}</td></tr>
            )}
          </tbody>
        </Table>
        <p className='smoke-text clickable' onClick={this.toggleList}>Click anywhere to minimize</p>
      </div>: <p className='white clickable clickOff' onClick={this.toggleList}>View Voters</p>
    return table

  }
}


export default VoterList
