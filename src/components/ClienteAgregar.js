import React, { useState, useEffect, useRef } from 'react';

import {useForm} from 'react-hook-form'
import {useNavigate, useLocation} from 'react-router-dom';

import Controles, { Button, Password, TextBox, CheckBox, Input, Select } from "./Controles";
import Utils, { Menu } from "./Utils";
import Wrapper from './Wrapper';

import { useConfirm } from './ConfirmationContext.tsx';
import { useAlert } from './AlertContext.tsx';
import { useToast } from './ToastContext.tsx';

import imgLupa from '../images/btnLupa.png'

function ClienteAgregar() 
{   
    const {register, handleSubmit, reset, formState: { errors }} = useForm();
    const [file, setFile] = useState();
    const [Sesion, setSesion] = useState({clave: 0, nombre: '', correo: '', password: '', membresia: 1, recordarme: false });
    const [btnTitulo, setTitulo] = useState('Guardar');

    const confirmation = useConfirm();
    const Toast = useToast();
    const Alert = useAlert();

    const navigate = useNavigate(); 
    const {state} = useLocation();
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

    function ObtenerSesion()
    {
        //alert('ObtenerSesion ! ');        
        var loUsuario = JSON.parse(localStorage.getItem('usuario'));
        if (loUsuario) 
        {
            setSesion(loUsuario); 
            LlenaCliente(loUsuario.clave);
            //alert('ObtenerSesion | clave: ' + loUsuario.clave + ' - nombre: ' + loUsuario.nombre);
        }
    }   

    function LlenaCliente(piUsuario)
    {
        //alert('LlenaCliente: ' + piUsuario + ' - edit: ' + state.edit  + ' - cliente: ' + state.cliente);

        if(state.edit===true)
        {
            //alert('Cargar Cliente ! ');  
            Wrapper.get(`Clientes/cliente?piUsuario=${piUsuario}&plCliente=${state.cliente}`).then(response => 
            {             
                //alert('Cliente: ' + response.data[0].clI_NOMBRE);
                
                setTitulo('Actualizar');

                reset({
                    txtRFC: response.data[0].clI_RFC,
                    txtNombre: response.data[0].clI_NOMBRE
                });
    
                })
                .catch(error => { alert(error);});
        }
        else
        {
            reset({
                txtRFC: 'CIPE0304004PEE',
                txtNombre: 'cliente 3',
                txtCorreo: 'prueba@hotmail.com',
                txtFiel: 'fiel.cer',
                txtKey: 'fie.key',
                txtPassword: '123'
            });
        }
    }

    useEffect(() => 
    {
        ObtenerSesion();        
    }, []);  

    function OnSubmit(data)
    {           
        if(validateForm(data)===true)
        {
            //alert('AGREGAR CLIENTE: ' + data.txtNombre);   
            //navigate('/clientes');

            if(state.edit===true)
            {
                Wrapper.put(`Clientes/${state.cliente}`, { clI_USUCVE: Sesion.clave, clI_CLAVE: 34,  clI_RFC: data.txtRFC, clI_NOMBRE: data.txtNombre})
               .then(response => {  Toast('Cliente actualizado.' );  }).catch(error => { alert(error);});       
            }
            else
            {
                Wrapper.post(`Clientes`, { clI_USUCVE: Sesion.clave, clI_CLAVE: 34,  clI_RFC: data.txtRFC, clI_NOMBRE: data.txtNombre})
                .then(response => 
                {
                    //alert('Cliente agregado con éxito ! '); 
                    Toast('Cliente agregado.' );
                    navigate('/clientes');
                }).catch(error => { alert(error);});
            }

        }
    }  

    function validateForm(data)
    {
        //alert("validateForm | nombre: " + data.txtNombre);

        if(data.txtRFC == '' || data.txtRFC == undefined)      
        {
            alert("¡ rfc necesario !");
            return false;
        }
        else if(data.txtNombre == '' || data.txtNombre == undefined)
        {
            alert("¡ Nombre necesario !");            
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

               <div class='pnlClienteAgregar'>                    
               
                    <form class='frmClienteAgregar' onSubmit={handleSubmit(OnSubmit)}>
                                                
                        <div class='frmTitulo'> AGREGAR CLIENTE </div>   

                        <br/>
                        RFC                        
                        <TextBox name='txtRFC' placeholder="RFC" className='input-underline input' register={register} validationSchema={{required:"RFC requerido."}} errors={errors} />
                        <br/>

                        NOMBRE
                        <TextBox name='txtNombre' placeholder="Nombre" className='input-underline input' register={register} validationSchema={{required:"Nombre requerido."}} errors={errors} />
                        <br/>

                        <div>
                            FIEL
                            <TextBox name='txtFiel' placeholder="FIEL" className='input-underline input' register={register} validationSchema={{required:"FIEL requerida."}} errors={errors} />
                            <input type="file" ref={inputFile} onChange={handleChange} />
                        </div>
                        <br/>

                        <div>
                            KEY
                            <TextBox name='txtKey' placeholder="Key" className='input-underline input' register={register} validationSchema={{required:"KEY requerido."}} errors={errors} />
                            <input type="file" ref={inputFile} onChange={handleChange} />
                        </div>
                        <br/>

                        CONTRASEÑA
                        <Password name='txtPassword' placeholder="Contraseña" className='input-underline input txtConfiguracion' register={register} validationSchema={{ required: "Contraseña requerida."}} errors={errors} /> 
                        <br/>
                    
                        <center>                            
                            <Button name='btnGuardar' text={btnTitulo} className ='custom-button submit'/>
                        </center>

                    </form> 

               </div>

            </div>

        </React.Fragment>
    )
}

export default ClienteAgregar;