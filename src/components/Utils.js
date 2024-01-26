import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import imgLogo from '../images/logo.jpg'
import imgMenuFlecha from '../images/menu.png'
import imgEditar from '../images/editar.png'
import imgBorrar from '../images/borrar.png'

import imgLupa from '../images/lupa.png'
import imgDescargar from '../images/descargar.png'
import imgPDF from '../images/pdf.png'


export class Menu extends Component
{  
  render() 
  {
    return(        
      <div class='pnlMenu'>       
                        
            <img src={imgLogo} width={'120px'}/>
            <br/><br/>
            {this.props.path}
            <br/><br/>
            <img src={imgMenuFlecha} class='menu' style={{ display: this.props.path=='/dashboard' ? "show" : "none" }}/>
            <Link to={`/dashboard`} class='link'> Contabilidad </Link> <br/>            
            <img src={imgMenuFlecha} class='menu' style={{ display: this.props.path=='/clientes' ? "show" : "none" }}/>
            <Link to={`/clientes`} class='link'> Clientes </Link> <br/> 
            <img src={imgMenuFlecha} class='menu' style={{ display: this.props.path=='/facturas' ? "show" : "none" }}/>
            <Link to={`/facturas`} class='link'> Facturas </Link> <br/> 
            <img src={imgMenuFlecha} class='menu' style={{ display: this.props.path=='/cuenta' ? "show" : "none" }}/>
            <Link to={`/cuenta`} class='link'> Mi Cuenta </Link> <br/> <br/> 
            <img src={imgMenuFlecha} class='menu' style={{ display: this.props.path=='/' ? "show" : "none" }}/>
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

export class ComboCliente extends Component
{
  render() 
  {
    return(
          <select class="comboCliente" onChange={this.props.handlerChange}>
            <option value={0}> SELECCIONA CLIENTE </option>
            {this.props.clientes.map(cliente =>(            
              <option value={cliente.id}> {cliente.nombre} </option>
            ))}
        </select>
    )
  }
}

export class ComboAno extends Component
{
  render() 
  {
    return(
      <select class='comboAno' onChange={this.props.handlerChange}>
        <option value="2023"> 2023 </option>
        <option value="2024"> 2024 </option>
        <option value="2025"> 2025 </option>
        <option value="2026"> 2026 </option>
        <option value="2027"> 2027 </option>
      <option value="2028"> 2028 </option>
     </select> 
    )
  }
}

export class ComboMes extends Component
{
  render() 
  {
    return(
      <select class='comboMes' onChange={this.props.handlerChange}>
        <option value="1"> ENERO </option>
        <option value="2"> FEBRERO </option>
        <option value="3"> MARZO </option>
        <option value="4"> ABRIL </option>
        <option value="5"> MAYO </option>
        <option value="6"> JUNIO </option>
        <option value="7"> JULIO </option>
        <option value="8"> AGOSTO </option>
        <option value="9"> SEPTIEMBRE </option>
        <option value="10"> OCTUBRE </option>
        <option value="11"> NOVIEMBRE </option>
        <option value="12"> DICIEMBRE </option>
      </select>
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
            <label class='info'> {this.props.factura} - {this.props.descripcion} </label> 
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
          <p class='totalCargo'> ${this.props.cargo} </p>              
        </div>

        <div class='abono'>
          <p class='totalAbono'> ${this.props.abono} </p>              
        </div>         

      </div>  
    )
  }
}

export class ClienteTitulo extends Component
{
  render() 
  {
    return(
        <div class='itemCliente'>
          <div class='rfc'> RFC </div>
          <div class='descripcion'> NOMBRE </div>
          <div class='acciones'> ACCIONES </div>
        </div>  
    )
  }
}

export class ClienteRenglon extends Component
{
  render() 
  {
    return(
        <div class='itemCliente'>

          <div class='rfc'>
            <span class='titulo'> {this.props.rfc} </span>            
          </div>

          <div class='descripcion'>            
            <span class='titulo'> {this.props.nombre} </span>
          </div>

          <div class='acciones'>
              <a href='#'> <img src={imgEditar} class='editar' /> </a>
              <a href='#'> <img src={imgBorrar} class='borrar' /> </a>
          </div>

        </div>  
    )
  }
}

export class FacturaTitulo extends Component
{
  render() 
  {
    return(
        <div class='itemFactura'>
          <div class='numero'> # </div>
          <div class='descripcion'> CONCEPTO </div>
          <div class='importe'> IMPORTE </div> 
          <div class='acciones'> ACCIONES </div>
        </div>  
    )
  }
}

export class FacturaRenglon extends Component
{
  render() 
  {
    return(
        <div class='itemFactura'>

          <div class='numero'>
            <span class='titulo'> {this.props.factura} </span>
          </div>

          <div class='descripcion'>
            <span class='titulo'> {this.props.descripcion} </span>
          </div>

          <div class='importe'>
            <span class='titulo'> ${this.props.importe} </span>
          </div>          

          <div class='acciones'>
              <a href='#'><img src={imgLupa} class='lupa' /></a>
              <a href='#'><img src={imgPDF} class='pdf' /></a>
              <a href='#'><img src={imgDescargar} class='descargar' /></a>
          </div>

        </div>  
    )
  }
}