import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import Wrapper from './Wrapper';

import Utils, { Menu, Movimiento, MovimientoTitulo, MovimientoRenglon, MovimientoTotal, ComboCliente, ComboAno, ComboMes } from "./Utils";
import Controles, { Button, Password, TextBox, CheckBox } from "./Controles";

import { useConfirm } from './ConfirmationContext';
import { useAlert } from './AlertContext';
import { useToast } from './ToastContext';

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

    const dir = process.env.PUBLIC_URL + '/docs';

    function TraerFacturas()
    {
        //alert('TraerFacturas !');
        
        // AUTENTIFICARSE A API SAT

        // CHECAR SI YA ESTA EL PAQUETE

        // BAJAR PAQUETE

        // LEER FACTURAS XML Y GUARDARLAS
        //LeerArchivos();
        LeerXML('factura1.xml');
        LeerXML('factura4.xml');
        LeerXML('factura5.xml');
    } 

    function LeerXML(psFileXML)
    {
        //alert('LeerXML: ' + psFileXML);
        var llCliente = 2;
        var liTipo = 1;    //  1: Emitidas  2: Recividas

        fetch(process.env.PUBLIC_URL + '/docs/' + psFileXML) 
        .then((response) => response.text())
        .then((xmlText) => 
        {
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

            GuardaFacturas(llCliente, atrFolio.value, atrEmisorNombre.value, liTipo, atrTotal.value, atrImpuesto.value, atrImporte.value);

        })
        .catch((error) => 
        {
          console.error('Error fetching XML data:', error);
        }); 
    }

    function GuardaFacturas(plCliente, psFolio, psDescripcion, piTipo, pdImporte, psImpuesto, pdImpuestoImporte)
    {
        //alert('GuardaFacturas | clientes: ' + plCliente + ' - Folio: ' + psFolio);        
        
        // RUTINA API SAT
        Wrapper.post(`Facturas/agregar`, { faC_USUCVE: Sesion.clave, faC_CLICVE: plCliente, faC_CLAVE: 0, faC_FOLIO: psFolio, faC_DESCRIPCION: psDescripcion, faC_TIPO: piTipo, faC_IMPORTE: pdImporte, faC_FECHA: null, faC_IMPUESTO: psImpuesto, faC_IMPUESTO_IMPORTE: pdImpuestoImporte })
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
            if(paFacturas[i].faC_TIPO==1)
            {
                ldCargo = ldCargo + parseFloat(paFacturas[i].faC_IMPUESTO_IMPORTE);
            }

            if(paFacturas[i].faC_TIPO==2)
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
        const lsFolio = event.currentTarget.getAttribute('folio');
        const liTipo = event.currentTarget.getAttribute('tipo');
        
        //alert('OnView | Usuario: ' + liUsuario + ' - Cliente: ' + llCliente + ' - factura: ' + llFactura + ' - tipo: ' + liTipo);
        const windowFeatures = "left=100,top=100,width=800,height=800";        
        const handle = window.open(process.env.PUBLIC_URL + "/docs/factura" + lsFolio + ".pdf", "_blank", windowFeatures);
                
        if (!handle) 
        {

        }   
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
                            { Facturas.map(factura =>(<Movimiento usuario={factura.faC_USUCVE} cliente={factura.faC_CLICVE} factura={factura.faC_CLAVE} folio={factura.faC_FOLIO} descripcion={factura.faC_DESCRIPCION} tipo={factura.faC_TIPO} importe={factura.faC_IMPORTE} impuesto={factura.faC_IMPUESTO} impuestoImporte={factura.faC_IMPUESTO_IMPORTE} handlerBorrar={OnDelete} handlerVer={OnView} /> )) }                        
                            <MovimientoRenglon className='input-underline input' register={register} errors={errors} />
                        </div>
                        <MovimientoTotal totalCargo={gdCargo} totalAbono={gdAbono} />
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

