import React from 'react';
import axios from 'axios';

export default class BookAdd extends React.Component 
{
  state = { id: 0, name: '', books: []}
  
  handleChangeId = event => { this.setState({ id: event.target.value }); }
  handleChangeName = event => { this.setState({ name: event.target.value }); }

  handleSubmit = event => 
  {
    //alert('handleSubmit: ');
    //event.preventDefault();    

    axios.post(`https://localhost:44362/api/Books`, { id: this.state.id, name: this.state.name })
    .then(res => {
      console.log(res);
      console.log(res.data);
    });    

    this.fillBooks();
  }

  handleDelete = event => 
  {
    //alert('handleDelete: ');
    //event.preventDefault();
    
    axios.delete(`https://localhost:44362/api/Books/${this.state.id}`)
    .then(res => {
    console.log(res);
    console.log(res.data);
    });

    this.fillBooks();
  }

  handleUpdate = event => 
  {
    //alert('handleUpdate: ');
    //event.preventDefault();
    
    axios.put(`https://localhost:44362/api/Books/${this.state.id}`, { id: this.state.id, name: this.state.name })
    .then(res => {
    console.log(res);
    console.log(res.data);
    });    
  }  

  handleRefresh = event => 
  {
    //alert('handleRefresh: ');
    //event.preventDefault();
    
    axios.get(`https://localhost:44362/api/Books`)
      .then(res => {
        const books = res.data;
        this.setState({ books });
      })
  } 

  fillBooks() 
  {
    axios.get(`https://localhost:44362/api/Books`)
      .then(res => {
        const books = res.data;
        this.setState({ books });
      })
  }

  componentDidMount() 
  {
    this.fillBooks();
  }
  
  render() 
  {
    return (
      <div>
        <form>
        <label>
            Book Id:
            <input type="text" name="id" onChange={this.handleChangeId} />
          </label> <br></br>
          <label>
            Book Name:
            <input type="text" name="name" onChange={this.handleChangeName} />
          </label>
          
          <br/><br/>

          <button type="submit" onClick={this.handleSubmit}> Inset </button>
          <button type="submit" onClick={this.handleDelete}> Delete </button>
          <button type="submit" onClick={this.handleUpdate}> Update </button>
          <button type="submit" onClick={this.handleRefresh}> Refresh </button>

          <br/><br/>

          <label> Lista de Libros: </label>
      
          <ul>
            {
              this.state.books
                .map(book =>
                  <li key={book.id}> {book.id} - {book.name} </li>
                  )
              }
          </ul>  

        </form>
      </div>
    )
  }

}