import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Controles, { TextBox } from "./Controles";

import imgLogo from '../images/logo.jpg'
import imgMenuFlecha from '../images/menu.png'
import imgMenuFlecha2 from '../images/menu2.png'

import imgDashboard from '../images/dashboard.png'
import imgCliente from '../images/cliente.png'
import imgFactura from '../images/folder.png' 
import imgHerramienta from '../images/herramienta.png'
import imgConfiguracion from '../images/configuracion.png'
import imgSalir from '../images/salir.png'


import imgEditar from '../images/editar.png'
import imgBorrar from '../images/borrar.png'

import imgLupa from '../images/lupa.png'
import imgDescargar from '../images/descargar.png'
import imgPDF from '../images/pdf.png'
import imgXML from '../images/xml.png'

export class Menu extends Component
{  
  render() 
  {
    return(        

        <div class='pnlMenu'>

          <center> <img src={imgLogo} class='logo'/> </center>
          <hr/>
          
          <div class='menu'>            
            <Link to={`/dashboard`} class={ this.props.path=='/dashboard' ? 'link-select' : 'link' }> 
            <img src={imgDashboard} class='icon'/>
              Contabilidad 
            </Link>           
          </div>
          <div class='menu'>            
            <Link to={`/clientes`} class={ this.props.path=='/clientes' ||  this.props.path=='/clienteagregar'? 'link-select' : 'link' }> 
              <img src={imgCliente} class='icon'/>
              Clientes 
            </Link> 
          </div>
          <div class='menu'>            
            <Link to={`/facturas`} class={ this.props.path=='/facturas' ? 'link-select' : 'link' }>
              <img src={imgFactura} class='icon'/>
               Facturas 
              </Link> 
          </div>  

          <div class='menu'>            
            <Link to={`/cuenta`} class={ this.props.path=='/cuenta' ? 'link-select' : 'link' }> 
              <img src={imgConfiguracion} class='icon'/>
              Configuración 
            </Link>
          </div>          
          
          <div class='salir'>            
            <Link to={`/`} class={ this.props.path=='/' ? 'link-select' : 'link' }> 
              <img src={imgSalir} class='icon'/>
              Cerrar Sesion 
            </Link> 
          </div>

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
              <option value={cliente.clI_CLAVE}> {cliente.clI_NOMBRE} </option>
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

export class AyuFacturas extends Component
{
  render() 
  {
    return(
        <dialog class='ayudaFactura' open={this.props.isOpen}>
          FACTURAS <br/>
          <input type='text'></input> <button> Buscar </button> 
          <div> Factura 1 </div>
          <div> Factura 2 </div>
          <div> Factura 3 </div>
          <div> Factura 4 </div>
        </dialog>
    )
  }
}

export class MovimientoTitulo extends Component
{
  render() 
  {
    return(
        <div class='MovimientoTitulo'>

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
             <a href='#' usuario={this.props.usuario} cliente={this.props.cliente} folio={this.props.folio} factura={this.props.factura} tipo={this.props.tipo} onClick={this.props.handlerBorrar}><img src={imgBorrar} class='borrar' /></a>             
             <a href='#' usuario={this.props.usuario} cliente={this.props.cliente} folio={this.props.folio} factura={this.props.factura} tipo={this.props.tipo} onClick={this.props.handlerVer}><img src={imgXML} class='borrar' /></a>
            <label> FAC {this.props.folio} - {this.props.descripcion} </label> 
          </div>

          <div class='cargo'>
            <p> $ {this.props.tipo==2 ? FormatNumber(this.props.impuestoImporte) : 0 } </p>
          </div>

          <div class='abono'>
            <p> $ {this.props.tipo==1 ? FormatNumber(this.props.impuestoImporte) : 0 } </p>       
          </div>         

        </div>  
    )
  }
}

export default function FormatNumber(numero) 
{   
  //const newNumbeR = Number(numero).toFixed(2);
  //const formattedNumber = newNumbeR.toLocaleString(navigator.language, { maximumFractionDigits: 2 })  

  //const options = { maximumFractionDigits: 2 }     
  //const formattedNumber = Intl.NumberFormat("en-US", options).format(numero); 
    
  //const formattedNumber = numero.toLocaleString('en-US', { maximumFractionDigits: 2 })
  //const actualNumber = +formatted.replace(/,/g, '')
  //const formattedNumber = actualNumber.toLocaleString('en-US', {maximumFractionDigits: 2})

  //newNumbeR.toLocaleString(navigator.language, { maximumFractionDigits: 2 }); 
  const formattedNumber = numero.toLocaleString(undefined, {maximumFractionDigits:2}) // "1,234.57"

  return formattedNumber; 
}  

export const MovimientoRenglon = ({ register, errors }) => 
(    
  <div class='itemMovimiento'>

    <div class='descripcion'>      
      <TextBox name='txtDescripcion' placeholder="Concepto" className='txtDescripcion' register={register} validationSchema={{required:"Concepto requerido."}} errors={errors} />
    </div>

    <div class='cargo'>      
      <TextBox name='txtCargo' placeholder="Cargo" className='txtCargo' register={register} validationSchema={{required:"Cargo requerido."}} errors={errors} />
    </div>

    <div class='abono'>        
      <TextBox name='txtAbono' placeholder="Abono" className='txtAbono' register={register} validationSchema={{required:"Abono requerido."}} errors={errors} />
    </div>  

  </div>  
);

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
          <p class='totalCargo'> ${ FormatNumber(this.props.totalCargo) } </p>              
        </div>

        <div class='abono'>
          <p class='totalAbono'> ${  FormatNumber(this.props.totalAbono) } </p>              
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
        <div class='itemClienteTitulo'>
          <div class='rfc text-base'> RFC </div>
          <div class='descripcion text-base'> NOMBRE </div>
          <div class='acciones text-base'> ACCIONES </div>
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
            <span> {this.props.rfc} </span>            
          </div>

          <div class='descripcion'>            
            <span> {this.props.nombre} </span>
          </div>

          <div class='acciones'>
              <a href='#' cliente={this.props.id} nombre={this.props.nombre} onClick={this.props.handlerEdit}><img src={imgEditar} class='editar' /></a>
              <a href='#' cliente={this.props.id} nombre={this.props.nombre} onClick={this.props.handlerDelete}><img src={imgBorrar} class='borrar' /></a>
          </div>

        </div>  
    )
  }
}

export class ClientePaginacion extends Component
{
  render() 
  {
    return(
        <div class='paginacion'>
            Paginas  
            <a href='#' class='pagina'> 1 </a>
            <a href='#' class='pagina'> 2 </a>
            <a href='#' class='pagina'> 3 </a>
            <a href='#' class='pagina'> 4 </a>
        </div>  
    )
  }
}

export class FacturaTitulo extends Component
{
  render() 
  {
    return(
        <div class='itemFacturaTitulo'>
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
            <span> {this.props.factura} </span>
          </div>

          <div class='descripcion'>
            <span> {this.props.descripcion} </span>
          </div>

          <div class='importe'>
            <span> ${this.props.importe} </span>
          </div>          

          <div class='acciones'>
              {/*<a href='#'><img src={imgLupa} class='lupa' /></a>*/}              
              <a href='#'factura={this.props.factura} archivo={1} onClick={this.props.handler}><img src={imgPDF} class='pdf' /></a>              
              {/*<a href='#'><img src={imgDescargar} class='descargar' /></a>*/}
              <a href='#'factura={this.props.factura} archivo={2} onClick={this.props.handler}><img src={imgXML} class='xml' /></a>              
          </div>

        </div>  
    )
  }
}

export class FacturaPaginacion extends Component
{
  render() 
  {
    return(
        <div class='paginacion'>
            Paginas  
            <a href='#' class='pagina'> 1 </a>
            <a href='#' class='pagina'> 2 </a>            
        </div>  
    )
  }
}