import React from "react";

function Hamb2(props) {
  function handleClick() {
    props.click();
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 341.333 341.333" className='hamb' fill='whitesmoke' onClick={handleClick}>
      <path d="M128 128h85.333v85.333H128zM0 0h85.333v85.333H0zm128 256h85.333v85.333H128zM0 128h85.333v85.333H0zm0 128h85.333v85.333H0zM256 0h85.333v85.333H256zM128 0h85.333v85.333H128zm128 128h85.333v85.333H256zm0 128h85.333v85.333H256z"></path>
    </svg>
  );
}

export default Hamb2;
