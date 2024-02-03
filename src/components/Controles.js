import React, { Component } from 'react';

export const TextBox = ({ name, value, defaultValue, placeholder, className, register, validationSchema, errors }) => 
(
    <div>        
        <input type='text' id={name} value={value} defaultValue={defaultValue} placeholder={placeholder} class={className} {...register(name, validationSchema)} />
        {errors[name] && errors[name]?.type === "required" && (<p className="errorMsg"> {errors[name]?.message} </p>)}
        {errors[name] && errors[name]?.type === "pattern" && (<p className="errorMsg"> Formato no es valido.</p>)}
    </div>
);

export const Password = ({ name, value, defaultValue, placeholder, className, register, validationSchema, errors }) => 
(    
    <div> 
        <input type='password' id={name} value={value} defaultValue={defaultValue} placeholder={placeholder} class={className} {...register(name, validationSchema)} />
        {errors[name] && errors[name]?.type === "required" && (<p className="errorMsg"> {errors[name]?.message} </p>)}
    </div>
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


export const Select = ({ name, className, options, value, descripcion, register }) => 
(    
    <select name={name} class={className} {...register(name)}> 
        {options.map(option =>(            
            <option value={option[value]}> {option[descripcion]} </option>
        ))}
    </select>
);


export const CheckBox = ({ name, text, isChecked, className, handler, register }) => 
(    
  <div class={className}>    
    <label> <input type="checkbox" id={name} {...register(name)} checked={isChecked} onChange={handler} /> {text} </label>
  </div>      
);

export const Button = ({ name, text, className, handlerSubmit }) => 
(    
    <button id={name} class={className} onClick={handlerSubmit}> {text} </button>    
);