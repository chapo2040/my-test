import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom';

import axios from 'axios';
import XMLParser from 'react-xml-parser';


import Controles, { Button, Password, TextBox, CheckBox, Input } from "./Controles";
import Wrapper from './Wrapper';

import { useConfirm } from './ConfirmationContext.tsx';
import { useAlert } from './AlertContext.tsx';
import { useToast } from './ToastContext.tsx';

import imgLogo from '../images/logo.jpg'

function Login() 
{
    const {register, handleSubmit, reset, formState: { errors }} = useForm();   
    const navigate = useNavigate(); 

    const confirmation = useConfirm();
    const Toast = useToast();
    const Alert = useAlert();
        
    const [Sesion, setSesion] = useState({});    
    
    function ObtenerSesion()
    {
        //alert('ObtenerSesion ! ');

        var loUsuario = JSON.parse(localStorage.getItem('usuario'));
        if (loUsuario) 
        {
            //alert('loUsuario | Clave ' + loUsuario.clave + ' - Nombre: ' + loUsuario.nombre + ' - Plan: ' + loUsuario.membresia + ' - Recordarme: ' + loUsuario.recordarme);
            if(loUsuario.recordarme===true)
            {                
                //alert('Guardar Sesion ! ');                
                setSesion(loUsuario); 

                reset({
                    txtCorreo: loUsuario.correo,
                    txtPassword: loUsuario.password,
                    chkRecordar: loUsuario.recordarme
                });
            }
        }
    }

    useEffect(() => 
    { 
        ObtenerSesion();    
    }, []);  


    function EnviarLogin(data)
    {
        //alert('EnviarLogin ! ');           
        //Wrapper.ge(`Usuarios/login`, { psCorreo: data.txtCorreo, psPassword: data.txtPassword }).then(response => 
        Wrapper.get(`Usuarios/login?psCorreo=${data.txtCorreo}&psPassword=${data.txtPassword}`).then(response => 
        {
            //alert('Login | Nombre ' + response.data.length);   

            if(response.data.length===0)
            {
                //alert('¡ Usuario y/o Password incorrecto ! ');   
                Alert("Usuario y/o contraseña incorrectos");
            }
            else
            {
                //alert('Login | Sesion.recordarme: ' + Sesion.recordarme);
                //alert('Login | data.chkRecordar: ' + data.chkRecordar);
                //alert('Login | Nombre ' + response.data[0].usU_NOMBRE);
                
                if(data.chkRecordar===true)
                {
                    var loUsuario = 
                    {
                        clave: response.data[0].usU_CLAVE, 
                        nombre: response.data[0].usU_NOMBRE, 
                        correo: data.txtCorreo, 
                        password: data.txtPassword, 
                        membresia: response.data[0].usU_PLAN,
                        recordarme: data.chkRecordar
                    };

                    localStorage.setItem('usuario', JSON.stringify(loUsuario));                
                }
                else
                {
                    localStorage.removeItem('usuario');
                }

                navigate('/dashboard');                 
            }
            
        })
        .catch(error => { alert(error);});
    }
   
    async function OnSubmit(data)
    {   
        //alert('OnSubmit ');   
                
        axios.get(process.env.PUBLIC_URL + '/docs/factura1.xml', {"Content-Type": "application/xml; charset=utf-8"})
        .then((response) => 
         {          
            const xmlDoc = new XMLParser().parseFromString(response.data);
            //console.log('Your xml file as string: ', xmlDoc);
            //console.log(xmlDoc.getElementsByTagName('cfdi:Comprobante'));
            
            var rootElement = xmlDoc.getElementsByTagName("cfdi:Comprobante");
            //console.log("rootElement: " + rootElement.length);

            var atrFecha = rootElement[0].attributes['Fecha'];
            var atrFolio = rootElement[0].attributes['Folio'];
            //console.log("Fecha: " + atrFecha);
            //console.log("Folio: " + atrFolio);

            
            /************** CONCEPTOS ***************/ 

            //console.log(rootElement[0].getElementsByTagName('cfdi:Conceptos')[0].children[0]);
            var loConceptos = rootElement[0].getElementsByTagName('cfdi:Conceptos')[0].children[0];          
            var atrCantidad = loConceptos.attributes['Cantidad'];
            var atrDescripcion = loConceptos.attributes['Descripcion'];
            var atrValorUnitario = loConceptos.attributes['ValorUnitario'];
            var atrImporte= loConceptos.attributes['Importe'];
            //console.log("Cantidad: " + atrCantidad);
            //console.log("Descripcion: " + atrDescripcion);
            //console.log("ValorUnitario: " + atrValorUnitario);
            //console.log("Importe: " + atrImporte);



            /************** IMPUESTOS ***************/    

            //console.log(rootElement[0].getElementsByTagName('cfdi:Impuestos')[0].children[0]);
            console.log(rootElement[0].getElementsByTagName('cfdi:Traslados')[0].children[0]);
            var loImpuestos = rootElement[0].getElementsByTagName('cfdi:Impuestos')[0].children[0];
            
            var loTraslados = rootElement[0].getElementsByTagName('cfdi:Traslados')[0].children[0];
            var atrImporte = loTraslados.attributes['Importe'];
            console.log("Importe: " + atrImporte);



            /************** COMPLEMENTOS ***************/  

            //console.log(rootElement[0].getElementsByTagName('cfdi:Complemento')[0].children[0]);
            //var loComplemento = rootElement[0].getElementsByTagName('cfdi:Complemento')[0].children[0];            
            //var atrCertificadoSAT = loComplemento.attributes['NoCertificadoSAT'];
            //console.log("NoCertificadoSAT: " + atrCertificadoSAT);
          
            /************** TIMBRE ***************/ 
            //console.log(rootElement[0].getElementsByTagName('tfd:TimbreFiscalDigital')[0]);
            //var loTimbre = rootElement[0].getElementsByTagName('tfd:TimbreFiscalDigital')[0];            
            //var SelloSAT = loTimbre.attributes['NoCertificadoSAT'];
            //console.log("NoCertificadoSAT: " + SelloSAT);


         });        

        //alert('OnSubmit | isOpenDialog: ' + isOpen);
        //alert('OnSubmit | chkRecordar: ' + data.chkRecordar);
        
        //confirmationDialog('¿Desea eliminar este cliente?', GuardarDato);        
        //Alert('¡ Cliente eliminado !');
        //Toast('Cliente eliminado' );

        /*
        const choice = await confirmation('¿Esta seguro de borrar al cliente ?');
        if (choice){ Toast('¡ Cliente eliminado !' ); }
        else { Toast('¡ Cancelar !' ); }
        */        

        /*
        if(validateForm(data)===true)
        {
            //alert('Login ok !');
            EnviarLogin(data);            
        }
        */
    }

    function validateForm(data)
    {
        if(data.txtCorreo==='' || data.txtCorreo === undefined)    
        {
            //alert("¡ Correo necesario !");
            Alert("¡ Correo necesario !");
            return false;
        }
        else if(data.txtPassword==='' || data.txtPassword === undefined)    
        {
            //alert("¡ contraseña necesaria !");
            Alert("¡ Contraseña necesaria !");
            return false;
        }   
        
        return true;
    }

    function handleChange(event)
    {           
        //alert('handleChange: ' + event);
        setSesion({recordarme:!Sesion.recordarme});
    } 

    return (

    <React.Fragment>
        

        <div class='pnlLogin'>
            
            <form class='frmLogin'>

                <center> <img src={imgLogo} class='logo' /> </center>

                <label>                     
                    <text class='font-sans text-base'> Correo </text>                  
                    <TextBox name='txtCorreo' placeholder="Correo" className='input-underline input' register={register} validationSchema={{required:"Correo requerido.", pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/}} errors={errors} />
                </label>
                
                <label> 
                    <text class='font-sans text-base'> Contraseña </text>
                    <Password name='txtPassword' placeholder="Contraseña" className='input-underline input' register={register} validationSchema={{ required: "Contraseña requerida."}} errors={errors} />                    
                </label>

                <div class='chkLogin'>
                    <CheckBox name='chkRecordar' text='Recordarme' className ='custom-check' handler={handleChange} register={register} />
                    <div> <a href='#' class='olvido'> ¿Olvido contraseña? </a> </div>
                </div>

                <br/>
                
                <Button name='btnLogin' text='LOGIN' className ='custom-button submit' handlerSubmit={handleSubmit(OnSubmit)} />

                <div>
                <text class='font-sans text-sm'> ¿No tienes cuenta? </text>  <a href='#' class='link'> Registrarse </a>
                </div>
                 
                { /* Sesion | Clave: {Sesion.clave} - nombre: {Sesion.nombre} - correo: {Sesion.correo} - password: {Sesion.password} - membresia: {Sesion.membresia} -  recordarme: {String(Sesion.recordarme)} */}

            </form> 

        </div>       

    </React.Fragment>

    )

}

export default Login;