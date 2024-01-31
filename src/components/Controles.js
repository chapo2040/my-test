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

export const CheckBox = ({ name, text, checked, className, handlerChange }) => 
(    
  <div class={className}>    
    <label> <input id={name} type="checkbox" onChange={handlerChange} /> {text} </label>
  </div>      
);

export const Button = ({ name, text, className, handlerSubmit }) => 
(    
    <button id={name} class={className} onClick={handlerSubmit}> {text} </button>    
);