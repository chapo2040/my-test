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

                <h1 class='title'> Conta Express </h1>   

                <label>                     
                    <img src={imgUser} class='imgUser' />
                    <input type='text' id='username' value='admin' placeholder="usuario" {...register("user")} />
                </label>
                
                <label> 
                    <img src={imgLock} class='imgLock' />
                    <input type='password' id='password'  value='123' placeholder="contraseña" {...register("password")} />
                </label>

                <a href='#' class='link'> Olvide contraseña </a>
                <button id='button' class='submit' onClick={handleSubmit(OnSubmit)}> Login </button>

            </form> 
        </div>
    </React.Fragment>

    )

}

export default Login;