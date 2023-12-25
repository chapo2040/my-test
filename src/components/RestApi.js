import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RestApi() 
{
    const [Books, setBook] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:44362/api/Books')
          .then(response => {
              setBook(response.data);
          })
          .catch(error => {
             console.error(error);
          });
      }, []);
    
      return (
        <ul>
          {Books.map(book => (
            <li key={book.id}> id: {book.id} / name: {book.name} </li>
          ))}
        </ul>
      );
}

export default RestApi;