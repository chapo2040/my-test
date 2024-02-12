//import React, { Component, useState, useEffect  } from 'react';
//import {useForm} from 'react-hook-form'

export function AyuFacturas({ isOpen, handler }) 
{
  //const {register, handleSubmit, setValue,  reset, formState: { errors }} = useForm();   
  //const [isVisible, setVisible] = useState(false);

    /*
  function Salir()
  {
    //alert('Salir');
  
  }

  useEffect(() => 
  { 
      //alert('Entro | isOpen: ' + isOpen);
      //setVisible(isOpen);
  }, []);  
  */

  return(
    <div> 
      
      <dialog class='ayudaFactura' open={isOpen}>

         FACTURAS <br/>
        <input type='text'></input> <button onClick={handler}>  Buscar </button> 
        <div> Factura 1 </div>
        <div> Factura 2 </div>
        <div> Factura 3 </div>
        <div> Factura 4 </div>

      </dialog>

    </div>
  );
}