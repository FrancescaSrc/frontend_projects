import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {


changeShelf= event =>{
	this.props.updateShelf(this.props.book, event.target.value)
     }


render() {
    const { book, shelf } = this.props;
  
return(
     
     <div className="book" key={book.id}>
        <div className="book-top">
<div className="book-cover"  style={book.imageLinks && ({ width: 128, height: 193, backgroundImage:`url(${book.imageLinks.smallThumbnail})` })} alt={book.title} >
</div>
{!book.imageLinks && (<div className="book-cover" style={{width: 128, height: 193, backgroundImage:'url(./icons/book_cover.jpg)'}}  alt={book.title} ></div>)} 

                            <div className="book-shelf-changer">
                              <select id={book.id} onChange={this.changeShelf} value={shelf}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
						  {book.authors && (<div className="book-authors">{book.authors}</div>)}
						  {!book.authors && (<div className="book-authors">Author unknown</div>)}
                        </div>
     
   
   		)
     
	}
}
Book.propTypes = {
  book: PropTypes.object
};

export default Book;