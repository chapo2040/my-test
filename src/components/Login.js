import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom';

import imgUser from '../images/user.png'
import imgLock from '../images/lock.png'

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
            <form>

                <text class='title'>Conta Express</text>
                <br/>

                <label>                     
                    <img src={imgUser} class='imgUser' />
                    <input type='text' id='username' value='admin' placeholder="usuario" {...register("user")} />
                </label>
                
                <label> 
                    <img src={imgLock} class='imgLock' />
                    <input type='password' id='password'  value='123' placeholder="contraseña" {...register("password")} />                    
                </label>

                <div class='chkLogin'>
                        <input type = "checkbox" checked='true' name='chkRecordar'/>
                        <span for='chkRecordar'> Recordarme </span>
                </div>

                <br/>
                
                <button id='button' class='submit' onClick={handleSubmit(OnSubmit)}> Login </button>

                <a href='#' class='link'> Olvide contraseña </a>

            </form> 
        </div>
    </React.Fragment>

    )

}

export default Login;