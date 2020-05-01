import React, { Component } from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
  state = {
    query: "",
    searchList: [],
    books: this.props.books}
  

updateQuery = (query) =>{
this.setState(()=>({
query: query
}))
}

 search(query){
 this.setState({query: query})
 BooksAPI.search(query)
			 .then((results)=>{
              if(typeof(results) === 'undefined'|| results.error){
              return this.setState({searchList: []})               
              }else{
       		  results.map(b=>{
              return this.setShelf(b)
                    })}
              
               this.setState({searchList: results})

               
             })
			.catch(err=>{                         
              console.log('Error: no book found '+ err)})
}

setShelf=(b)=>{
 b.shelf='none'
 let savedBook= this.props.books.filter(sb=>{ return sb.industryIdentifiers[0].identifier === b.industryIdentifiers[0].identifier});
 if(savedBook.length >0){
 b.shelf=savedBook[0].shelf
 }
}

  
  
render() {
	const { query, searchList} = this.state;

    const showResults = query === '' ? [] : searchList
  
return(
   <div className="search-books">
            <div className="search-books-bar" >     
      			<Link to="/" className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
               <input type="text" placeholder="Search by title or author" value={query} onChange={(event) =>{this.search(event.target.value)}} autoFocus/>				
              </div>
            </div>
        
     <div className="search-books-results">
					 {(!showResults) && (<p>'Sorry no results for your query'</p>)}
					{showResults.length > 0 && (                     
					<ol className="books-grid">
						{showResults.map((b)=>{
                        return(                          
						<li key={b.id}>                        
						<Book book={b} updateShelf={this.props.updateShelf} shelf={b.shelf}/>
						</li>)})
						}
					  </ol>)}
					
 				  
       </div>
</div>
  
)}
}
export default Search;