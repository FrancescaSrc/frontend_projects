import React from 'react'
import './App.css'
import Shelf from './Shelf.js'
import * as BooksAPI from './BooksAPI'
import Search from './Search.js'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'



class BooksApp extends React.Component {
 state = {
    books: [],
    searchList:[],
  };

//getting all books from server
 async componentDidMount() {
  await BooksAPI.getAll()
   .then((books) => {
     this.setState({
       books: books,   
       })        
   })
.catch(err=> console.log('Error while retrieving books '+ err))
 }


changeShelf=(book, newShelf)=>{
     let bookMoved = this.state.books.filter((b) =>{
       if(b.id === book.id){ 
         b.shelf=newShelf
         BooksAPI.update(b, newShelf);
       } 
       return b
     })
      this.setState({ books: bookMoved })  
}


addBook=(book, shelf)=>{
let isPresent = this.state.books.filter(b=>{return b.id===book.id})
  if(isPresent.length!==0){
   this.changeShelf(book, shelf)
  }else{
	book.shelf=shelf
	this.setState(currState=>({ 
    books: currState.books.concat(book)  
    })) 
     BooksAPI.update(book, shelf);
    }
}                 

  render() {
  
  const { books }= this.state
 
    return (
    
   <div className="app">     
        <div>
		<Route exact path='/search' render={() => (
          <Search books={books} name={"Search results"} updateShelf={this.addBook}/>)} />
        </div>  

        <div>
        <Route exact path='/' render={() => (
        <div className="list-books">
          <div className="list-books-title">
           <h1>MyReads</h1>
           </div>
         <div className="list-books-content">  
		 <Shelf books={books.filter((b)=>{return b.shelf==='currentlyReading'})} name={"Currently Reading"} updateShelf={this.changeShelf}/>
         <Shelf books={books.filter((b)=>{return b.shelf==='wantToRead'})} name={"Want to Read"} updateShelf={this.changeShelf}/>	
		 <Shelf books={books.filter((b)=>{return b.shelf==='read'})} name={"Read"} updateShelf={this.changeShelf}/> 
         </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
             </div>
		</div>
			      
        )}/>
        </div>

    </div> 
	) //end return
  }
}

export default BooksApp
