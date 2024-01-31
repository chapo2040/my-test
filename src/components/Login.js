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

    const [Sesion, setSesion] = useState({
                                    clave: 0, 
                                    nombre: '', 
                                    correo: '', 
                                    password: '', 
                                    membresia: 1,
                                    recordarme: false
                                });
    
    function ObtenerSesion()
    {
        //alert('ObtenerSesion ! ');

        var loUsuario = JSON.parse(localStorage.getItem('usuario'));
        if (loUsuario) 
        {
            //alert('loUsuario | Clave ' + loUsuario.clave + ' - Nombre: ' + loUsuario.nombre + ' - Plan: ' + loUsuario.membresia + ' - Recordarme: ' + loUsuario.recordarme);
            if(loUsuario.recordarme===true)
            {                
                //alert('Guardar Sesion ! ');
                //loUsuario.correo = "Pedro@hotmail.com";
                setSesion(loUsuario); 
            }
        }
    }

    useEffect(() => 
    { 
        ObtenerSesion();    
    }, []);  


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
                alert('Login | recordarme ' + Sesion.recordarme);
                //alert('Login | Nombre ' + response.data[0].usU_NOMBRE);
                
                if(Sesion.recordarme===true)
                {
                    var loUsuario = 
                    {
                        clave: response.data[0].usU_CLAVE, 
                        nombre: response.data[0].usU_NOMBRE, 
                        correo: data.txtUsuario, 
                        password: data.txtPassword, 
                        membresia: response.data[0].usU_PLAN,
                        recordarme: Sesion.recordarme
                    };

                    localStorage.setItem('usuario', JSON.stringify(loUsuario));                
                }
                else
                {
                    localStorage.removeItem('usuario');
                }

                navigate('/dashboard');                 
            }
            
        })
        .catch(error => { alert(error);});
    }
    
    function OnSubmit(data)
    {           
        //alert('OnSubmit | chkRecordar: ' + data.chkRecordar);
        
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

    function handleChange(event)
    {           
        //alert('handleChange: ' + event);
        setSesion({recordarme:!Sesion.recordarme});
    } 

    return (

    <React.Fragment>
        
        <div class='pnlLogin'>
            
            <form class='frmLogin'>

                <center> <img src={imgLogo} class='logo' /> </center>

                <label>                     
                    <text class='font-sans text-base'> Correo </text> <br/>                    
                    <TextBox name='txtUsuario' placeholder="usuario" defaultValue={Sesion.correo} className='input-underline input' register={register} validationSchema={{ required: "user required"}} />
                </label>
                
                <label> 
                    <text class='font-sans text-base'> Contraseña </text> <br/>
                    <Password name='txtPassword' placeholder="contraseña" defaultValue={Sesion.password} className='input-underline input' register={register} validationSchema={{ required: "password required"}} />                    
                </label>

                <div class='chkLogin'>

                     <div class='custom-check'>    
                      <label> <input type="checkbox" id='chkRecordar' {...register('chkRecordar')} checked={Sesion.recordarme} onChange={handleChange} /> Recordarme </label>
                    </div>   

                    <div> <a href='#' class='olvido'> ¿Olvido contraseña? </a> </div>
                </div>

                <br/>
                
                <Button name='btnLogin' text='LOGIN' className ='custom-button submit' handlerSubmit={handleSubmit(OnSubmit)} />

                <div>
                <text class='font-sans text-sm'> ¿No tienes cuenta? </text>  <a href='#' class='link'> Registrarse </a>
                </div>

                Sesion | Clave: {Sesion.clave} - nombre: {Sesion.nombre} - correo: {Sesion.correo} - password: {Sesion.password} - membresia: {Sesion.membresia} -  recordarme: {String(Sesion.recordarme)}

            </form> 
        </div>
    </React.Fragment>

    )

}

export default Login;