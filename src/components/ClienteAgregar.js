import React, { useState, useRef } from 'react';

import {useForm} from 'react-hook-form'
import {useNavigate, useLocation} from 'react-router-dom';

import Utils, { Menu } from "./Utils";
import imgLupa from '../images/btnLupa.png'

function ClienteAgregar() 
{       
    const {register, handleSubmit, reset} = useForm();   
    const [file, setFile] = useState();

    const navigate = useNavigate(); 
    const location = useLocation();      
    const inputFile = useRef(null);

    const onButtonClick = () => 
    {
        //alert('onButtonClick !');     
        //inputFile.current.click();
        inputFile.current?.click(); 
    };

    const handleChange = e => 
    {
        //alert('handleChange: ' +  e.target.files[0].name);     
        setFile(e.target.files[0].name);
    }

    function BuscarFIEL()
    {           
       alert('BUSCAR FIEL !');   

    } 

    function OnSubmit(data)
    {           
        if(validateForm(data)===true)
        {
            //alert('AGREGAR CLIENTE ! ');   
            navigate('/clientes');
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

               <div class='pnlClienteAgregar'>                    
               
                    <form class='frmClienteAgregar'>
                                                
                        <div class='frmTitulo'> AGREGAR CLIENTE </div>   

                        <br/>
                        RFC:<input type='text' value='ROGO791025CQ1' id='txtRFC' {...register("rfc")} />                                               
                        <br/>
                        NOMBRE:<input type='text' value='OSCAR ROMO' id='txtNombre' {...register("nombre")} />                        
                        <br/>

                        <div>
                            FIEL: <br/>
                            <input type='text' value={file} id='txtFiel' {...register("fiel")} />                                                        
                            <input type="file" ref={inputFile} onChange={handleChange} />
                        </div>

                        <br/>
                        CONTRASEÑA:<input type='password' value='123' id='txtPassword' {...register("password")} />
                        <br/>
                    
                        <center>
                            <button id='button' class='custom-button submit' onClick={handleSubmit(OnSubmit)}> AGREGAR </button>
                        </center>

                    </form> 

               </div>

            </div>

        </React.Fragment>
    )
}

export default ClienteAgregar;