import React from "react";

export default function Toast({ message, isOpen }) 
{ 
  return (
    <dialog className='toast' open={isOpen}>
      <div className='contenido'>
        <div className='texto'>
            <text className='text-base'> {message} </text>        
        </div>
      </div>
    </dialog> 
  );
}