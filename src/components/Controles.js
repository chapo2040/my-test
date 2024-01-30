import React, { Component } from 'react';

export const TextBox = ({ name, value, placeholder, className, register, validationSchema }) => 
(
    <input type='text' id={name} value={value} placeholder={placeholder} class={className} {...register(name, validationSchema)} />   
);

export const Password = ({ name, value, placeholder, className, register, validationSchema }) => 
(    
    <input type='password' id={name} value={value} placeholder={placeholder} class={className} {...register(name, validationSchema)} />      
);

export const Input = ({ name, label, register, errors, required, type, validationSchema }) => 
(
    <div className="form-control-input">
        <label htmlFor={name}>
        {label}
        {required && "*"}
        </label>
        <input
        id={name}
        name={name}
        type={type}
        {...register(name, validationSchema)}
        />
        {errors && errors[name]?.type === "required" && (
        <span className="error">{errors[name]?.message}</span>
        )}
        {errors && errors[name]?.type === "minLength" && (
        <span className="error">{errors[name]?.message}</span>
        )}
    </div>    
);

export class CheckBox extends Component
{
  render() 
  {
    return(
        <div>
            <input id={this.props.name} type="checkbox" checked={this.props.checked} onChange={this.props.handlerChange} />
            <label htmlFor={this.props.name}> {this.props.text} </label>
        </div>        
    )
  }
}

export class Button extends Component
{
  render() 
  {
    return(
        <button id={this.props.name} class={this.props.class} onClick={this.props.handlerSubmit}> {this.props.text} </button>     
    )
  }
}