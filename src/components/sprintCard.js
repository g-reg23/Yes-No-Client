import React, { Component, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Transition } from 'react-transition-group';
import { useSpring, useTransition, animated as a} from 'react-spring';
import PieChart from './activeVoteComponents/PieChart';
import '../App.css';
import icon from '../images/027-global-voting.svg';
import NoButton from './noButton'
import YesButton from './yesButton';

const SprintCard = (props) => {
  console.log('in card')
  const [exit, setExit] = useState(false);
  const [exitDir, setDir] = useState('');
  const cardAnim = useSpring({
    transform: !exit ? 'translate(0px,0px) rotate(0deg)': exitDir,
    opacity: !exit ? 1 : 1,
    from:{transform:'translate(0px,800px) rotate(0deg)', opacity:0},
    config:{duration:700},
  })
  // const card = []
  const [show, set] = useState([0])
  // const transitions = useTransition(show, null, {
  //   from: {transform:'translate(1000px,0px)', opacity:0 },
  //   enter: { transform:'translate(0px,0px)', opacity:1 },
  //   leave: { transform:'translate(0px,20000px)', opacity:0 },
  //   config:{duration:700}
  // })
  function yesVote() {
    setDir('translate(1000px,-600px) rotate(270deg)')
    setExit(true);
    props.yesVote(props.index);
  }
  function noVote() {
    setDir('translate(-1000px,-600px) rotate(270deg)')
    setExit(true);
    props.noVote(props.index);
  }
  function backClick() {
    props.quitSprint()
  }
  const index = props.index;
  const question = props.question;
  const name = props.name;
  console.log(props.index)
  const colors = ['showCard darkCadetBlue sprintCard','showCard slateblue sprintCard','showCard darkBlue sprintCard'];
  return (
      <a.div style={cardAnim} className={colors[index%3]}>
        <h1 align='center' className='smoke-text'>{name}</h1>
        <img className='graphPic' src={props.image} alt='vote icon' />
        <p className='showName sprintQuestion' align='center'>{question}</p>
        <Container>
          <Row>
            <Col><YesButton voteId={index} yesVote={yesVote} index={0} class='sprintButton'/></Col>
            <Col><NoButton voteId={index} noVote={noVote} index={0} class='sprintButton'/></Col>
          </Row>
        </Container>
      </a.div>
  )

}

export default SprintCard;
