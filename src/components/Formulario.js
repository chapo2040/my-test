import React, { useState, useEffect } from 'react';
import {useForm} from 'react-hook-form'
import Wrapper from './Wrapper';

function Formulario() 
{
    const {register, handleSubmit, reset} = useForm();
    const [Books, setBook] = useState([]);

    function FillBooks()
    {
        Wrapper.get(`Books`).then(response => { setBook(response.data); })
        .catch(error => { alert(error);});
    }

    useEffect(() => { FillBooks(); }, []);  

    function OnSubmit(data)
    {
        //alert('OnSubmit: '); 
        if(validateForm(data)===true)
        {
            Wrapper.post(`Books`, { id: data.id, name: data.name })
            .then(response => { reset(); FillBooks(); }).catch(error => { alert(error);});
        }
    }

    function validateForm(data)
    {
        if(data.id==='')    
        {
            alert("¡ Error: id necesario !");
            return false;
        }
        else if(data.name==='')    
        {
            alert("¡ Error: nombre necesario !");
            return false;
        }   
        
        return true;
    }

    function OnDelete(data)
    {
        //alert('OnDelete: ' + data.id.toString());
        if(data.id==='')
        {
            alert("¡ Error: id necesario !");        
        }
        else
        {
            Wrapper.delete(`Books/${data.id}`)
            .then(response => { reset(); FillBooks(); }).catch(error => { alert(error);});
        }
    }

    function OnUpdate(data)
    {
        //alert('OnUpdate: ' + data.id.toString());
        if(validateForm(data)===true)
        {
            Wrapper.put(`Books/${data.id}`, { id: data.id, name: data.name })
            .then(response => { reset(); FillBooks(); }).catch(error => { alert(error);});
        }
    }

    function OnRefresh(data)
    {    
        FillBooks();
    }

    return (

        <React.Fragment>

            <label> Registro3: </label>
            <form>
                <input type='text' placeholder="id" {...register("id")} /> <br/>
                <input type='text' placeholder="name" {...register("name")} /> <br/>
                <button onClick={handleSubmit(OnSubmit)}> Insert </button>
                <button onClick={handleSubmit(OnDelete)}> Delete </button>
                <button onClick={handleSubmit(OnUpdate)}> Update </button>
                <button onClick={handleSubmit(OnRefresh)}> Refresh </button>
            </form>

        
            <br/><br/>

            <label> Lista de Libros: </label>
            <ul>
                {Books.map(book => (
                    <li key={book.id}> id: {book.id} / name: {book.name} </li>
                ))}
            </ul>      

        </React.Fragment>
    )

}

export default Formulario;