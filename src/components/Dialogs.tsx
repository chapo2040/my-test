import React from "react";

export default function ConfirmationDialog({ message, isOpen, handlerYes, handlerNo }: any) 
{ 
  return (
    <dialog open={isOpen} >
      <div className='win-dialog'>
          <text className='text-base'> {message} </text> <br/><br/>
          <button className='custom-button buttonYes' onClick={handlerYes}> SI </button>
          <button className='custom-button buttonNo' onClick={handlerNo}> NO </button>             
      </div>
    </dialog> 
  );
}