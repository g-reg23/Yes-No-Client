import React, { useState } from 'react';

const ClickTitle = props => {
  const handleClick = () => {
    props.selectSprint(props.sprint);
  }
  const complete = props.sprint.total === 1 ? 'person has completed.' : 'people have completed.'
  return (
    <div className='clickTDiv'>
      <h3 align='center' className='clickTitle' onClick={handleClick}>{props.sprint.name}</h3>
      <h6 align='center'>{props.sprint.votes.length} Questions</h6>
      <h6 align='center'>{props.sprint.total} {complete}</h6>
      <h6 align='center'>Created By: {props.sprint.creator}</h6>
    </div>
  )
}

export default ClickTitle;
