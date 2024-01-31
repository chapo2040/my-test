import React, { useState, useEffect } from 'react';
import Utils, { Menu, FacturaRenglon, FacturaTitulo} from "./Utils";
import { useLocation } from 'react-router-dom'
import Wrapper from './Wrapper';

function Facturas() 
{       
    const location = useLocation();  
    const [Facturas, setFactura] = useState([]);

    function LlenaFacturas()
    {
        //alert('Llenando datos ! ');   
        Wrapper.get(`Facturas`).then(response => { setFactura(response.data); })
        .catch(error => { alert(error);});
    }

    useEffect(() => { LlenaFacturas(); }, []);  

    return (
        <React.Fragment>

            <div class='container'>               
                <Menu path={location.pathname} />
                <div class='pnlFacturas'>     
                    <div class='pnlSeccion'> ARCHIVO DE FACTURAS </div> 
                    <FacturaTitulo/>                                        
                    {Facturas.map(factura => (<FacturaRenglon factura={factura.faC_CLAVE} descripcion={factura.faC_DESCRIPCION} importe={factura.faC_IMPORTE}/> ))}                    
                </div>
            </div>

        </React.Fragment>
    )
}

export default Facturas;