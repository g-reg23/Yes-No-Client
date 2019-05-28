import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navi from './components/Nav'
import MakeVote from './components/MakeVote2'
// import FinalVote from './components/FinalVote'
import ActiveVotes from './components/ActiveVotes'
import VoteIcon from './components/VoteIcon';
import LandingPage from './components/landingPage'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';




class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navi />
            <Switch>
              <Route exact path='/' render={(props)=><LandingPage {...props} state={store.getState()}/>} />
              <Route exact path='/active' component={ActiveVotes} />
              <Route exact path='/makevote' component={MakeVote} />
            </Switch>
            <VoteIcon />
            <div style={{marginTop:'10%', marginBottom:'5%', padding:'3%'}}>Icons made by <a className='regLink' href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a className='regLink' href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a className='regLink' href="http://creativecommons.org/licenses/by/3.0/" 		    title="Creative Commons BY 3.0" target="_blank" rel="noopener noreferrer">CC 3.0 BY</a></div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
