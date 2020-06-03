import React from 'react';

const ClickTitle = props => {
  const handleClick = () => {
    props.selectSprint(props.sprint);
  }
  const complete = props.sprint.total === 1 ? 'person has completed.' : 'people have completed.'
  const colors = ['clickTDiv darkCadetBlue','clickTDiv slateblue','clickTDiv darkBlue'];
  return (
    <div className={colors[props.index%3]} onClick={handleClick}>
      <h3 align='center' className='smoke-text'>{props.sprint.name}</h3>
      <img className='graphPic' src={props.image} alt='vote icon' />
      <h6 align='center' className='smoke-text'>{props.sprint.votes.length} Questions</h6>
      <h6 align='center' className='smoke-text'>{props.sprint.total} {complete}</h6>
      <h6 align='center' className='smoke-text'>Created By: {props.sprint.creator}</h6>
    </div>
  )
}

export default ClickTitle;
