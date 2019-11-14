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
  DropdownItem
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
          <Navbar style={{background:'#d3d3d3', color:'#262626'}} expand='md' className='mb-5s sticky'>
              <Container>
                <Link className='navbar-brand' style={{color:'#262626', fontWeight:'550' }} to='#'>
                  YessNo
                </Link>
                <NavbarToggler onClick={this.toggle} className='navbar-light' />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className='ml-auto' navbar>
                    <Dropdown isOpen={this.state.privateOpen} toggle={this.privateToggle} onMouseOver={this.privMouseEnter} onMouseLeave={this.privMouseLeave}>
                      <DropdownToggle nav caret className='navLink'>
                        Private
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem><Link className='nav-link navLink dropdownItem' to='/private' onClick={this.toggle}>Active</Link></DropdownItem>
                        <DropdownItem />
                        <DropdownItem><Link className='nav-link navLink dropdownItem' to='/privateArchive' onClick={this.toggle}>Archive</Link></DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Dropdown isOpen={this.state.publicOpen} toggle={this.publicToggle} onMouseOver={this.pubMouseEnter} onMouseLeave={this.pubMouseLeave}>
                      <DropdownToggle nav caret className='navLink'>
                        Public
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem><Link className='nav-link navLink dropdownItem' to='/makevote' onClick={this.toggle}>Build</Link></DropdownItem>
                        <DropdownItem />
                        <DropdownItem><Link className='nav-link navLink dropdownItem' to='/active'  onClick={this.toggle}>Active</Link></DropdownItem>
                        <DropdownItem />
                        <DropdownItem><Link className='nav-link navLink dropdownItem' to='/archive' onClick={this.toggle}>Archive</Link></DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Link className='nav-link navLink' to='/' onClick={this.toggle}>Home</Link>
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
