import React, { useState, useEffect } from 'react';
//import Select from "react-select";

import {useForm} from 'react-hook-form'
import {useNavigate, useLocation} from 'react-router-dom';

import Controles, { Button, Password, TextBox, CheckBox, Input, Select } from "./Controles";
import Utils, { Menu, Movimiento } from "./Utils";
import Wrapper from './Wrapper';

function Cuenta() 
{       
    const {register, handleSubmit, reset, formState: { errors }} = useForm();   

    const navigate = useNavigate(); 
    const location = useLocation();  
    
    const [Membresias, setMembresia] = useState([]);
    const [Usuario, setUsuario] = useState({usU_CLAVE: 0, usU_NOMBRE: '', usU_CORREO: '', usU_PASSWORD: '', usU_PLAN: 0, usU_REGISTRO: '' });
    const [Sesion, setSesion] = useState({clave: 0, nombre: '', correo: '', password: '', membresia: 1, recordarme: false });

    function ObtenerSesion()
    {
        //alert('ObtenerSesion ! ');
        var loUsuario = JSON.parse(localStorage.getItem('usuario'));
        if (loUsuario) 
        {
            setSesion(loUsuario); 
            LlenaUsuario();
            //alert('ObtenerSesion | clave: ' + loUsuario.clave + ' - nombre: ' + loUsuario.nombre);
        }
    }    

    function LlenaMembresias()
    {
        //alert('LlenaMembresias ! ');
        Wrapper.get(`Membresias`).then(response => 
        {
             setMembresia(response.data);            
        })
        .catch(error => { alert(error);});
    }

    function LlenaUsuario()
    {
        //alert('LlenaUsuario: ' + Sesion.clave);

        //Wrapper.get(`Usuarios`).then(response => { setUsuario(response.data); })
        Wrapper.get(`Usuarios/usuario?piUsuario=${Sesion.clave}`).then(response => 
        {             
            //alert('Usuario: ' + response.data[0].usU_NOMBRE);
            setUsuario(response.data[0]);

            reset({
                txtNombre: response.data[0].usU_NOMBRE,
                txtCorreo: response.data[0].usU_CORREO,
                txtPassword: response.data[0].usU_PASSWORD,
                cbxMembresia: response.data[0].usU_PLAN,
                txtRegistro: response.data[0].usU_REGISTRO
            });

         })
        .catch(error => { alert(error);});
    }

    useEffect(() => 
    {
        ObtenerSesion();
        LlenaMembresias(); 
    }, []);  

    const OnSubmit = (data) =>
    {     
        //alert('OnSubmit | nombre: ' + data.txtCorreo);
        
        if(validateForm(data)===true)
        {
            //alert('Guardar: ' + Sesion.clave);  
            Wrapper.put(`Usuarios/${Sesion.clave}`, { usU_CLAVE: Sesion.clave, usU_NOMBRE: data.txtNombre, usU_CORREO: data.txtCorreo, usU_PASSWORD: data.txtPassword, usU_PLAN: data.cbxMembresia, usU_REGISTRO: data.txtRegistro})
            .then(response => {  alert('Usuario actualizado ! ');  }).catch(error => { alert(error);});
        }
    }  

    function validateForm(data)
    {        
        //alert("validateForm | nombre: " + data.txtNombre);

        if(data.txtNombre == '' || data.txtNombre == undefined)
        {
            alert("¡ Nombre necesario !");
            return false;
        }
        else if(data.txtCorreo == '' || data.txtCorreo == undefined)    
        {
            alert("¡ Correo necesario !");
            return false;
        }     
        else if(data.txtPassword == '' || data.txtPassword == undefined)    
        {
            alert("¡ Contraseña necesaria !");
            return false;
        } 
        
        return true;
    } 

    return (
        <React.Fragment>

            <div class='container'>
               
                <Menu path={location.pathname} />
            
                <div class='pnlMiCuenta'>                    
               
                    <form class='frmMiCuenta' onSubmit={handleSubmit(OnSubmit)}>
                                                
                        <div class='frmTitulo'> CONFIGURACIÓN </div>   
                        <br/>

                        NOMBRE:                        
                        <TextBox name='txtNombre' placeholder="Nombre" className='input-underline input txtConfiguracion' register={register} validationSchema={{required:"Nombre requerido."}} errors={errors} />                        
                        <br/>

                        CORREO:
                        <TextBox name='txtCorreo' placeholder="Correo" className='input-underline input txtConfiguracion' register={register} validationSchema={{required:"Correo requerido.", pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/}} errors={errors} />
                        <br/>

                        CONTRASEÑA:
                        <Password name='txtPassword' placeholder="Contraseña" className='input-underline input txtConfiguracion' register={register} validationSchema={{ required: "Contraseña requerida."}} errors={errors} /> 
                        <br/>                        

                        PLAN MEMBRESIA:
                        <Select name='cbxMembresia' className='paquetes' options={Membresias} value='mbR_CLAVE' descripcion='mbR_NOMBRE' register={register} />
                        <br/>

                        REGISTRO:
                        <input type='text' id='txtRegistro' className='lblRegistro' disabled {...register("txtRegistro")}/>
                        <br/> 

                        <center>                            
                            <Button name='btnGuardar' text='Guardar' className ='custom-button submit'/>
                        </center>

                        Usuario | Clave: {Usuario.usU_CLAVE} - Nombre: {Usuario.usU_NOMBRE} - Correo: {Usuario.usU_CORREO} - Contraseña: {Usuario.usU_PASSWORD} - Plan: {Usuario.usU_PLAN} - Registro: {Usuario.usU_REGISTRO}

                    </form> 

                </div>            

            </div>

        </React.Fragment>
    )
}

export default Cuenta;