import React from 'react';
import Utils, { Menu, Movimiento, MovimientoTitulo, MovimientoRenglon, MovimientoTotal } from "./Utils";

function Dashboard() 
{
    function handlerCbxCliente(event)
    {
        alert('Cliente: ' + event.target.value); 
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
    }
    
    function GenerarPoliza()
    {
        alert('GenerarPoliza !'); 
    }

    return (

        <React.Fragment>

            <div class='container'>
                           
                <Menu/>

                <div class='pnlMovimientos'>

                    <div class='pnlFiltros'>

                        <select class='comboCliente' onChange={handlerCbxCliente}>
                            <option value="MIZA0506937124"> JUAN DE DIOS MIRANDA ZAZUETA </option>
                            <option value="ROGO791025CQ1">OSCAR ARMANDO ROMO GUILLEN </option>                        
                        </select>

                        <select class='comboAno' onChange={handlerCbxAno}>
                            <option value="2023"> 2023 </option>
                            <option value="2024"> 2024 </option>
                            <option value="2025"> 2025 </option>
                            <option value="2026"> 2026 </option>
                            <option value="2027"> 2027 </option>
                            <option value="2028"> 2028 </option>
                        </select> 

                        <select class='comboMes' onChange={handlerCbxMes}>
                            <option value="1"> ENERO </option>
                            <option value="2"> FEBRERO </option>
                            <option value="3"> MARZO </option>
                            <option value="4"> ABRIL </option>
                            <option value="5"> MAYO </option>
                            <option value="6"> JUNIO </option>
                            <option value="7"> JULIO </option>
                            <option value="8"> AGOSTO </option>
                            <option value="9"> SEPTIEMBRE </option>
                            <option value="10"> OCTUBRE </option>
                            <option value="11"> NOVIEMBRE </option>
                            <option value="12"> DICIEMBRE </option>
                        </select>
                    </div>
                    
                    <MovimientoTitulo />
                    <Movimiento factura='2345 ' descripcion='PLASTICOS Y RESINAS' cargo='200.00' abono='0'></Movimiento>
                    <Movimiento factura='4530 ' descripcion='PAPELERIA ARMENTA' cargo='600.23' abono='0'></Movimiento>
                    <Movimiento factura='9458' descripcion='GASOLINERA LOS CILOS' cargo='523.02' abono='0'></Movimiento>
                    <Movimiento factura='4858' descripcion='ASESORIAS DE COMPUTACION' cargo='0' abono='300.00'></Movimiento>
                    <Movimiento factura='8495' descripcion='REPARACION DE COMPUTADORA' cargo='0' abono='540.00'></Movimiento>
                    <MovimientoRenglon/>
                    <MovimientoTotal/>

                    <br />
                    
                    <p align="right">
                        <button class='boton' onClick={TraerFacturas}> TRAER FACTURAS </button>
                        <button class='boton' onClick={GenerarPoliza}> GENERAR POLIZA </button>                
                    </p>

                </div>
                
            </div>                                    

        </React.Fragment>
    )
}

export default Dashboard;

