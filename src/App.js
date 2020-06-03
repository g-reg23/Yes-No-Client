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
import LandingPage from './components/landingPage';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import store from './store';
import Verify from './components/verify';
import { Provider } from 'react-redux';
import { checkToke } from './actions/authActions';
import PrivacyPolicy from './privacyPolicy';
import {Helmet} from 'react-helmet';
import Sprint from './components/sprint';


class App extends Component {
  componentDidMount(prevProps) {
    let path = window.location.pathname;
    if (prevProps === undefined) {
      if (path === '/' || path === '/makevote' || path === '/active' || path === '/private' || path === '/privateArchive' || path === '/archive' || path === '/privacyPolicy' || path === '/sprint') {
        store.dispatch(checkToke());
      }
    }
  }
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Helmet>
              <title>YessNo</title>
              <meta charSet="utf-8" />
              <meta name="description" content="Streamlined yes no voting on all platforms for the entire internet or small groups of your choosing." />
              <link rel="canonical" href="https://yessno.co/" />
            </Helmet>
            <Navi />
            <Switch>
              <Route exact path='/' render={(props)=><LandingPage {...props} state={store.getState()}/>} />
              <Route exact path='/active' component={ActiveVotes} />
              <Route exact path='/archive' component={Archive} />
              <Route exact path='/makevote' component={MakeVote} />
              <Route exact path='/private' component={Private} />
              <Route exact path='/privateArchive' component={PrivateArchive} />
              <Route exact path='/viewPrivate/:id' component={ViewPrivate} />
              <Route exact path='/sprint' component={Sprint} />
              <Route exact path='/privacyPolicy' component={PrivacyPolicy} />
              <Route exact path='/verify/:id' component={Verify} />
              <Route exact path='/resetPass/:id' component={ResetPass} />
            </Switch>
            <VoteIcon />
            <div className='footerDiv'>
              <div className='footDiv'>
                <p className='footP'>Contact us at: <a className='privLink' href='mailto:support@yessno.co'><u>support@yessno.co</u></a></p>
              </div>
              <div className='footDiv'>
                <p className='footP'>Icons made by <a className='regLink' href="http://www.freepik.com/" title="Freepik"><u>Freepik</u></a> from <a className='regLink' href="https://www.flaticon.com/" title="Flaticon"><u>www.flaticon.com</u></a> is licensed by <a className='regLink' href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer"><u>CC BY 3.0 US</u></a></p>
              </div>
              <div className='footDiv'>
                <Link className='privLink footP' to='/privacyPolicy'><u>Our Privacy Policy</u></Link>
              </div>
              <div className='footDiv'>
                <p className='footP'>Copyright &copy;2019. YessNo.co.<br />All rights reserved.</p>
              </div>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
