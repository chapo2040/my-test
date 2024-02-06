import React from "react";

export default function Toast({ message, isOpen }) 
{ 
  return (
    <dialog open={isOpen}>
      <div className='toast'>
        <div>
            <text className='text-base'> {message} </text> <br/><br/>          
        </div>
      </div>
    </dialog> 
  );
}