import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import imgLogo from '../images/logo.jpg'

export class Menu extends Component
{
  render() 
  {
    

    return(        
      <div class='pnlMenu'>       
                        
            <img src={imgLogo} width={'130px'}/>
            <br/><br/>

            <Link to={`/dashboard`} class='link'> Contabilidad </Link> <br/>            
            <Link to={`/clientes`} class='link'> Clientes </Link> <br/> 
            <Link to={`/facturas`} class='link'> Facturas </Link> <br/> 
            <Link to={`/cuenta`} class='link'> Mi Cuenta </Link> <br/> <br/> 
            <Link to={`/`} class='link'> Cerrar Sesion </Link> 
        </div>
    )
  }
}

export class Cliente extends Component
{
  render() 
  {
    return(
        <div class='itemCliente'>
            <p class='titulo'> {this.props.rfc} </p>
            <p class='info'> {this.props.nombre} </p> 
        </div>  
    )
  }
}

export class MovimientoTitulo extends Component
{
  render() 
  {
    return(
        <div class='itemMovimiento'>

          <div class='descripcion'>           
            <span class='info'> CONCEPTO </span> 
          </div>

          <div class='cargo'>
            <p class='cantidad'> CARGO </p>              
          </div>

          <div class='abono'>
            <p class='cantidad'> ABONO </p>              
          </div>         

        </div>  
    )
  }
}

export class Movimiento extends Component
{
  render() 
  {
    return(
        <div class='itemMovimiento'>

          <div class='descripcion'>
            <span class='titulo'> {this.props.factura} - </span>   
            <span class='info'> {this.props.descripcion} </span> 
          </div>

          <div class='cargo'>
            <p class='cantidad'> ${this.props.cargo} </p>              
          </div>

          <div class='abono'>
            <p class='cantidad'> ${this.props.abono} </p>              
          </div>         

        </div>  
    )
  }
}

export class MovimientoRenglon extends Component
{
  render() 
  {
    return(
        <div class='itemMovimiento'>

          <div class='descripcion'>           
            <input type='text' class='txtDescripcion'></input>
          </div>

          <div class='cargo'>
           <input type='text' class='txtCargo'></input>            
          </div>

          <div class='abono'>
            <input type='text' class='txtAbono'></input>             
          </div>         

        </div>  
    )
  }
}

export class MovimientoTotal extends Component
{
  render() 
  {
    return(
      <div class='itemMovimiento'>

        <div class='descripcionTotal'>          
          <span class='total'> TOTAL: </span> 
        </div>

        <div class='cargo'>
          <p class='totalCargo'> $3,400 </p>              
        </div>

        <div class='abono'>
          <p class='totalAbono'> $2,200 </p>              
        </div>         

      </div>  
    )
  }
}