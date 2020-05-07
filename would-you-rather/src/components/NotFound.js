import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

class NotFound extends Component {
  
  render() {
   
  return (
  <div>
    <Card className="poll footer">
         <Card.Body>
        <h1>Page not found</h1>		
		<p>Sorry. Please use one of the menu options or <a href="./home">go back</a>.</p>
		 </Card.Body>
        </Card>    
    </div>
  
  );
    }
  }


  export default NotFound;
