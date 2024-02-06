import React from "react";

export default function Alert({ message, isOpen, handler }) 
{ 
  return (
    <dialog open={isOpen}>
      <div className='win-dialog'>
          <text className='text-base'> {message} </text> <br/><br/>
          <button className='custom-button buttonYes' onClick={handler}> OK </button>          
      </div>
    </dialog> 
  );
}