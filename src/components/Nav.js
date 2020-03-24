import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { Link } from 'react-router-dom';
import RegisterModal from './navComponents/registerModal';
import LoginModal from './navComponents/loginModal';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  } from 'reactstrap';


class Navi extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
        isOpen: false,
        privateOpen: false,
        publicOpen: false
    }
    this.state = this.initialState;
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  closeCollapse = () => {
    if (this.state.isOpen !== false) {
      this.setState({
        isOpen: !this.state.isOpen,
      });
    }
  }
  privateToggle = () => {
    this.setState({
      privateOpen: !this.state.privateOpen
    })
  }
  publicToggle = () => {
    this.setState({
      publicOpen: !this.state.publicOpen
    })
  }
  privMouseEnter = () => {
    this.setState({privateOpen: true});
  }

  privMouseLeave = () => {
    this.setState({privateOpen: false});
  }
  pubMouseEnter = () => {
    this.setState({publicOpen: true});
  }

  pubMouseLeave = () => {
    this.setState({publicOpen: false});
  }
  render() {
    return (
        <div>
          <Navbar expand='md' className='mb-5s sticky nav-color nav-color'>
              <Container>
                <Link className='navbar-brand white-text' to='#'>
                  YessNo
                </Link>
                <NavbarToggler onClick={this.toggle} className='navbar-light' />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className='ml-auto' navbar>
                    <Dropdown isOpen={this.state.privateOpen} toggle={this.privateToggle} onMouseOver={this.privMouseEnter} onMouseLeave={this.privMouseLeave}>
                      <DropdownToggle nav caret className='navLink white-text'>
                        Private
                      </DropdownToggle>
                      <DropdownMenu className='nav-color'>
                        <Link className='nav-link navLink dropdownItem white-text' to='/private' onClick={this.toggle} style={{paddingLeft:'4%'}}>Active</Link>
                        <Link className='nav-link navLink dropdownItem white-text' to='/privateArchive' onClick={this.toggle} style={{paddingLeft:'4%'}}>Archive</Link>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown isOpen={this.state.publicOpen} toggle={this.publicToggle} onMouseOver={this.pubMouseEnter} onMouseLeave={this.pubMouseLeave}>
                      <DropdownToggle nav caret className='navLink white-text'>
                        Public
                      </DropdownToggle>
                      <DropdownMenu className='nav-color'>
                        <Link className='nav-link navLink dropdownItem white-text' to='/makevote' onClick={this.toggle} style={{paddingLeft:'4%'}}>Build</Link>
                        <Link className='nav-link navLink dropdownItem white-text' to='/active'  onClick={this.toggle} style={{paddingLeft:'4%'}}>Active</Link>
                        <Link className='nav-link navLink dropdownItem white-text' to='/archive' onClick={this.toggle} style={{paddingLeft:'4%'}}>Archive</Link>
                      </DropdownMenu>
                    </Dropdown>
                    <Link className='nav-link navLink white-text' to='/' onClick={this.toggle}>Home</Link>
                    <RegisterModal handleClick={this.toggle} colState={this.state.isOpen} />
                    <LoginModal handleClick={this.toggle} colState={this.state.isOpen}/>
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
        </div>
    );
  }
}

export default Navi;
