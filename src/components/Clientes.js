import React, { useState, useEffect } from 'react';
import Utils, { Menu, ClienteRenglon, ClienteTitulo, ClientePaginacion} from "./Utils";
import { useNavigate, useLocation } from 'react-router-dom'
import Wrapper from './Wrapper';
import { Alert, Button, Dialog } from './Controles';

function Clientes() 
{       
    const location = useLocation();  
    const navigate = useNavigate(); 
    
    const [Clientes, setCliente] = useState([]);
    const [Sesion, setSesion] = useState({clave: 0, nombre: '', correo: '', password: '', membresia: 1, recordarme: false });
    const [isOpen, setOpen] = useState(false);

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
        const lsNombre = event.currentTarget.getAttribute('nombre');
        
        //alert('Borrar | Sesion: ' + Sesion.clave + ' - Cliente: ' + lsNombre);
        //navigate('/clientes');

        var lbRespueta = window.confirm("¿Este seguro de borrar al cliente " + lsNombre + "?");
        if (lbRespueta) 
        {         
            //alert('YES !');
            Wrapper.delete(`Clientes/${Sesion.clave}, ${llCliente}`)
            .then(response => 
            {
                //alert('Cliente borrado con éxito ! '); 
                LlenaClientes(); 
            }).catch(error => { alert(error);});
        }
        else 
        {
            //alert('NO !');
        }        
    } 

    useEffect(() => 
    {
        ObtenerSesion();
        LlenaClientes(); 
    }, []);  



    const AbrirAlerta = () => 
    {
        //alert('AbrirAlerta !');
        setOpen(true);
    }; 

    const Confirmacion = () => 
    {
        //alert('Confirmacion !');
        setOpen(false);
    };   

    const Cancelar = () => 
    {
        //alert('Cancelar !');
        setOpen(false);
    };   


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

                    <Dialog message='¿Deseas borrar este cliente?' isOpen={isOpen} handlerYes={Confirmacion} handlerNo={Cancelar} />
                  
                    <div class='contenido'>
                        <ClienteTitulo />
                        <div class='renglones'>
                            {Clientes.map(cliente => (<ClienteRenglon id={cliente.clI_CLAVE} rfc={cliente.clI_RFC} nombre={cliente.clI_NOMBRE} handlerEdit={OnEdit} handlerDelete={OnDelete} /> ))}
                        </div>
                        <ClientePaginacion />
                    </div>

                    <br/>
                    <Button name='btnTest' text='Prueba' className='custom-button' handlerSubmit={AbrirAlerta} />

                </div>                
            
            </div>

        </React.Fragment>
    )
}

export default Clientes;