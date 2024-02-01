import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate, useLocation} from 'react-router-dom';

import Controles, { Button, Password, TextBox, CheckBox, Input } from "./Controles";
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
        var liUsuario = Sesion.clave;

        //Wrapper.get(`Usuarios`).then(response => { setUsuario(response.data); })
        Wrapper.get(`Usuarios/usuario?piUsuario=${liUsuario}`).then(response => 
        {             
            //alert('Usuario: ' + response.data[0].usU_NOMBRE);
            setUsuario(response.data[0]);

            reset({
                nombre: response.data[0].usU_NOMBRE,
                correo: response.data[0].usU_CORREO,
                password: response.data[0].usU_PASSWORD,
                membresia: response.data[0].usU_PLAN,
                registro: response.data[0].usU_REGISTRO
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
        //alert('OnSubmit | nombre: ' + data.correo);
        
        if(validateForm(data)===true)
        {
            //alert('Guardar: ' + Sesion.clave);  
            Wrapper.put(`Usuarios/${Sesion.clave}`, { usU_CLAVE: Sesion.clave, usU_NOMBRE: data.nombre, usU_CORREO: data.correo, usU_PASSWORD: data.password, usU_PLAN: data.membresia, usU_REGISTRO: data.registro})
            .then(response => {  alert('Usuario actualizado ! ');  }).catch(error => { alert(error);});
        }
    }  

    function validateForm(data)
    {        
        //alert("validateForm | nombre: " + data.nombre);

        if(data.nombre == '' || data.nombre == undefined)
        {
            alert("¡ Nombre necesario !");
            return false;
        }
        else if(data.correo == '' || data.correo == undefined)    
        {
            alert("¡ Correo necesario !");
            return false;
        }     
        else if(data.password == '' || data.password == undefined)    
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
                        <input type='text' id='txtNombre' {...register("nombre", {required:true})} />
                        {errors.nombre && errors.nombre.type === "required" && (<p className="errorMsg"> Nombre requerido.</p>)}
                        <br/>

                        CORREO:
                        <input type='text' id='txtCorreo' {...register("correo", {required:true, pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/})} />
                        {errors.correo && errors.correo.type === "required" && (<p className="errorMsg"> Correo requerido.</p>)}
                        {errors.correo && errors.correo.type === "pattern" && (<p className="errorMsg"> Correo no es valido.</p>)}
                        <br/>

                        CONTRASEÑA:
                        <input type='password' id='txtPassword' {...register("password", {required:true})}/>
                        {errors.password && errors.password.type === "required" && (<p className="errorMsg"> Contraseña requerida.</p>)}
                        <br/>                        

                        PLAN MEMBRESIA:
                        <select id='cbxPlan' class='paquetes' {...register("membresia")}>                            
                            {Membresias.map(membresia =>(            
                                <option value={membresia.mbR_CLAVE}> {membresia.mbR_NOMBRE} </option>
                            ))}
                        </select>                        

                        REGISTRO:<input type='text' id='txtRegistro' disabled {...register("registro")}/>
                        <br/> 

                        <center>
                            <button id='button' class='custom-button submit'> Guardar </button>
                        </center>

                        Usuario | Clave: {Usuario.usU_CLAVE} - Nombre: {Usuario.usU_NOMBRE} - Correo: {Usuario.usU_CORREO} - Contraseña: {Usuario.usU_PASSWORD} - Plan: {Usuario.usU_PLAN} - Registro: {Usuario.usU_REGISTRO}

                    </form> 

                </div>            

            </div>

        </React.Fragment>
    )
}

export default Cuenta;