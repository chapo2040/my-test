import React from 'react';
import Utils, { Menu, ClienteRenglon, ClienteTitulo, } from "./Utils";
import { useNavigate, useLocation } from 'react-router-dom'

function Clientes() 
{       
    const location = useLocation();  
    const navigate = useNavigate(); 

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
                    <ClienteRenglon rfc='MIZA0760911RPA' nombre='JUAN DE DIOS MIRANDA ZAZUETA' />
                    <ClienteRenglon rfc='ROGO791025CQ1' nombre='ROMO GUILLEN OSCAR ARMANDO' />

                </div>
            </div>

        </React.Fragment>
    )
}

export default Clientes;