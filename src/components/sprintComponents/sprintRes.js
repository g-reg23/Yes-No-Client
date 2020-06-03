import React, { useState } from 'react';
import '../../App.css';
import {useSpring, animated as a} from 'react-spring';
import VisibilitySensor from 'react-visibility-sensor';
import balance from '../../images/014-balance.svg';
import graph from '../../images/012-debate.svg';
import hand from '../../images/041-raise-hand.svg';
import icon from '../../images/027-global-voting.svg';
import PieChart from '../activeVoteComponents/PieChart';

function SprintRes(props) {
  const icons = [balance, graph, hand, icon];
  const colors = ['showCard darkCadetBlue indSprintRes','showCard slateblue indSprintRes','showCard darkBlue indSprintRes'];
  const [vis, setVis] = useState(false);
  const backgroundAnim = useSpring({
    opacity: vis ? 1 : 0,
    from: {opacity:0},
    config: {duration: 1200},
  })
  const backClick = () => {
    props.clickBack();
  }
  let sprint;
  props.sprints.map((sp, i) => {
    if (sp._id === props.sprintId) {
      sprint = sp;
    }
  })

  return(
    <VisibilitySensor onChange={(isVisible) => setVis(isVisible)} partialVisibility>
      <a.div style={backgroundAnim}>
        <p className='sprintMessage' align='center'>You have already completed this Sprint, please view the data below.</p>
        <h2 align='center' className='sprintResTitle'>{sprint.name} Results</h2>
        <p className='totalSprintNum'>{sprint.total} completed Sprints.</p>
        <p align='center' className='sprintCreator'>Created By: {sprint.creator}</p>
        <div className='buttonDiv'>
          <button onClick={backClick}>Back To All Sprints</button>
        </div>
        {sprint.votes.map((vote, i) =>
          <div key={i} className={colors[i%3]}>
            <img src={icons[i%4]} alt='voting graph' className='graphPic'/>
            <h3 align='center' className='smoke-text'>{vote.question}</h3>
            <PieChart yes={vote.yes} no={vote.no} voteId={i} forSprint={true}/>
          </div>
        )}
      </a.div>
    </VisibilitySensor>
  )
}

export default SprintRes;
