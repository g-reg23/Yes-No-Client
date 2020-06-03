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
  return(
    <nav class="navbar2">
        <div class="navbar-toggle" id="js-navbar-toggle">
          <Hamb click={handleToggle}/>
        </div>
        <Link className='navbar-brand2' to='/'>
          <PollSVG />
          <span className='ynNavBrand'>YessNo</span>
        </Link>
        {toggle ?
          <ul class="main-nav" id="js-menu">
            <li>
              <Link to='/sprint' className="navLink2" onClick={() => setToggle(!toggle)}>Sprint</Link>
            </li>
            <li>
              <Link to='#' className="navLink2" onClick={() => setPriv(!privTog)}>Private</Link><div className='caretDiv'><CaretDown /></div>
              {privTog ?
                <div className='dropDownDiv'>
                  <Link to='/private' className='navLink2 dropItem' onClick={() => setToggle(!toggle)}>Active</Link>
                  <Link to='/privateArchive' className='navLink2 dropItem' onClick={() => setToggle(!toggle)}>Archive</Link>
                </div> : null
              }
            </li>
            <li>
              <Link to='#' className="navLink2" onClick={() => setPub(!pubTog)}>Public</Link>
              {pubTog ?
                <div className='dropDownDiv'>
                  <Link to='/active' className='navLink2 dropItem' onClick={() => setToggle(!toggle)}>Active</Link>
                  <Link to='/archive' className='navLink2 dropItem' onClick={() => setToggle(!toggle)}>Archive</Link>
                </div> : null
              }
            </li>
            <li>
              <Link to='/' class="navLink2" onClick={() => setToggle(!toggle)}>Home</Link>
            </li>
            <li>
              <LoginModal />
            </li>
            <li>
              <RegisterModal />
            </li>
          </ul> : null
        }
      </nav>
  )
}

export default Navi;
