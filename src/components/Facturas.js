import React, { useState, useEffect } from 'react';
import Utils, { Menu, FacturaRenglon, FacturaTitulo, FacturaPaginacion} from "./Utils";
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

                    <div class='pnlSeccion'> 
                        <div class='seccion1'>  FACTURAS  </div>
                        <div class='seccion2'>
                            -
                        </div>                            
                    </div>

                    <div class='contenido'>
                        <FacturaTitulo/>   
                        <div class='renglones'>                                                                
                            {Facturas.map(factura => (<FacturaRenglon factura={factura.faC_CLAVE} descripcion={factura.faC_DESCRIPCION} importe={factura.faC_IMPORTE}/> ))}                    
                        </div>
                        <FacturaPaginacion/>
                    </div>
                        
                </div>
            </div>

        </React.Fragment>
    )
}

export default Facturas;