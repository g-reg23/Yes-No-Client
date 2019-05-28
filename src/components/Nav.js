import React, { Component } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { Link } from 'react-router-dom';
import RegisterModal from './navComponents/registerModal';
import LoginModal from './navComponents/loginModal';
import ProfileModal from './navComponents/profile';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Container,
  } from 'reactstrap';


class Navi extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
        isOpen: false,
    }
    this.state = {
      isOpen: this.initialState.isOpen,
    }
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }
  render() {
    return (
        <div>
          <Navbar style={{background:'#d3d3d3', color:'#262626'}} expand='md' className='mb-5s sticky'>
              <Container>
                <Link className='navbar-brand' style={{color:'#262626', fontWeight:'550' }} to='/'>
                  YessNo
                </Link>
                <NavbarToggler onClick={this.toggle} className='navbar-light' />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className='ml-auto' navbar>
                    <Link className='nav-link navLink' to='/makevote'>Make A Vote</Link>
                    <Link className='nav-link navLink' to='/active'>Active</Link>
                    <Link className='nav-link navLink' to='/'>Top Votes</Link>
                    <RegisterModal />
                    <LoginModal />
                  </Nav>
                </Collapse>
              </Container>
            </Navbar>
        </div>
    );
  }
}

export default Navi;
