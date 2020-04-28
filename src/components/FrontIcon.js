import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../App.css';
import YesIcon from './headComponents/yesIcon';
import NoIcon from './headComponents/noIcon';
import icon from '../images/396.jpg';


class FrontIcon extends Component {
// SWITCH STATEMENT FOR PAGE TITLE, BASED ON ROUTE PASSED IN FROM APP.JS ROUTER.

  render() {
    let top;
    let desc;
    switch(this.props.view) {
      case 'activeVotes':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Active Votes</h1>
        <h3 className='routeSubTitle' align='center'>Ask The Internet</h3></div>
        desc = <h5 className='frontDescription'>
        Public Active Votes are open to all
        on the internet. All you need is a YessNo or Google account and you can
        vote in or build as many public votes as you want. You are only allowed 1 vote in every poll,
        so make your voice heard wisely.
        </h5>
        break;
      case 'makeVote':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Public Votes</h1>
        <h3 className='routeSubTitle' align='center'>Voice Your Opinion</h3></div>
        desc = <h5 className='frontDescription'>
        Build a Public Vote for the entire internet.
        Find out the world's opinion on all your burning questions.
        Make sure to make the vote name in the form of a yes or no question.
        </h5>
        break;
      case 'archive':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Public Archive</h1>
        <h3 className='routeSubTitle' align='center'>View Past Votes</h3></div>
        desc = <h5 className='frontDescription'>
        All Public Votes that have reached 500 votes are stored here, in the archive.
        Browse through all the polls that have reached YessNo immortality.
        Or head over the Build section in Public to construct the next member of the archive.
        </h5>
        break;
      case 'private':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Private Vote</h1>
        <h3 className='routeSubTitle' align='center'>Ask Your Social Circle</h3></div>
        desc = <h5 className='frontDescription'>
        The fastest, easiest way for any group to get time-sensitive answers.
        Each group member will be sent a uniquely identifying link to the vote
        via SMS text message. Group members do not need to be YessNo members or
        download anything in order to participate in the vote.
        </h5>
        break;
      case 'privateArchive':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Private Archive</h1>
        <h3 className='routeSubTitle' align='center'>View Past Votes</h3></div>
        desc = <h5 className='frontDescription'>
        In the Private Archive you may view all of the past private votes you have created.
        Staying here you may relive any of your past polls, or visit the Build section
        under Private, to make new Private votes.
        </h5>
        break;
      case 'privacyPolicy':
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>Privacy Policy</h1>
        <h3 className='routeSubTitle' align='center'>Be Informed</h3></div>
        desc = <h5 className='frontDescription'> YessNo takes your privacy
        seriously and you should too. Read below to learn how we will use your
        data. Staying informed on the internet is your greatest weapon.
        </h5>
        break;
      default:
        top = <div className='frontDiv'><h1 className='routeTitle' align='center'>YessNo</h1>
        <h3 className='routeSubTitle' align='center'>Get Answers.. Fast.</h3></div>
        desc = <h5 className='frontDescription'> YessNo is a streamlined voting platform. YessNo deals with
        simple yes or no votes to get quickly and exactly to the point.
        YessNo offers large scale public votes to the entire internet, as
        well as private small scale voting for groups of your own choosing.
        Easily build, participate or just browse on all platforms with
        YessNo.
        </h5>
        break;
    }
    // let cta = this.props.view === '/' ? <button className='CTAButton'>Make A Vote</button> : ''
    return(
      <div className='topDiv'>
        {top}
        <Container>
          <Row>
            <Col><YesIcon /></Col>
            <Col><NoIcon /></Col>
          </Row>
          {desc}
        </Container>
      </div>
    )
  }
}

export default FrontIcon;
