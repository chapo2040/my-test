import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import Utils, { Menu, Movimiento, MovimientoTitulo, MovimientoRenglon, MovimientoTotal, ComboCliente, ComboAno, ComboMes } from "./Utils";
import { useLocation } from 'react-router-dom'

function Dashboard() 
{
    const location = useLocation();  

    const [Facturas, setFactura] = useState([]);
    const [gdCargo, setCargo] = useState(0);
    const [gdAbono, setAbono] = useState(0);
 
    const clientes = 
    [
        {id: 1, nombre: 'JUAN DE DIOS MIRANDA ZAZUETA'},
        {id: 2, nombre: 'OSCAR ARMANDO ROMO GUILLEN'}
    ];

    const facturas1 = 
    [
        {id: 4356, desc: 'PLASTICOS Y RESINAS', cargo: '560.90', abono: '0'},
        {id: 3213, desc: 'PAPELERIA ARMENTA', cargo: '350.23', abono: '0'},
        {id: 4356, desc: 'PLASTICOS Y RESINAS', cargo: '150.45', abono: '0'},
        {id: 3213, desc: 'PAPELERIA ARMENTA', cargo: '830.34', abono: '0'},
        {id: 4356, desc: 'NEOSIS SA DE CV', cargo: '0', abono: '320'},
        {id: 3213, desc: 'NEOSIS SA DE CV', cargo: '0', abono: '230.12'},        
    ];

    const facturas2 = 
    [
        {id: 2046, desc: 'GASOLINERA LOS CILOS', cargo: '850.23', abono: '0'},
        {id: 4053, desc: 'CARL JR HAMBURGUESAS', cargo: '530.67', abono: '0'},
        {id: 5662, desc: 'ASESORIAS DE COMPUTACION', cargo: '0', abono: '1300.74'},
        {id: 4356, desc: 'ECOHORU SUPER SISTEMAS', cargo: '0', abono: '320.45'},        
    ];    

    function LlenaFacturas(paFacturas)
    {
        //alert('LlenaFacturas !'); 
        setFactura(paFacturas);
        HazCuentas(paFacturas);
    }

    function HazCuentas(paFacturas)
    {
        //alert('HazCuentas | Facturas ' + paFacturas.length); 

        var ldCargo = 0.0;
        var ldAbono = 0.0;
        var i;
       
        for(i=0; i < paFacturas.length; i++)
        {
            ldCargo = ldCargo + parseFloat(paFacturas[i].cargo);
            ldAbono = ldAbono + parseFloat(paFacturas[i].abono);
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
        if(event.target.value==1){ LlenaFacturas(facturas1); }
        if(event.target.value==2){ LlenaFacturas(facturas2); }
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
    
    function GenerarPoliza()
    {
        alert('GenerarPoliza !'); 
    }

    return (

        <React.Fragment>

            <div class='container'>
                           
                <Menu path={location.pathname} />

                <div class='pnlMovimientos'>

                    <div class='pnlFiltros'>
                        <ComboCliente clientes={clientes} handlerChange={handlerCbxCliente}/>
                        <ComboAno handlerChange={handlerCbxAno}/>
                        <ComboMes handlerChange={handlerCbxMes}/>
                    </div>
                    
                    <MovimientoTitulo />                    
                    {Facturas.map(factura =>(<Movimiento factura={factura.id} descripcion={factura.desc} cargo={factura.cargo} abono={factura.abono}></Movimiento>))}
                    <MovimientoRenglon/>
                    <MovimientoTotal cargo={gdCargo} abono={gdAbono} />
                    <br />
                    
                    <p align="right">
                        <button class='custom-button boton' onClick={TraerFacturas}> TRAER FACTURAS </button>
                        <button class='custom-button boton' onClick={GenerarPoliza}> GENERAR POLIZA </button>                
                    </p>

                </div>
                
            </div>                                    

        </React.Fragment>
    )
}

export default Dashboard;

