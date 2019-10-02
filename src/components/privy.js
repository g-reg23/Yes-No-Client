import React from 'react';
import { Card, CardBody } from 'reactstrap';
import PieChart from './activeVoteComponents/PieChart';
import icon from '../images/027-global-voting.svg';
import VoterList from './voterList';

const Privy  = ({vote}) => {
  const votes =
    <Card className='showCard' body>
      <img width='20%' src={icon} alt='vote icon' style={{marginLeft:'40%'}}  />
      <p className='showName' align='center'>{vote.name}</p>
      <p align='center' className='showDesc'>{vote.desc}</p><hr />
      <CardBody>
        <p style={{marginBottom:'0', float: 'none'}} className='showCreator'>Created By: {vote.creator}</p><hr />
        <PieChart yes={vote.yes} no={vote.no} voteId={vote._id}/><hr />
        <VoterList voters={vote.voters} />
      </CardBody>
    </Card>
  return votes;
}
export default Privy;
