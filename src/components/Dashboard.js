import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { Cargando } from './Cargando';
import Wrapper from './Wrapper';

import Utils, { Menu, Movimiento, MovimientoTitulo, MovimientoRenglon, MovimientoTotal, ComboCliente, ComboAno, ComboMes } from "./Utils";
import Controles, { Button, Password, TextBox, CheckBox, Input, Select } from "./Controles";

import { useConfirm } from './ConfirmationContext';
import { useAlert } from './AlertContext';
import { useToast } from './ToastContext';
import { AyuFacturas } from './ayuFacturas';

function Dashboard() 
{   
    const {register, handleSubmit, setValue, reset, formState: { errors }} = useForm();
    const location = useLocation();  

    const [Clientes, setCliente] = useState([]);
    const [Facturas, setFactura] = useState([]);
    const [gdCargo, setCargo] = useState(0);
    const [gdAbono, setAbono] = useState(0);
    const [isOpenFacturas, setAyudaFacturas] = useState(false);
    
    const [Sesion, setSesion] = useState();
    
    const [isLoading, setLoading] = useState(false);
    const [messageDialog, SetMessageDialog] = useState('Cargando, espere ...');    

    const [Archivos, setArchivo] = useState([]);
    const [Solicitud, setSolicitud] = useState();
    const [Paquetes, setPaquete] = useState();

    const confirmation = useConfirm();
    const Toast = useToast();
    const Alert = useAlert();

    function abrirAyuda()
    {
        //alert('abrirAyuda !');
        //setAyudaFacturas(true)
        SAT_Verificacion_Descarga();
    }

    function cerrarAyuda()
    {
        //alert('cerrarAyuda !');
        setAyudaFacturas(false)
    } 

    function LeerArchivos(cliente, ano, mes)
    {        
        //alert('LeerArchivos | cliente: ' + cliente);
        var rfc = buscarClienteRFC(cliente);
        var lsPaquete = Paquetes;
        alert('LeerArchivos | rfc: ' + rfc + " - Paquete: " + Paquetes + " - Año: " + ano + " - Mes: " + mes);
                
        Wrapper.get(`Archivo/Archivos?usuario=${Sesion.clave}&cliente=${rfc}&paquete=${lsPaquete}&Ano=${ano}&Mes=${mes}`)
        .then(async response =>         
        {            
            setArchivo(response.data);            
            var arrArchivos = response.data;
            
            alert('archivos: ' + arrArchivos.length);  

            for(let pos = 0; pos < 1; pos++)
            {
                var factura = arrArchivos[pos];
                //await LeerXML(factura.arC_NOMBRE);
                //alert('factura: ' + factura.arC_NOMBRE); 
            }            

            //var factura1 = response.data[0];
            // await LeerXML(factura1.arC_NOMBRE);            

            //alert('facturas: ' + factura2.arC_NOMBRE); 
        })
        .catch(error => { alert(error);});        
    }

    async function LeerXML(psFileXML)
    {
        //alert('LeerXML: ' + psFileXML);
        var lsUsuario = "usuario_1";
        var lsRFC = "IATG9306278W9";
        var lsPaquete = "84FC3A97-21DC-459D-BBBB-E6193304DF9D_01";
        var liAno = 2024;
        var liMes = 1;

        var llCliente = 4;
        var liTipo = 1;    //  1: Emitidas  2: Recividas

        var lsFilePath = process.env.PUBLIC_URL + '/ws/Library/facturas/' + lsUsuario + "/" + lsRFC + "/" + lsPaquete + "/" + psFileXML;    
        alert(lsFilePath);

        const response = await fetch(lsFilePath);
        const xmlText = await response.text();
        //console.log(xmlText);        

        const xmlDoc = new DOMParser().parseFromString(xmlText, "text/xml");

        //const xmlDoc = new XMLParser().parseFromString(xmlText);
        var rootElement = xmlDoc.getElementsByTagName("cfdi:Comprobante");
        //console.log(xmlDoc.getElementsByTagName("cfdi:Comprobante")[0]);

        var atrCondicionesDePago = rootElement[0].attributes['CondicionesDePago'];            
        //var atrFecha = rootElement[0].attributes['Fecha'];
        var atrFolio = rootElement[0].attributes['Folio'];            
        var atrTotal = rootElement[0].attributes['Total'];            
        //console.log("Fecha: " + atrFecha.value);
        console.log("Folio: " + atrFolio.value);            
        console.log("atrTotal: " + atrTotal.value);

        
        /*********************** SECCIONES *********************/ 

        //console.log(xmlDoc.children[0].children[0]); // EMISOR
        //console.log(xmlDoc.children[0].children[1]);  // RECEPTOR
        //console.log(xmlDoc.children[0].children[2]);  // CONCEPTOS
        //console.log(xmlDoc.children[0].children[3]);  // IMPUESTOS
        //console.log(xmlDoc.children[0].children[4]);  // COMPLEMENTOS


        /*********************** EMISOR *********************/ 

        //console.log(rootElement[0].getElementsByTagName('cfdi:Emisor')[0]);
        var loEmisor = rootElement[0].getElementsByTagName('cfdi:Emisor')[0];          
        var atrEmisorNombre = loEmisor.attributes['Nombre'];
        console.log("atrEmisorNombre: " + atrEmisorNombre.value);


        /*********************** RECEPTOR *********************/ 

        //console.log(rootElement[0].getElementsByTagName('cfdi:Receptor')[0]);
        var loReceptor = rootElement[0].getElementsByTagName('cfdi:Receptor')[0];          
        var atrReceptorNombre = loReceptor.attributes['Nombre'];
        console.log("atrReceptorNombre: " + atrReceptorNombre.value);


        /*********************** CONCEPTOS *********************/ 

        //console.log(rootElement[0].getElementsByTagName('cfdi:Conceptos')[0].children[0]);
        //var loConceptos = rootElement[0].getElementsByTagName('cfdi:Conceptos')[0].children[0];          
        //var atrCantidad = loConceptos.attributes['Cantidad'];
        //var atrDescripcion = loConceptos.attributes['Descripcion'];
        //var atrValorUnitario = loConceptos.attributes['ValorUnitario'];
        //var atrImporte= loConceptos.attributes['Importe'];
        //console.log("Cantidad: " + atrCantidad);
        //console.log("Descripcion: " + atrDescripcion);
        //console.log("ValorUnitario: " + atrValorUnitario);
        //console.log("Importe: " + atrImporte);


        /************** IMPUESTOS ***************/    

        //console.log(xmlDoc.children[0].children[3]);  // IMPUESTOS
        //console.log(xmlDoc.children[0].children[3].children[0]);  // TRASLADOS
        //console.log(xmlDoc.children[0].children[3].children[0].children[0]);  // TRASLADO

        //console.log(rootElement[0].getElementsByTagName('cfdi:Impuestos')[1]);
        //console.log(rootElement[0].getElementsByTagName('cfdi:Traslados')[0].children[0]);
        //var loImpuestos = rootElement[0].getElementsByTagName('cfdi:Impuestos')[0].children[0];            
        
        var loTraslados = xmlDoc.children[0].children[3].children[0].children[0];
        var atrImpuesto = loTraslados.attributes['Impuesto'];
        var atrImporte = loTraslados.attributes['Importe'];            
        console.log("Impuesto: " + atrImpuesto.value);
        console.log("Importe: " + atrImporte.value);


        /************** COMPLEMENTOS ***************/  

        //console.log(rootElement[0].getElementsByTagName('cfdi:Complemento')[0].children[0]);
        //var loComplemento = rootElement[0].getElementsByTagName('cfdi:Complemento')[0].children[0];            
        //var atrCertificadoSAT = loComplemento.attributes['NoCertificadoSAT'];
        //console.log("NoCertificadoSAT: " + atrCertificadoSAT);
      

        /************** TIMBRE ***************/ 

        //console.log(rootElement[0].getElementsByTagName('tfd:TimbreFiscalDigital')[0]);
        //var loTimbre = rootElement[0].getElementsByTagName('tfd:TimbreFiscalDigital')[0];            
        //var atrNoCertificadoSAT = loTimbre.attributes['NoCertificadoSAT'];
        //var atrUUID = loTimbre.attributes['UUID'];            
        //console.log("NoCertificadoSAT: " + atrNoCertificadoSAT.value);
        //console.log("UUID: " + atrUUID.value);

        
        /********************** GUARDAR FACTURA ********************/ 

        var resGuardar = await GuardaFacturas(llCliente, atrFolio.value, atrEmisorNombre.value, liTipo, atrTotal.value, atrImpuesto.value, atrImporte.value);

    }

    async function GuardaFacturas(plCliente, psFolio, psDescripcion, piTipo, pdImporte, psImpuesto, pdImpuestoImporte)
    {
        //alert('GuardaFacturas | clientes: ' + plCliente + ' - Folio: ' + psFolio);        
        
        try
        {
            let res = await Wrapper.post(`Facturas/agregar`, { faC_USUCVE: Sesion.clave, faC_CLICVE: plCliente, faC_CLAVE: 0, faC_FOLIO: psFolio, faC_DESCRIPCION: psDescripcion, faC_TIPO: piTipo, faC_IMPORTE: pdImporte, faC_FECHA: null, faC_IMPUESTO: psImpuesto, faC_IMPUESTO_IMPORTE: pdImpuestoImporte });
            let { data } = res.data;
            Toast('Factura agregada');
            LlenaFacturas(plCliente, data.cbxAno, data.cbxMes);  
        }
        catch (error) 
        {
            // Handle errors

        }

        /*
        Wrapper.post(`Facturas/agregar`, { faC_USUCVE: Sesion.clave, faC_CLICVE: plCliente, faC_CLAVE: 0, faC_FOLIO: psFolio, faC_DESCRIPCION: psDescripcion, faC_TIPO: piTipo, faC_IMPORTE: pdImporte, faC_FECHA: null, faC_IMPUESTO: psImpuesto, faC_IMPUESTO_IMPORTE: pdImpuestoImporte })
        .then(response => 
        {
            Toast('Factura agregada');
            LlenaFacturas(2);         
        }).catch(error => { alert(error);});
        */
    }
    
    function Imprimir()
    {
        alert('Imprimir !'); 
    }
   
    function ObtenerSesion()
    {
        //alert('ObtenerSesion ! ');
        var loUsuario = JSON.parse(localStorage.getItem('usuario'));
        if (loUsuario) 
        {
            setSesion(loUsuario);
            //alert('ObtenerSesion: ' + loUsuario.clave);
            LlenaClientes(loUsuario.clave); 
        }
        //alert('Sesion | Clave ' + Sesion.clave + ' - Nombre: ' + Sesion.nombre + ' - Plan: ' + Sesion.membresia);
    }

    function LlenaClientes(usuario)
    {
        //alert('LlenaClientes ! ');
        Wrapper.get(`Clientes/comboCliente?piUsuario=${usuario}`)        
        .then(response => { setCliente(response.data); })
        .catch(error => { alert(error);});

        //Wrapper.get(`Clientes`).then(response => { setCliente(response.data); })
        //.catch(error => { alert(error);});
    }

    function LlenaFacturas(cliente, ano, mes)
    {        
        var llFolio = 0;

        //alert('LlenaFacturas | cliente: ' + cliente + " - ano: " + ano + " - mes: " + mes);
        Wrapper.get(`Facturas/facturas?piUsuario=${Sesion.clave}&plCliente=${cliente}&piAno=${ano}&piMes=${mes}&plFolio=${llFolio}&piStatus=1`)
        .then(response =>
        {
            //alert('LlenaFacturas | registros: ' + response.data.length);  
            setFactura(response.data); 
            HazCuentas(response.data);
        })
        .catch(error => { alert(error);});        
    }

    function HazCuentas(paFacturas)
    {
        //alert('HazCuentas | Facturas ' + paFacturas.length); 

        var ldCargo = 0.0;
        var ldAbono = 0.0;
        var i;
       
        for(i=0; i < paFacturas.length; i++)
        {
            //alert('Facturas | cargo: ' + paFacturas[i].faC_IMPORTE); 
            if(paFacturas[i].faC_TIPO==2)
            {
                ldCargo = ldCargo + parseFloat(paFacturas[i].faC_IMPUESTO_IMPORTE);
            }

            if(paFacturas[i].faC_TIPO==1)
            {
                ldAbono = ldAbono + parseFloat(paFacturas[i].faC_IMPUESTO_IMPORTE);
            }           
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

    function handlerCbxCliente(data, event)
    {
        //alert('Cliente | data: ' + data.cbxMes  + " - value: " + event.target.value); 
        LlenaFacturas(event.target.value, data.cbxAno, data.cbxMes);
    }

    function handlerCbxAno(data, event)
    {
        //alert('Año | value' + event.target.value + " - cliente: " + data.cbxCliente); 
        LlenaFacturas(data.cbxCliente, event.target.value, data.cbxMes);
    }

    function handlerCbxMes(data, event)
    {
        //alert('Mes | value' + event.target.value + " - cliente: " + data.cbxCliente); 
        LlenaFacturas(data.cbxCliente, data.cbxAno, event.target.value);
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
                LlenaFacturas(llCliente, 2024, 2);
            }).catch(error => { alert(error);});
        }
    } 

    function OnView(event)
    { 
        const liUsuario = event.currentTarget.getAttribute('usuario');
        const llCliente = event.currentTarget.getAttribute('cliente');
        const llFactura = event.currentTarget.getAttribute('factura');
        const lsFolio = event.currentTarget.getAttribute('folio');
        const liTipo = event.currentTarget.getAttribute('tipo');
        
        //alert('OnView | Usuario: ' + liUsuario + ' - Cliente: ' + llCliente + ' - factura: ' + llFactura + ' - tipo: ' + liTipo);
        const windowFeatures = "left=100,top=100,width=800,height=800";        
        const handle = window.open(process.env.PUBLIC_URL + "ws/Library/facturas/factura" + lsFolio + ".pdf", "_blank", windowFeatures);
                
        if (!handle) 
        {

        }   
    }   

    const targetYears = [ {value:2020, display: "2020"}, {value:2021, display: "2021"}, {value:2022, display: "2022"}, {value:2023, display: "2023"}, {value:2024, display: "2024"}];
    const targetMonths = [
        {value:"01", display: "ENERO"}, 
        {value:"02", display: "FEBRERO"}, 
        {value:"03", display: "MARZO"}, 
        {value:"04", display: "ABRIL"}, 
        {value:"05", display: "MAYO"}, 
        {value:"06", display: "JUNIO"}, 
        {value:"07", display: "JULIO"}, 
        {value:"08", display: "AGOSTO"}, 
        {value:"09", display: "SEPTIEMBRE"}, 
        {value:"10", display: "OCTUBRE"}, 
        {value:"11", display: "NOVIEMBRE"}, 
        {value:"12", display: "DICIEMBRE"}];
  

    useEffect(() => 
    { 
        ObtenerSesion();     
        setValue("cbxAno", 2024);
        setValue("cbxMes", "02");
    }, []);  


    async function SAT_Verificacion_Descarga(cliente, idSolicitud, ano, mes)
    {  
        //alert('SAT_Verificacion_Descarga | cliente: ' + cliente + " - solicitud: " + idSolicitud);
        var emisor = buscarClienteRFC(cliente);
        //alert('SAT_Verificacion_Descarga | rfc: ' + emisor);
        
        try
        {
            let res = await Wrapper.post(`Archivo/SatVerificacionDescarga`, { soL_ID: 0, soL_CODIGO: idSolicitud, soL_USUARIO: Sesion.clave, soL_RFC_EMISOR: "IATG9306278W9", soL_RFC_RECEPTOR: "", soL_FECHA_INICIAL: "2023-02-01", soL_FECHA_FINAL: "2023-03-20", soL_TIPO: 1 });
            let { data } = res.data;
            
            setPaquete(res.data);
            console.log(res.data);

            Toast('Verificacion realizada');             
        }
        catch (error) 
        {
            // Handle errors
            console.log(error);
        }        
    }

    async function OnVerificacion(data)
    {           
        // VERIFICACION DESCARGA MASIVA
        SAT_Verificacion_Descarga(data.cbxCliente, Solicitud, data.cbxAno, data.cbxMes);           
        Toast('Orden Enviada');        
    }  

    function buscarClienteRFC(cliente_id)
    {
        //alert("buscar cliente: " + cliente);
        for(let pos=0; pos < Clientes.length; pos++)
        {
            var actualCliente = Clientes[pos];
            if(actualCliente.clI_CLAVE == cliente_id)
            {
                return actualCliente.clI_RFC;
            }
        }

        return "";
    }

    async function SAT_Solicitud_Descarga(cliente, ano, mes)
    {  
        //alert('SAT_Solicitud_Descarga: ' + cliente + " - fecha: " + ano + "-" + mes);

        var rfc = buscarClienteRFC(cliente);
        //alert('SAT_Solicitud_Descarga | rfc: ' + rfc);

        var fechaInicial = ano + "-" + mes + "-01";
        var fechaFinal = ano + "-" + mes + "-01";
        //alert('SAT_Solicitud_Descarga: ' + fechaInicial);
        
        try
        {
            let res = await Wrapper.post(`Archivo/SatSolicitudDescarga`, { soL_ID: 0, soL_CODIGO: "", soL_USUARIO: Sesion.clave, soL_RFC_EMISOR: rfc, soL_RFC_RECEPTOR: "", soL_FECHA_INICIAL: fechaInicial, soL_FECHA_FINAL: fechaFinal, soL_TIPO: 1 });
            let { datos } = res.data;              
            
            setSolicitud(res.data.soL_CODIGO);
            console.log(res.data.soL_CODIGO);

            Toast('Solicitud realizada');
        }
        catch (error) 
        {
            // Handle errors
            console.log(error);
        }        
    }

    async function OnSolicitud(data)
    {   
        //alert('OnSubmit ' + data.cbxAno);
        if(validateForm(data)===true)
        {
            // SOLICITUD DESCARGA MASIVA
            SAT_Solicitud_Descarga(data.cbxCliente, data.cbxAno, data.cbxMes);
            //setSolicitud("Hola mundo !");
            Toast('Orden Enviada');
        }
    }      

    async function OnLeerArchivos(data)
    {   
        //SetMessageDialog("Leyendo Archvos XML");
        //setLoading(!isLoading);

        if(validateForm(data)===true)
        {            
            // LEER FACTURAS XML Y GUARDARLAS
            LeerArchivos(data.cbxCliente, data.cbxAno, data.cbxMes);
            Toast('Leyendo Archivos');  
        }
    } 

    
    function validateForm(data)
    {        
        //alert("validateForm | cbxCliente: " + data.cbxCliente);

        if(data.cbxCliente === '0' || data.cbxCliente === undefined)
        {
            //alert("¡ Seleccione Cliente !");
            Toast('Seleccione Cliente');     
            return false;
        }
        
        return true;
    } 

    return (

        <React.Fragment>

            <div class='container'>
                           
                <Menu path={location.pathname} />

                <div class='pnlMovimientos'>

                    <form class='frmFacturas'>

                        <div class='pnlFiltros'>                            
                            <Select name='cbxCliente' className='comboCliente' options={Clientes} value='clI_CLAVE' descripcion='clI_NOMBRE' FirstElement={ {value:0, display: "SELECCIONE CLIENTE" } } handlerChange={handleSubmit(handlerCbxCliente)} register={register} />
                            <Select name='cbxAno' className='comboAno' options={targetYears} value='value' descripcion='display' handlerChange={handleSubmit(handlerCbxAno)} register={register} />
                            <Select name='cbxMes' className='comboMes' options={targetMonths} value='value' descripcion='display' handlerChange={handleSubmit(handlerCbxMes)} register={register} />
                        </div>

                        <div class='pnlFacturas'>
                            
                            <AyuFacturas isOpen={isOpenFacturas} handler={cerrarAyuda} />

                            <MovimientoTitulo />
                            <div class='renglones'>
                                { Facturas.map(factura =>(<Movimiento usuario={factura.faC_USUCVE} cliente={factura.faC_CLICVE} factura={factura.faC_CLAVE} folio={factura.faC_FOLIO} descripcion={factura.faC_DESCRIPCION} tipo={factura.faC_TIPO} importe={factura.faC_IMPORTE} impuesto={factura.faC_IMPUESTO} impuestoImporte={factura.faC_IMPUESTO_IMPORTE} handlerBorrar={OnDelete} handlerVer={OnView} /> )) }                        
                                <MovimientoRenglon className='input-underline input' register={register} errors={errors} />
                            </div>
                            <MovimientoTotal totalCargo={gdCargo} totalAbono={gdAbono} />
                            <br />
                            
                            <p align="center">                  

                                <Cargando message={messageDialog} isOpen={isLoading} />

                                <Button name='btnEmitidas' text='Emitidas' className ='btnTest' handlerSubmit={handleSubmit(OnSolicitud)} />
                                <Button name='btnRecibidas' text='Recibidas' className ='btnTest' handlerSubmit={handleSubmit(OnSolicitud)} /> 
                                <Button name='btnDescarga' text='Descarga' className ='btnTest' handlerSubmit={handleSubmit(OnVerificacion)} />
                                <Button name='btnArchivos' text='Archivos' className ='btnTest' handlerSubmit={handleSubmit(OnLeerArchivos)} />
                                                                                               
                                { 
                                    /*
                                    <Button name='btnAyuda' text='Catalogo' className ='custom-button boton' handlerSubmit={handleSubmit(OnVerificacion)} />
                                    <Button name='btnFacturas' text='FACTURAS' className ='custom-button boton' handlerSubmit={handleSubmit(OnSolicitud)} />
                                    <Button name='btnImprimir' text='IMPRIMIR' className ='custom-button boton' handlerSubmit={handleSubmit(OnLeerArchivos)} />
                                    */
                                }

                                </p>                    

                        </div>    
                    
                    </form>

                </div>                
                
            </div>       

            <center>
                
                Solicitud: {  Solicitud }                
                <br/><br/>

                Paquete: { Paquetes }                
                <br/><br/>

                Archivos: 
                { Archivos.map(archivo =>(  <p> {archivo.arC_NOMBRE} </p> )) }

            </center>

        </React.Fragment>
    )
}

export default Dashboard;

