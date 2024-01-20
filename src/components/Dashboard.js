import React from 'react';

function Dashboard() 
{
    function AgregarCliente()
    {
        alert('AgregarCliente !'); 
    }

    function TraerFacturas()
    {
        alert('TraerFacturas !'); 
    }
    
    function GenerarPDF()
    {
        alert('GenerarPDF !'); 
    }

    return (

        <React.Fragment>

            <div class='container'>

                <div class='pnlClientes'>

                    <p class='txt-1'> Clientes 
                        <button class='agregar' onClick={AgregarCliente}> + Agregar </button>
                    </p>

                    <div  class='itemCliente'>
                        <p class='titulo'> MIZA0506937124 </p>
                        <p class='info'> JUAN DE DIOS MIRANDA ZAZUETA </p> 
                    </div>    

                    <div  class='itemCliente'>
                        <p class='titulo'> ROGO791025CQ1  </p>
                        <p class='info'> OSCAR ARMANDO ROMO GUILLEN </p> 
                    </div>                     

                </div>


                <div class='pnlMovimientos'>

                    <p class='txt-1'> Movimientos </p>

                    <div  class='itemMovimiento'>
                        <p class='titulo'> FACT #100 </p>   
                        <p class='info'> PLASTICOS Y RESINAS | $1,254 - 0 </p> 
                    </div>   

                    <div  class='itemMovimiento'>
                        <p class='titulo'> FACT #100 </p>   
                        <p class='info'> PLASTICOS Y RESINAS | $1,254 - 0 </p> 
                    </div>  

                    <div  class='itemMovimiento'>
                        <p class='titulo'> FACT #100 </p>   
                        <p class='info'> PLASTICOS Y RESINAS | $1,254 - 0 </p> 
                    </div>  

                    <div  class='itemMovimiento'>
                        <p class='titulo'> FACT #100 </p>   
                        <p class='info'> PLASTICOS Y RESINAS | $1,254 - 0 </p> 
                    </div>  

                    <div  class='itemMovimiento'>
                        <p class='titulo'> FACT #100 </p>   
                        <p class='info'> PLASTICOS Y RESINAS | $1,254 - 0 </p> 
                    </div>                      

                    <br />
                    
                    <p align="right">
                        <button class='boton' onClick={TraerFacturas}> TRAER FACTURAS </button>
                        <button class='boton' onClick={GenerarPDF}> GENERAR .PDF </button>                
                    </p>

                </div>
                
            </div>                                    

        </React.Fragment>
    )
}

export default Dashboard;
