import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navi from './components/Nav'
import MakeVote from './components/MakeVote2'
// import FinalVote from './components/FinalVote'
import ActiveVotes from './components/ActiveVotes';
import Archive from './components/archive'
import VoteIcon from './components/VoteIcon';
import Private from './components/private';
import PrivateArchive from './components/privateArchive';
import ResetPass from './components/resetPass';
import ViewPrivate from './components/viewPrivate';
import LandingPage from './components/landingPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import Verify from './components/verify';
import { Provider } from 'react-redux';
import { checkToke } from './actions/authActions';
import PrivacyPolicy from './privacyPolicy'
import { Link } from 'react-router-dom';



class App extends Component {
  componentDidMount(prevProps) {
    let path = window.location.pathname;
    if (prevProps === undefined) {
      if (path === '/' || path === '/makevote' || path === '/active' || path === '/private' || path === '/privateArchive' || path === '/archive' || path === '/privacyPolicy') {
        store.dispatch(checkToke());
      }
    }
  }
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navi />
            <Switch>
              <Route exact path='/' render={(props)=><LandingPage {...props} state={store.getState()}/>} />
              <Route exact path='/active' component={ActiveVotes} />
              <Route exact path='/archive' component={Archive} />
              <Route exact path='/makevote' component={MakeVote} />
              <Route exact path='/private' component={Private} />
              <Route exact path='/privateArchive' component={PrivateArchive} />
              <Route exact path='/viewPrivate/:id' component={ViewPrivate} />
              <Route exact path='/privacyPolicy' component={PrivacyPolicy} />
              <Route exact path='/verify/:id' component={Verify} />
              <Route exact path='/resetPass/:id' component={ResetPass} />
            </Switch>
            <VoteIcon />
            <div className='footerDiv'>Icons made by <a className='regLink' href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a className='regLink' href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a className='regLink' href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC BY 3.0 US</a>
            <div className='linkDiv'><Link className='privLink' to='/privacyPolicy'> Our Privacy Policy</Link></div></div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
