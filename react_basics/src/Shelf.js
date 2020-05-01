import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book'

class Shelf extends Component {
  
render(){
 const {books, name, updateShelf} = this.props
return(
 
  	<div className="list-books-content">
            <div>               
                  <div className="bookshelf">
                  <h2 className="bookshelf-title">{name}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
						{books.map((b)=>
						<li key={b.id}>
						<Book book={b} updateShelf={updateShelf} shelf={b.shelf} /></li>)}
					  </ol>
                    </div>
                  </div>
              	</div>
            </div>  
  )
}
  
}
Shelf.propTypes = {
  books: PropTypes.array
};


export default Shelf;