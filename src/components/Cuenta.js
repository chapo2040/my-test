import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate, useLocation} from 'react-router-dom';

import Utils, { Menu, Movimiento } from "./Utils";

function Cuenta() 
{       
    const {register, handleSubmit, reset} = useForm();   
    const navigate = useNavigate(); 
    const location = useLocation();  

    function OnSubmit(data)
    {           
        if(validateForm(data)===true)
        {
            alert('GUARDAR ! ');   
            //navigate('/dashboard');
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
               
                <Menu path={location.pathname} />

               <div class='pnlMiCuenta'>                    
               
                    <form class='frmMiCuenta'>
                        
                        <h2> MI CUENTA  </h2>

                        <br/>
                        NOMBRE:<input type='text' value='OSCAR ROMO' id='txtNombre' {...register("nombre")} />                        
                        <br/>
                        CORREO:<input type='text' value='chapo2040@hotmail.com' id='txtCorreo' {...register("correo")} />
                        <br/>
                        CONTRASEÑA:<input type='password' value='123' id='txtPassword' {...register("password")} />
                        <br/>
                        PLAN MEMBRESIA:
                        <select id='cbxPlan' {...register("plan")}>
                            <option value='1'> BASICO </option>
                            <option value='2'> ESTANDART </option>
                            <option value='3'> AVANZADO </option>
                            <option value='4'> PROFESIONAL </option>
                        </select>
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