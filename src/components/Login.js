import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom';
import Controles, { Button, Password, TextBox, CheckBox, Input } from "./Controles";
import Wrapper from './Wrapper';

import imgLogo from '../images/logo.jpg'


function Login() 
{
    const {register, handleSubmit, reset, formState: { errors }} = useForm();   
    const navigate = useNavigate(); 
    const [Usuario, setUsuario] = useState([]);

    function EnviarLogin(data)
    {
        //alert('EnviarLogin ! ');           
        //Wrapper.ge(`Usuarios/login`, { psCorreo: data.txtUsuario, psPassword: data.txtPassword }).then(response => 
        Wrapper.get(`Usuarios/login?psCorreo=${data.txtUsuario}&psPassword=${data.txtPassword}`).then(response => 
        {
            //alert('Login | Nombre ' + response.data.length);   

            if(response.data.length===0)
            {
                alert('Usuario y/o Password incorrecto ! ');   
            }
            else
            {
                //alert('Login | Nombre ' + response.data[0].usU_NOMBRE);   
                //setUsuario(response.data);  
                navigate('/dashboard'); 
            }
            
        })
        .catch(error => { alert(error);});
    }
    
    function OnSubmit(data)
    {           
        //alert('OnSubmit | user: ' + data.txtUsuario);

        if(validateForm(data)===true)
        {
            //alert('Login ok !');
            EnviarLogin(data);            
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
                    <TextBox name='txtUsuario' placeholder="usuario" value="chapo2040@hotmail.com" className='input-underline input' register={register} validationSchema={{ required: "user required"}} />
                </label>
                
                <label> 
                    <text class='font-sans text-base'> Contraseña </text> <br/>
                    <Password name='txtPassword' placeholder="contraseña" value="123" className='input-underline input' register={register} validationSchema={{ required: "password required"}} />                    
                </label>

                <div class='chkLogin'>                        
                    <CheckBox name='chkRecordar' text='Recordarme' className ='custom-check' />
                    <div> <a href='#' class='olvido'> ¿Olvido contraseña? </a> </div>
                </div>

                <br/>
                
                <Button name='btnLogin' text='LOGIN' className ='custom-button submit' handlerSubmit={handleSubmit(OnSubmit)} />

                <div>
                <text class='font-sans text-sm'> ¿No tienes cuenta? </text>  <a href='#' class='link'> Registrarse </a>
                </div>

            </form> 
        </div>
    </React.Fragment>

    )

}

export default Login;