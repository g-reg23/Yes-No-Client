import React from 'react';
import { Popover, PopoverHeader } from 'reactstrap';
import yes from '../images/iconfinder_checkmark-24_103184.svg';

class YesButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      popoverOpen: false
    };
  }
  voteYes() {
    this.props.yesVote(this.props.voteId)
  }


  toggle() {
    this.setState({
      popoverOpen: !this.state.popoverOpen
    });
  }

  render() {
    const className = 'yes_no_buttons yesVote ' + this.props.class;
    return (
      <form>
        <img className={className} id={'yesVote' + this.props.index} style={{float:'right'}} onClick={this.voteYes.bind(this)} src={yes} alt='yes vote' data-toggle="popover" data-trigger="hover" data-content='Vote Yes.'  />
        <Popover placement='left' isOpen={this.state.popoverOpen} toggle={this.toggle} trigger='hover' target={"yesVote" + this.props.index}>
          <PopoverHeader>This votes Yess!!</PopoverHeader>
        </Popover>
      </form>
    );
  }
}

export default YesButton;
