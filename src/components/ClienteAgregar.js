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
    const {register, handleSubmit, setValue, reset, formState: { errors }} = useForm();
    const [file, setFile] = useState();
    const [Sesion, setSesion] = useState({clave: 0, nombre: '', correo: '', password: '', membresia: 1, recordarme: false });
    const [btnTitulo, setTitulo] = useState('Guardar');

    const confirmation = useConfirm();
    const Toast = useToast();
    const Alert = useAlert();

    const navigate = useNavigate(); 
    const {state} = useLocation();
    const location = useLocation();      

    const [isEdit, setEdit] = useState(false);
    const [ClienteClave, setCliente] = useState(0);

    const onButtonClick = () => 
    {
        //alert('onButtonClick !');     

    };

    const handleChangeFIEL = e => 
    {
        //alert('handleChangeFIEL: ' +  e.target.files[0].name);   
        setValue("txtFiel", e.target.files[0].name);
    }    

    const handleChangeKey = e => 
    {
        //alert('handleChangeKey: ' +  e.target.files[0].name);   
        setValue("txtKey", e.target.files[0].name);
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
            setEdit(true);
            setCliente(state.cliente);

            //alert('Cargar Cliente ! ');  
            Wrapper.get(`Clientes/cliente?piUsuario=${piUsuario}&plCliente=${state.cliente}`).then(response => 
            {             
                //alert('Cliente: ' + response.data[0].clI_NOMBRE);
                
                setTitulo('Actualizar');

                reset({
                    txtRFC: response.data[0].clI_RFC,
                    txtNombre: response.data[0].clI_NOMBRE,
                    txtFiel: response.data[0].clI_FIEL,
                    txtKey: response.data[0].clI_KEY,
                    txtPassword: response.data[0].clI_PASSWORD
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
                txtKey: 'archivo.key',
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
            //alert('AGREGAR CLIENTE: ' + isEdit);   
            //navigate('/clientes');
            
            //alert('OnSubmit | Edit: ' + isEdit + " - Cliente: " + ClienteClave);
                       
            if(isEdit===false)
            {
                Wrapper.post(`Clientes/agregar`, { clI_USUCVE: Sesion.clave, clI_RFC: data.txtRFC, clI_NOMBRE: data.txtNombre, clI_FIEL: data.txtFiel, clI_KEY: data.txtKey, clI_PASSWORD: data.txtPassword } )
                .then(response => 
                {
                    //alert('Cliente agregado con éxito ! '); 
                    Toast('Cliente agregado.' );
                    navigate('/clientes');
                }
                ).catch(error => 
                {
                    Alert(String(error));
                });                
            }
            else
            {
                Wrapper.post(`Clientes/actualizar/`, { clI_USUCVE: Sesion.clave, clI_CLAVE: ClienteClave, clI_RFC: data.txtRFC, clI_NOMBRE: data.txtNombre, clI_FIEL: data.txtFiel, clI_KEY: data.txtKey, clI_PASSWORD: data.txtPassword } )
               .then(response => 
                { 
                     Toast('Cliente actualizado.' );  
                     navigate('/clientes');
                }
                ).catch(error => 
                {
                    Alert(String(error));
                });       
            }            

        }
    }  

    function validateForm(data)
    {
        //alert("validateForm | nombre: " + data.txtNombre);

        if(data.txtRFC == '' || data.txtRFC == undefined)      
        {
            Alert("RFC necesario");
            return false;
        }
        else if(data.txtNombre == '' || data.txtNombre == undefined)
        {
            Alert("Nombre necesario");
            return false;
        }     
        else if(data.txtPassword == '' || data.txtPassword == undefined)    
        {
            Alert("Contraseña necesaria");
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
                        <span className='text-sm'> RFC </span>
                        <TextBox name='txtRFC' placeholder="RFC" className='input-underline input' register={register} validationSchema={{required:"RFC requerido."}} errors={errors} />

                        <span className='text-sm'> NOMBRE </span>
                        <TextBox name='txtNombre' placeholder="Nombre" className='input-underline input' register={register} validationSchema={{required:"Nombre requerido."}} errors={errors} />
                        
                        <span className='text-sm'> FIEL </span>
                        <div class='renglon-file-selector'>
                            <div className='textbox'>                                   
                                <TextBox name='txtFiel' placeholder="FIEL" className='input-underline input-field-selector' register={register} validationSchema={{required:"FIEL requerida."}} errors={errors} />
                            </div>
                            <div className='button'>
                                <input type="file" id="btnFiel" accept=".*" onChange={handleChangeFIEL} hidden />
                                <label for="btnFiel" className='custom-file-selector'> Elegir Archivo  </label>
                            </div>
                        </div>                        
                        <br/>

                        <span className='text-sm'> KEY </span>
                        <div class='renglon-file-selector'>
                            <div className='textbox'>
                                <TextBox name='txtKey' placeholder="Key" className='input-underline input-field-selector' register={register} validationSchema={{required:"KEY requerido."}} errors={errors} />
                            </div>
                            <div className='button'>
                                <input type="file" id="btnKey" accept=".*" onChange={handleChangeKey} hidden />
                                <label for="btnKey" className='custom-file-selector'> Elegir Archivo  </label>
                            </div>
                        </div>
                        <br/>                        

                        <span className='text-sm'> CONTRASEÑA </span>
                        <Password name='txtPassword' placeholder="Contraseña" className='input-underline input txtConfiguracion' register={register} validationSchema={{ required: "Contraseña requerida."}} errors={errors} /> 
                                            
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