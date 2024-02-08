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

    function OnView(event)
    {         
        const llFactura = event.currentTarget.getAttribute('factura');
        const liArchivo = event.currentTarget.getAttribute('archivo');

        //alert('OnView | factura: ' + llFactura + '- archivo: ' + liArchivo);
        
        var lsExtencion = '';
        if(liArchivo==1){lsExtencion='pdf';}
        else if(liArchivo==2){lsExtencion='xml';}        
        
        const windowFeatures = "left=100,top=100,width=800,height=800";        
        const handle = window.open(process.env.PUBLIC_URL + "/docs/factura" + llFactura + "." + lsExtencion, "_blank", windowFeatures);                
        
        if (!handle){

        }   
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
                            {Facturas.map(factura => (<FacturaRenglon factura={factura.faC_CLAVE} descripcion={factura.faC_DESCRIPCION} importe={factura.faC_IMPORTE} handler= {OnView} /> ))}                    
                        </div>
                        <FacturaPaginacion/>
                    </div>
                        
                </div>
            </div>

        </React.Fragment>
    )
}

export default Facturas;