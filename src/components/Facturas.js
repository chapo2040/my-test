import React from 'react';
import Utils, { Menu, Movimiento } from "./Utils";

function Facturas() 
{       
    return (
        <React.Fragment>

            <div class='container'>
               <Menu/>

               <div class='pnlMovimientos'>                    
                   <div class='pnlFiltros'> Listado  de Facturas </div>
                   <Movimiento factura='2345 ' descripcion='PLASTICOS Y RESINAS' cargo='200.00' abono='0'></Movimiento>                                     
               </div>
            </div>

        </React.Fragment>
    )
}

export default Facturas;