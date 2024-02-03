import React, { useState, useEffect } from 'react';
import Utils, { Menu, ClienteRenglon, ClienteTitulo, } from "./Utils";
import { useNavigate, useLocation } from 'react-router-dom'
import Wrapper from './Wrapper';

function Clientes() 
{       
    const location = useLocation();  
    const navigate = useNavigate(); 
    
    const [Clientes, setCliente] = useState([]);
    const [Sesion, setSesion] = useState({clave: 0, nombre: '', correo: '', password: '', membresia: 1, recordarme: false });

    function ObtenerSesion()
    {
        //alert('ObtenerSesion ! ');
        //alert('navigate | edit: ' + state.edit  + ' - cliente: ' + state.cliente);
        
        var loUsuario = JSON.parse(localStorage.getItem('usuario'));
        if (loUsuario) 
        {
            setSesion(loUsuario); 
            //alert('ObtenerSesion | clave: ' + loUsuario.clave + ' - nombre: ' + loUsuario.nombre);
        }
    }  

    function LlenaClientes()
    {
        //alert('LlenaClientes ! ');
        Wrapper.get(`Clientes`).then(response => { setCliente(response.data); })
        .catch(error => { alert(error);});
    }

    function OnSubmit()
    {           
        //alert('AGREGAR CLIENTE ! ');   
        //navigate('/clienteagregar', { state: { edit:true, cliente: 82 } } );
        navigate('/clienteagregar', { state: { edit:false } } );
    }     

    function OnEdit(event)
    { 
        const llCliente = event.currentTarget.getAttribute('cliente');
        //alert('Cliente Editar | Sesion: ' + Sesion.clave + ' - Cliente: ' + llCliente);        
        navigate('/clienteagregar', { state: { edit:true, cliente: llCliente } } );  
    }  

    function OnDelete(event)
    { 
        const llCliente = event.currentTarget.getAttribute('cliente');
        //alert('Borrar | Sesion: ' + Sesion.clave + ' - Cliente: ' + llCliente);
        //navigate('/clientes');

        Wrapper.delete(`Clientes/${Sesion.clave}, ${llCliente}`)
        .then(response => 
        {
            //alert('Cliente borrado con éxito ! '); 
            LlenaClientes(); 
        }).catch(error => { alert(error);});
    } 

    useEffect(() => 
    {
        ObtenerSesion();
        LlenaClientes(); 
    }, []);  

    return (
        <React.Fragment>

            <div class='container'>               
                <Menu path={location.pathname} />
                <div class='pnlClientes'>     
                                        
                    <div class='pnlSeccion'> 
                        <div class='seccion1'>  CLIENTES  </div>
                        <div class='seccion2'>
                            <button id='button' class='custom-button agregar' onClick={OnSubmit}> + AGREGAR </button>
                        </div>                            
                    </div>
                  
                    <ClienteTitulo />
                    {Clientes.map(cliente => (<ClienteRenglon id={cliente.clI_CLAVE} rfc={cliente.clI_RFC} nombre={cliente.clI_NOMBRE} handlerEdit={OnEdit} handlerDelete={OnDelete} /> ))}
                    

                    
                </div>
            </div>

        </React.Fragment>
    )
}

export default Clientes;