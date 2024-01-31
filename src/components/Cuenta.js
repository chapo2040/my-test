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
    const [Usuario, setUsuario] = useState([]);

    function LlenaMembresias()
    {
        //alert('LlenaMembresias ! ');
        Wrapper.get(`Membresias`).then(response => { setMembresia(response.data); })
        .catch(error => { alert(error);});
    }

    useEffect(() => { LlenaMembresias(); }, []);  

    function OnSubmit(data)
    {           
        if(validateForm(data)===true)
        {
            //alert('GUARDAR ! ');            

            Wrapper.get(`Usuarios`).then(response => 
            {
                alert('Login | Nombre ' + response.data[0].usU_NOMBRE);   
                //navigate('/dashboard'); 
                //setUsuario(response.data); 
            })
            .catch(error => { alert(error);});

        }
    }  

    function validateForm(data)
    {
        /*
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
        */  
        
        return true;
    }


    return (
        <React.Fragment>

            <div class='container'>
               
                <Menu path={location.pathname} />

               <div class='pnlMiCuenta'>                    
               
                    <form class='frmMiCuenta'>
                                                
                        <div class='frmTitulo'> MI CUENTA </div>   

                        <br/>
                        NOMBRE:<input type='text' value='OSCAR ROMO' id='txtNombre' {...register("nombre")} />                        
                        <br/>
                        CORREO:<input type='text' value='chapo2040@hotmail.com' id='txtCorreo' {...register("correo")} />
                        <br/>
                        CONTRASEÑA:<input type='password' value='123' id='txtPassword' {...register("password")} />
                        <br/>

                        PLAN MEMBRESIA:
                        <select id='cbxPlan' class='paquetes' {...register("plan")}>                            
                            {Membresias.map(membresia =>(            
                                <option value={membresia.mbR_CLAVE}> {membresia.mbR_NOMBRE} </option>
                            ))}
                        </select>
                    
                        <center>
                            <button id='button' class='custom-button submit' onClick={handleSubmit(OnSubmit)}> Guardar </button>
                        </center>

                    </form> 

               </div>

            </div>

        </React.Fragment>
    )
}

export default Cuenta;