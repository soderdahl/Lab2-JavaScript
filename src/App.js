import React, { Component } from 'react'
import Header from './components/ui/Header/Header'
import {addBook, fetchBooks} from './utils/api.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.state= {
      books: [],
      title: '',
      author: ''
    }

    this.titleHandler = this.titleHandler.bind(this)
    this.authorHandler = this.authorHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

titleHandler(event) {
  this.setState({
    title: event.target.value
  })
}

authorHandler(event) {
  this.setState({
    author: event.target.value
  })
}

submitHandler(event) {
  event.preventDefault()//förhindra att webläsaren inte ska laddad om sig själv
  const book ={
    title: this.state.title,
    author: this.state.author

  }  
  addBook(book, (id) => { 
    this.setState({
      books: [...this.state.books, {...book, id}]
    })    
  })
}

componentDidMount=()=> {

  fetchBooks(({data}) => {

    this.setState({
      books: [...data]
    })
  })
}



/* componentDidUpdate() {
  fetchBooks(response => {
    if (response.state === 'success') {
      this.setState({
        books: [...response.data]
      })
    }
  })
} */



  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <div className="row form-section">
            <form className="book-form col-6">
              <legend>Lägg till dina favoritböcker</legend>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  aria-describedby="title"
                  placeholder="Lägg till titel"
                  value={this.state.title}
                  onChange={this.titleHandler}
                />

                <input
                  type="text"
                  className="form-control"
                  id="author"
                  rows="3"
                  data-gramm="true"
                  data-txt_gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_id="63b74fb6-c7e4-7f0e-0c1f-438d47ac87a0"
                  data-gramm_editor="true"
                  placeholder="Lägg till författare"
                  value ={this.state.author}
                  onChange= {this.authorHandler}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={this.state.submitHandler}
              >
                Skicka
              </button>
            </form>
          </div>
        </div>
        <div className="display-books">
          <div className="container">
            <div className="col-12">
              <ul className="list-group">
                <li className="list-item list-group-item d-flex align-items-center">
                  <strong className="title">Titel</strong>

                  <div className="author">Författare</div>

                  <div className="buttons">
                    <button type="button" className="btn btn-success">
                      Editera
                    </button>
                    <button type="button" className="btn btn-danger">
                      Ta bort
                    </button>
                  </div>
                </li>
              </ul>
            </div>




            <div className="col-12">
              <ul className="list-group">
              {this.state.books.map((book) =>
        (<li className="list-item list-group-item d-flex align-items-center">
                  <strong className="title">{book.title}</strong>

                  <div className="author">{book.author}</div>

                  <div className="buttons">
                    <button type="button" className="btn btn-success">
                      Editera
                    </button>
                    <button type="button" className="btn btn-danger">
                      Ta bort
                    </button>
    </div></li>))}


                </ul>
           </div> 
          </div>
        </div>
      </div>
    )
  }
}

export default App
