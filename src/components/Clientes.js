import React, { useState, useEffect } from 'react';
import Utils, { Menu, ClienteRenglon, ClienteTitulo, } from "./Utils";
import { useNavigate, useLocation } from 'react-router-dom'
import Wrapper from './Wrapper';

function Clientes() 
{       
    const location = useLocation();  
    const navigate = useNavigate(); 
    
    const [Clientes, setCliente] = useState([]);

    function LlenaClientes()
    {
        //alert('LlenaClientes ! ');
        Wrapper.get(`Clientes`).then(response => { setCliente(response.data); })
        .catch(error => { alert(error);});
    }

    useEffect(() => { LlenaClientes(); }, []);  

    function OnSubmit()
    {           
        //alert('AGREGAR CLIENTE ! ');   
        navigate('/clienteagregar');        
    }     

    return (
        <React.Fragment>

            <div class='container'>               
                <Menu path={location.pathname} />
                <div class='pnlClientes'>     
                                        
                    <div class='pnlSeccion'> 
                        LISTADO DE CLIENTES 
                        <button id='button' class='custom-button agregar' onClick={OnSubmit}> + AGREGAR CLIENTE </button>                       
                    </div>
                  
                    <ClienteTitulo />
                    {Clientes.map(cliente => (<ClienteRenglon rfc={cliente.clI_CLAVE} nombre={cliente.clI_NOMBRE} /> ))}
                    
                </div>
            </div>

        </React.Fragment>
    )
}

export default Clientes;