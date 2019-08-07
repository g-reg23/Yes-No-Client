import React from 'react';
import { Popover, PopoverHeader } from 'reactstrap';
import no from '../images/iconfinder_No_984759.svg';

class NoButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }
  voteNo(e) {
    this.props.noVote(this.props.voteId);
  }

  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    return (
      <form>
        <img name='noVoteButton' className='yes_no_buttons noVote' id={'noVote' + this.props.index} onClick={this.voteNo.bind(this)} src={no} alt='no vote' disabled/>
        <Popover placement='right' isOpen={this.state.popoverOpen} toggle={this.toggle} trigger='hover' target={'noVote' + this.props.index}>
          <PopoverHeader>This votes NO!!</PopoverHeader>
        </Popover>
      </form>
    );
  }
}


export default NoButton;
