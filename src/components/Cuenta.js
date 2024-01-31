import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate, useLocation} from 'react-router-dom';
import Utils, { Menu, Movimiento } from "./Utils";
import Wrapper from './Wrapper';

function Cuenta() 
{       
    const {register, handleSubmit, reset} = useForm();   
    const navigate = useNavigate(); 
    const location = useLocation();  
    
    const [Membresias, setMembresia] = useState([]);
    const [Usuarios, setUsuario] = useState([]);

    function LlenaMembresias()
    {
        //alert('LlenaMembresias ! ');
        Wrapper.get(`Membresias`).then(response => 
        {
             setMembresia(response.data); 
             LlenaUsuario();
        })
        .catch(error => { alert(error);});
    }

    function LlenaUsuario()
    {
        //alert('LlenaUsuario ! ');
        var liUsuario = 1;

        //Wrapper.get(`Usuarios`).then(response => { setUsuario(response.data); })
        Wrapper.get(`Usuarios/usuario?piUsuario=${liUsuario}`).then(response => { setUsuario(response.data); })
        .catch(error => { alert(error);});
    }

    useEffect(() => { LlenaMembresias(); }, []);  

    function OnSubmit(data)
    {           
        if(validateForm(data)===true)
        {
            //alert('GUARDAR ! ');
            var liUsuario = 1;    
            
            if(validateForm(data)===true)
            {
                Wrapper.put(`Usuarios/${liUsuario}`, { usU_CLAVE: liUsuario, usU_NOMBRE: data.txtNombre, usU_CORREO: data.txtCorreo, usU_PASSWORD: data.txtPassword, usU_PLAN: data.cbxPlan, usU_REGISTRO: data.txtRegistro})
                .then(response => {  alert('Usuario actualizado ! ');  }).catch(error => { alert(error);});
            }
        }
    }  

    function validateForm(data)
    {        
        if(data.txtNombre==='')    
        {
            alert("¡ Nombre necesario !");
            return false;
        }
        else if(data.txtCorreo==='')    
        {
            alert("¡ Correo necesario !");
            return false;
        }     
        
        return true;
    }


    return (
        <React.Fragment>

            <div class='container'>
               
                <Menu path={location.pathname} />
            
                {Usuarios.map(usuario => (
                             
                <div class='pnlMiCuenta'>                    
               
                    <form class='frmMiCuenta'>
                                                
                        <div class='frmTitulo'> MI CUENTA </div>   

                        <br/>
                        NOMBRE:<input type='text' defaultValue={usuario.usU_NOMBRE} id='txtNombre' {...register("txtNombre")} />
                        <br/>
                        CORREO:<input type='text' defaultValue={usuario.usU_CORREO} id='txtCorreo' {...register("txtCorreo")} />
                        <br/>
                        CONTRASEÑA:<input type='password' defaultValue={usuario.usU_PASSWORD} id='txtPassword' {...register("txtPassword")} />
                        <br/>                        
                        PLAN MEMBRESIA:
                        <select id='cbxPlan' class='paquetes' defaultValue={usuario.usU_PLAN} {...register("cbxPlan")}>                            
                            {Membresias.map(membresia =>(            
                                <option value={membresia.mbR_CLAVE}> {membresia.mbR_NOMBRE} </option>
                            ))}
                        </select>                        
                        REGISTRO:<input type='text' defaultValue={usuario.usU_REGISTRO} id='txtRegistro' {...register("txtRegistro")} />
                        <br/> 

                        <center>
                            <button id='button' class='custom-button submit' onClick={handleSubmit(OnSubmit)}> Guardar </button>
                        </center>

                    </form> 

                </div>

                ))}

            </div>

        </React.Fragment>
    )
}

export default Cuenta;