import React from "react";
import imgInfo from '../images/info.png'

export default function Toast({ message, isOpen }) 
{ 
  return (
    <dialog className='toast' open={isOpen}>
      <div className='contenido'>
        <div className='colBandaColor'></div>
        <div className='colImage'>
          <img src={imgInfo} className='info' />
        </div>
        <div className='colTexto'>          
            <text className='text-base texto'> {message} </text>        
        </div>
      </div>
    </dialog> 
  );
}