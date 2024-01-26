import React from 'react';
import Utils, { Menu, FacturaRenglon, FacturaTitulo} from "./Utils";
import { useLocation } from 'react-router-dom'

function Facturas() 
{       
    const location = useLocation();  

    return (
        <React.Fragment>

            <div class='container'>               
                <Menu path={location.pathname} />
                <div class='pnlFacturas'>     
                    <div class='pnlSeccion'> ARCHIVO DE FACTURAS </div> 
                    <FacturaTitulo/>                
                    <FacturaRenglon factura='23345' descripcion='PLASTICOS Y RESINAS SA DE CV ' importe='404.20' />
                    <FacturaRenglon factura='23345' descripcion='PLASTICOS Y RESINAS SA DE CV ' importe='404.20' />
                    <FacturaRenglon factura='23345' descripcion='PLASTICOS Y RESINAS SA DE CV ' importe='404.20' />
                    <FacturaRenglon factura='23345' descripcion='PLASTICOS Y RESINAS SA DE CV ' importe='404.20' />
                    <FacturaRenglon factura='23345' descripcion='PLASTICOS Y RESINAS SA DE CV ' importe='404.20' />
                    <FacturaRenglon factura='23345' descripcion='PLASTICOS Y RESINAS SA DE CV ' importe='404.20' />
                </div>
            </div>

        </React.Fragment>
    )
}

export default Facturas;