import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import Utils, { Menu, Movimiento, MovimientoTitulo, MovimientoRenglon, MovimientoTotal, ComboCliente, ComboAno, ComboMes } from "./Utils";
import { useLocation } from 'react-router-dom'
import Controles, { Button, Password, TextBox, CheckBox } from "./Controles";
import Wrapper from './Wrapper';

function Dashboard() 
{    
    const {register, handleSubmit, reset} = useForm();
    const location = useLocation();  

    const [Clientes, setCliente] = useState([]);
    const [Facturas, setFactura] = useState([]);
    const [gdCargo, setCargo] = useState(0);
    const [gdAbono, setAbono] = useState(0);
    
    const [Sesion, setSesion] = useState();

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
        Wrapper.get(`Facturas/facturas?piUsuario=${Sesion.clave}&plCliente=${cliente}&plFolio=${llFolio}`).then(response =>         
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

    function AgregarCliente()
    {
        alert('AgregarCliente !'); 
    }

    function TraerFacturas()
    {
        alert('TraerFacturas !');
        
        // RUTINA API SAT
        
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

                        { Facturas.map(factura =>(<Movimiento factura={factura.faC_CLAVE} descripcion={factura.faC_DESCRIPCION} cargo={factura.faC_IMPORTE} abono={factura.faC_IMPORTE} /> )) }                        
                        <MovimientoRenglon className='input-underline input' register={register} validationSchema={{ required: "data required"}}/>
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

