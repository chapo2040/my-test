import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'

function Login() 
{
    const {register, handleSubmit, reset} = useForm();
       

    function OnSubmit(data)
    {
        
        //if(validateForm(data)===true)
        //{
            //alert('Login ok ! ');            
            window.location.href = "main.html";
        //}
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

            <label> Login </label>
            <form>
                <input type='text' value='admin' placeholder="usuario" {...register("user")} /> <br/>
                <input type='password' value='123' placeholder="contraseña" {...register("password")} /> <br/>
                <button onClick={handleSubmit(OnSubmit)}> Login </button>
            </form> 

        </React.Fragment>
    )

}

export default Login;