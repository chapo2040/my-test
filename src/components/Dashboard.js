import React from 'react';

function Dashboard() 
{
    return (

        <React.Fragment>
                        
            <text align='center'> CONTA EXPRESS </text> <br/>
            
            <table align='left' width='25%' border='1px'> 
            <tr> 
                <td>
                    Clientes 
                    <button> + Agregar </button> 
                </td>
            </tr>
            <tr>
                <td>                    
                    MIZA0506937124 <br/>
                    <a href='#'> JUAN DE DIOS MIRANDA ZAZUETA </a> 
                </td>
            </tr> 
            <tr>
                <td>
                    ROGO791025CQ1 <br/>
                    <a href='#'> OSCAR ARMANDO ROMO GUILLEN </a>
                </td>
            </tr>             
            </table>

            <table align='left' width='55%' border='1px'> 
                <tr><td width='60%'> CONCEPTO </td> <td width='20%'> CARGO </td> <td width='20%'> ABONO </td> </tr>
                <tr><td> FACT #5052 GASOLINERA LOS CILOS </td> <td> $100 </td> <td> - </td> </tr>
                <tr><td> FACT #4563 RESTAURANTE DE MARISCOS </td> <td> $300 </td> <td> - </td> </tr>    
                <tr><td> FACT #9412 SERVICIO DE REPARACION </td> <td> - </td> <td> $220 </td> </tr>
                <tr><td> FACT #10039 GASOLINERA LOS CILOS </td> <td> - </td> <td> $340 </td> </tr>
                <tr><td> FACT #5052 GASOLINERA LOS CILOS </td> <td> $100 </td> <td> - </td> </tr>
                <tr><td> FACT #4563 RESTAURANTE DE MARISCOS </td> <td> $300 </td> <td> - </td> </tr>    
                <tr><td> FACT #9412 SERVICIO DE REPARACION </td> <td> - </td> <td> $220 </td> </tr>
                <tr><td> FACT #10039 GASOLINERA LOS CILOS </td> <td> - </td> <td> $340 </td> </tr>
                <tr><td> FACT #5052 GASOLINERA LOS CILOS </td> <td> $100 </td> <td> - </td> </tr>
                <tr><td> FACT #4563 RESTAURANTE DE MARISCOS </td> <td> $300 </td> <td> - </td> </tr>    
                <tr><td> FACT #9412 SERVICIO DE REPARACION </td> <td> - </td> <td> $220 </td> </tr>
                <tr><td> FACT #10039 GASOLINERA LOS CILOS </td> <td> - </td> <td> $340 </td> </tr>
                <tr><td> FACT #5052 GASOLINERA LOS CILOS </td> <td> $100 </td> <td> - </td> </tr>
                <tr><td> FACT #4563 RESTAURANTE DE MARISCOS </td> <td> $300 </td> <td> - </td> </tr>    
                <tr><td> FACT #9412 SERVICIO DE REPARACION </td> <td> - </td> <td> $220 </td> </tr>
                <tr><td> FACT #10039 GASOLINERA LOS CILOS </td> <td> - </td> <td> $340 </td> </tr>
                <tr><td> FACT #5052 GASOLINERA LOS CILOS </td> <td> $100 </td> <td> - </td> </tr>
                <tr><td> FACT #4563 RESTAURANTE DE MARISCOS </td> <td> $300 </td> <td> - </td> </tr>    
                <tr><td> FACT #9412 SERVICIO DE REPARACION </td> <td> - </td> <td> $220 </td> </tr>
                <tr><td> FACT #10039 GASOLINERA LOS CILOS </td> <td> - </td> <td> $340 </td> </tr>                            
            </table>

            <table align='left' width='20%' border='1px'> 
                <tr><td> TOTAL A PAGAR </td> </tr>
                <tr><td> $3,400 </td> </tr>
                <tr>
                    <td>
                        <button> TRAER FACTURAS </button>  
                        <button> GENERAR .PDF </button>  
                    </td> 
                </tr>
            </table>

        </React.Fragment>
    )

}

export default Dashboard;
