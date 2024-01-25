import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom';

import Utils, { Menu, Movimiento } from "./Utils";

function Cuenta() 
{       
    const {register, handleSubmit, reset} = useForm();   
    const navigate = useNavigate(); 

    function OnSubmit(data)
    {           
        if(validateForm(data)===true)
        {
            //alert('GUARDAR ! ');   
            navigate('/dashboard');
        }
    }  

    function validateForm(data)
    {
        /*
        if(data.user==='')    
        {
            alert("¡ usuario necesario !");
            return false;
        }
        else if(data.password==='')    
        {
            alert("¡ contraseña necesaria !");
            return false;
        } 
        */  
        
        return true;
    }


    return (
        <React.Fragment>

            <div class='container'>
               
               <Menu/>

               <div class='pnlMiCuenta'>                    
               
                    <form class='frmMiCuenta'>

                        RFC: <input type='text' id='rfc' {...register("rfc")} />                        
                        <br/>
                        NOMBRE:<input type='text' id='nombre' {...register("nombre")} />                        
                        <br/>
                        FIEL:<input type='text' id='nombre' {...register("nombre")} />                        
                        <br/>
                        FIRMA:<input type='text' id='nombre' {...register("nombre")} />                        
                        <br/>
                        CONTRASEÑA:<input type='text' id='nombre' {...register("nombre")} />                        
                        <br/>
                        <br/>
                        

                        <button id='button' onClick={handleSubmit(OnSubmit)}> Guardar </button>

                    </form> 

               </div>

            </div>

        </React.Fragment>
    )
}

export default Cuenta;