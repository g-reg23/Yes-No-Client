import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import { Link } from 'react-router-dom';
import RegisterModal from './navComponents/registerModal';
import LoginModal from './navComponents/loginModal';
import PollSVG from './navComponents/pollSVG';
import Hamb from './navComponents/hamb2';
import CaretDown from './navComponents/caretDown'
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

function Navi() {
  const [toggle, setToggle] = useState(false);
  const [privTog, setPriv] = useState(false);
  const [pubTog, setPub] = useState(false);
  function handleToggle() {
    setToggle(!toggle);
  }
  const [width, setWidth] = useState(window.innerWidth);
  window.addEventListener('resize', handleResize);
  window.addEventListener('click', clickToggle);
  function clickToggle() {
    console.log('hi');
  }
  function handleResize() {
    setWidth(window.innerWidth);
  }
  const privStyle = {
    display: privTog ? 'block' : 'none'
  }
  const pubStyle = {
    display: pubTog ? 'block' : 'none'
  }
  console.log(window.innerWidth);
  return(
    <nav class="navbar2">
      {width < 769 ?
          <div class="navbar-toggle" id="js-navbar-toggle">
            <Hamb click={handleToggle}/>
          </div> : null }
        <Link className='navbar-brand2' to='/'>
          <PollSVG />
          <span className='ynNavBrand'>YessNo</span>
        </Link>
        {toggle || width > 769 ?
          <div class="main-nav" id="js-menu">
            <div>
              <Link to='/sprint' className="navLink2" onClick={() => setToggle(!toggle)}>Sprint</Link>
            </div>
            <div>
              <Link to='#' className="navLink2" onClick={() => setPriv(!privTog)}>Private</Link>
              {privTog ?
                <div className='dropDownDiv' style={privStyle}>
                  <Link to='/private' className='navLink2 dropItem' onClick={() => setToggle(!toggle)}>Active</Link>
                  <Link to='/privateArchive' className='navLink2 dropItem' onClick={() => setToggle(!toggle)}>Archive</Link>
                </div> : null
              }
            </div>
            <div>
              <Link to='#' className="navLink2" onClick={() => setPub(!pubTog)}>Public</Link>
              {pubTog ?
                <div className='dropDownDiv' style={pubStyle}>
                  <Link to='/active' className='navLink2 dropItem' onClick={() => setToggle(!toggle)}>Active</Link>
                  <Link to='/archive' className='navLink2 dropItem' onClick={() => setToggle(!toggle)}>Archive</Link>
                </div> : null
              }
            </div>
            <div>
              <Link to='/' class="navLink2" onClick={() => setToggle(!toggle)}>Home</Link>
            </div>
            <div>
              <LoginModal />
            </div>
            <div>
              <RegisterModal />
            </div>
          </div> : null
        }
      </nav>
  )
}

export default Navi;
