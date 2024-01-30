import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom';
import Controles, { Button, Password, TextBox, CheckBox, Input } from "./Controles";

import imgLogo from '../images/logo.jpg'


function Login() 
{
    const {register, handleSubmit, reset, formState: { errors }} = useForm();   
    const navigate = useNavigate(); 
    
    function OnSubmit(data)
    {           
        //alert('OnSubmit | user: ' + data.txtUsuario);

        if(validateForm(data)===true)
        {
            //alert('Login ok !');
            navigate('/dashboard');
        }
    }        

    function validateForm(data)
    {
        if(data.txtUsuario==='' || data.txtUsuario === undefined)    
        {
            alert("¡ usuario necesario !");
            return false;
        }
        else if(data.txtPassword==='' || data.txtPassword === undefined)    
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
                    <TextBox name='txtUsuario' placeholder="usuario" value="admin@contaexpress.com" className='input-underline input' register={register} validationSchema={{ required: "user required"}} />
                </label>
                
                <label> 
                    <text class='font-sans text-base'> Contraseña </text> <br/>
                    <Password name='txtPassword' placeholder="contraseña" value="123" className='input-underline input' register={register} validationSchema={{ required: "password required"}} />                    
                </label>

                <div class='chkLogin'>                        
                    <CheckBox name='chkRecordar' text='Recordarme' checked='true'/>
                    <div> <a href='#' class='olvido'> ¿Olvido contraseña? </a> </div>
                </div>

                <br/>
                
                <Button name='btnLogin' text='LOGIN' class ='custom-button submit' handlerSubmit={handleSubmit(OnSubmit)} />

                <div>
                <text class='font-sans text-sm'> ¿No tienes cuenta? </text>  <a href='#' class='link'> Registrarse </a>
                </div>

            </form> 
        </div>
    </React.Fragment>

    )

}

export default Login;