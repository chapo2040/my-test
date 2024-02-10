import React from "react";

export default function Alert({ message, isOpen, handler }: any) 
{   
  return (
    <dialog className='alert' open={isOpen}>
      <div className='contenido'>
          <text className='text-base'> {message} </text> <br/><br/>
          <button className='custom-button buttonYes' onClick={handler}> Aceptar </button>          
      </div>
    </dialog> 
  );
}