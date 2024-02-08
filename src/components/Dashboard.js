import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import Wrapper from './Wrapper';

import Utils, { Menu, Movimiento, MovimientoTitulo, MovimientoRenglon, MovimientoTotal, ComboCliente, ComboAno, ComboMes } from "./Utils";
import Controles, { Button, Password, TextBox, CheckBox } from "./Controles";

import { useConfirm } from './ConfirmationContext.tsx';
import { useAlert } from './AlertContext.tsx';
import { useToast } from './ToastContext.tsx';

function Dashboard() 
{   
    const {register, handleSubmit, reset, formState: { errors }} = useForm();   
    const location = useLocation();  

    const [Clientes, setCliente] = useState([]);
    const [Facturas, setFactura] = useState([]);
    const [gdCargo, setCargo] = useState(0);
    const [gdAbono, setAbono] = useState(0);
    
    const [Sesion, setSesion] = useState();

    const confirmation = useConfirm();
    const Toast = useToast();
    const Alert = useAlert();

    function ObtenerSesion()
    {
        //alert('ObtenerSesion ! ');
        var loUsuario = JSON.parse(localStorage.getItem('usuario'));
        if (loUsuario) 
        {
            setSesion(loUsuario);
        }
        //alert('Sesion | Clave ' + Sesion.clave + ' - Nombre: ' + Sesion.nombre + ' - Plan: ' + Sesion.membresia);
    }

    function LlenaClientes()
    {
        //alert('LlenaClientes ! ');   
        Wrapper.get(`Clientes`).then(response => { setCliente(response.data); })
        .catch(error => { alert(error);});
    }

    function LlenaFacturas(cliente)
    {        
        var llFolio = 0;

        //alert('LlenaFacturas | cliente: ' + cliente); 
        //Wrapper.get(`Facturas`).then(response =>         
        Wrapper.get(`Facturas/facturas?piUsuario=${Sesion.clave}&plCliente=${cliente}&plFolio=${llFolio}&piStatus=1`).then(response =>         
        {
            //alert('LlenaFacturas | registros: ' + response.data.length);  
            setFactura(response.data); 
            HazCuentas(response.data);
        })
        .catch(error => { alert(error);});        
    }

    useEffect(() => 
    { 
        ObtenerSesion();
        LlenaClientes();        
    }, []);  

    function HazCuentas(paFacturas)
    {
        //alert('HazCuentas | Facturas ' + paFacturas.length); 

        var ldCargo = 0.0;
        var ldAbono = 0.0;
        var i;
       
        for(i=0; i < paFacturas.length; i++)
        {
            //alert('Facturas | cargo: ' + paFacturas[i].faC_IMPORTE); 
            ldCargo = ldCargo + parseFloat(paFacturas[i].faC_IMPORTE);
            ldAbono = ldAbono + parseFloat(paFacturas[i].faC_IMPORTE);
        }    
        
        /*
        paFacturas.forEach((factura, index) => 
        {
            //alert('Facturas | cargo: ' + factura.cargo); 
            ldCargo = ldCargo + parseFloat(factura.cargo);
            ldAbono = ldAbono + parseFloat(factura.abono);
        })
        */

        setCargo(ldCargo);
        setAbono(ldAbono);
    }

    // FORM LOAD 
    //useEffect(() => { LlenaFacturas(facturas1); }, []);

    function handlerCbxCliente(event)
    {
        //alert('Cliente: ' + event.target.value); 
        LlenaFacturas(event.target.value);
    }

    function handlerCbxAno(event)
    {
        alert('Año: ' + event.target.value); 
    }    

    function handlerCbxMes(event)
    {
        alert('Mes: ' + event.target.value); 
    }

    async function OnDelete(event)
    { 
        const liUsuario = event.currentTarget.getAttribute('usuario');
        const llCliente = event.currentTarget.getAttribute('cliente');
        const llFactura = event.currentTarget.getAttribute('factura');
        const liTipo = event.currentTarget.getAttribute('tipo');
        
        //alert('Factura Borrar | Usuario: ' + liUsuario + ' - Cliente: ' + llCliente + ' - factura: ' + llFactura + ' - tipo: ' + liTipo);
        //navigate('/dashboard');        
        
        const choice = await confirmation('¿Esta seguro de borrar la factura ' + llFactura + ' ?');
        
        if (choice) 
        {       
            //Wrapper.delete(`Facturas/${Sesion.clave}, ${llCliente}, ${llFactura}`)                
            //Wrapper.post(`Facturas/actualizar`, { faC_USUCVE: Sesion.clave, faC_CLICVE: llCliente, faC_CLAVE: llFactura, faC_FOLIO: '', faC_DESCRIPCION: '', faC_TIPO: liTipo, faC_IMPORTE: 0, faC_FECHA: null, faC_STATUS: 1 })
            Wrapper.post(`Facturas/actualizar`, { faC_USUCVE: Sesion.clave, faC_CLICVE: llCliente, faC_CLAVE: llFactura, faC_TIPO: liTipo, faC_STATUS: 0 })
            .then(response => 
            {
                //alert('Factura borrada con éxito ! '); 
                Toast('Factura borrada');
                LlenaFacturas(llCliente);
            }).catch(error => { alert(error);});
        }
    } 

    function OnView(event)
    { 
        const liUsuario = event.currentTarget.getAttribute('usuario');
        const llCliente = event.currentTarget.getAttribute('cliente');
        const llFactura = event.currentTarget.getAttribute('factura');
        const liTipo = event.currentTarget.getAttribute('tipo');
        
        //alert('OnView | Usuario: ' + liUsuario + ' - Cliente: ' + llCliente + ' - factura: ' + llFactura + ' - tipo: ' + liTipo);
        const windowFeatures = "left=100,top=100,width=800,height=800";        
        const handle = window.open(process.env.PUBLIC_URL + "/docs/factura1.pdf", "_blank", windowFeatures);
                
        if (!handle) 
        {

        }   
    } 

    function TraerFacturas()
    {
        //alert('TraerFacturas !');
        
        // AUTENTIFICARSE A API SAT

        // CHECAR SI YA ESTA EL PAQUETE

        // BAJAR PAQUETE

        // LEER FACTURAS XML  

        // GUARDAR FACTURAS
        GuardaFacturas();
    }

    function GuardaFacturas()
    {
        //alert('GuardaFacturas !');
        
        // RUTINA API SAT
        Wrapper.post(`Facturas/agregar`, { faC_USUCVE: Sesion.clave, faC_CLICVE: 2, faC_CLAVE: 0, faC_FOLIO: '9483', faC_DESCRIPCION: 'PRUEBA CDFI', faC_TIPO: 1, faC_IMPORTE: 300, faC_FECHA: null })
        .then(response => 
        {
            Toast('Factura agregada');
            LlenaFacturas(2);         
        }).catch(error => { alert(error);});
    }
    
    function Imprimir()
    {
        alert('Imprimir !'); 
    }

    return (

        <React.Fragment>

            <div class='container'>
                           
                <Menu path={location.pathname} />

                <div class='pnlMovimientos'>

                    <div class='pnlFiltros'>
                        <ComboCliente clientes={Clientes} handlerChange={handlerCbxCliente}/>
                        <ComboAno handlerChange={handlerCbxAno}/>
                        <ComboMes handlerChange={handlerCbxMes}/>
                    </div>

                    <div class='pnlFacturas'>
                        
                        <MovimientoTitulo />
                        <div class='renglones'>
                            { Facturas.map(factura =>(<Movimiento usuario={factura.faC_USUCVE} cliente={factura.faC_CLICVE} factura={factura.faC_CLAVE} descripcion={factura.faC_DESCRIPCION} tipo={factura.faC_TIPO} importe={factura.faC_IMPORTE} handlerBorrar={OnDelete} handlerVer={OnView} /> )) }                        
                            <MovimientoRenglon className='input-underline input' register={register} errors={errors} />
                        </div>
                        <MovimientoTotal cargo={gdCargo} abono={gdAbono} />
                        <br />
                        
                        <p align="right">
                            <Button name='btnFacturas' text='FACTURAS' className ='custom-button boton' handlerSubmit={TraerFacturas} />
                            <Button name='btnImprimir' text='IMPRIMIR' className ='custom-button boton' handlerSubmit={Imprimir} />
                        </p>                    

                    </div>    

                </div>
                
            </div>                                    

        </React.Fragment>
    )
}

export default Dashboard;

