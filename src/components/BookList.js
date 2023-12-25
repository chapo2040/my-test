import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default class BookList extends React.Component 
{
  state = { books: [] }

  componentDidMount() 
  {
    axios.get(`https://localhost:44362/api/Books`)
      .then(res => {
        const books = res.data;
        this.setState({ books });
      })
  }

  render() 
  {
  
    return (
    
    <React.Fragment>
      
      <label> Lista de Libros: </label>
      
      <ul>
        {
          this.state.books
            .map(book =>
              <li key={book.id}> {book.id} - {book.name} </li>
            )
        }
      </ul>

    </React.Fragment>
    )

  }
}