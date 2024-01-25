import React from 'react';
import Utils, { Menu, Movimiento } from "./Utils";

function Clientes() 
{       
    return (
        <React.Fragment>

            <div class='container'>
               <Menu/>

               <div class='pnlMovimientos'>                    
                   <div class='pnlFiltros'> Listado  de Clientes </div>
                   <Movimiento factura='2345 ' descripcion='PLASTICOS Y RESINAS' cargo='200.00' abono='0'></Movimiento>                                     
               </div>
            </div>

        </React.Fragment>
    )
}

export default Clientes;