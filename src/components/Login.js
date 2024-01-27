import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom';

import imgUser from '../images/user.png'
import imgLock from '../images/lock.png'
import imgLogo from '../images/logo.jpg'

function Login() 
{
    const {register, handleSubmit, reset} = useForm();   
    const navigate = useNavigate(); 
    
    function OnSubmit(data)
    {           
        if(validateForm(data)===true)
        {
            //alert('Login ok ! ');            
            navigate('/dashboard');
        }
    }        

    function validateForm(data)
    {
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
        
        return true;
    }

    return (

    <React.Fragment>
        
        <div class='pnlLogin'>
            
            <form class='frmLogin'>

                <center> <img src={imgLogo} class='logo' /> </center>

                <label>                     
                    <text class='font-sans text-base'> Correo </text> <br/>
                    <input type='text' id='username' value='admin' placeholder="usuario" class='input-underline input' {...register("user")} />
                </label>
                
                <label> 
                    <text class='font-sans text-base'> Contraseña </text> <br/>
                    <input type='password' id='password' value='123' placeholder="contraseña" class='input-underline input' {...register("password")} />                    
                </label>

                <div class='chkLogin'>
                        <input type = "checkbox" checked='true' name='chkRecordar'/>
                        <span for='chkRecordar'> Recordarme </span>
                        <a href='#' class='olvido'> ¿Olvido contraseña? </a>
                </div>

                <br/>
                
                <button id='button' class='custom-button submit' onClick={handleSubmit(OnSubmit)}> Login </button>

                <div>
                <text class='font-sans text-sm'> ¿No tienes cuenta? </text>  <a href='#' class='link'> Registrarse </a>
                </div>

            </form> 
        </div>
    </React.Fragment>

    )

}

export default Login;