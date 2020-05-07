import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Form, Card, Button} from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  
  state={
		authedUser: '',
	}

	handleChange=(e)=>{
		const authedUser = e.target.value
		this.setState({authedUser})
	}
  
  handleSubmit=(e)=>{
		e.preventDefault()
		const { authedUser } = this.state
        const {dispatch }= this.props;    
    	dispatch(setAuthedUser(authedUser))
	}
  
  render() {
    const {users} = this.props;
 	const {authedUser} = this.state;

    return (
      <div>
        <Card.Title><h1>Sign In</h1></Card.Title>
        <Form className='login' onSubmit={this.handleSubmit} value={authedUser} onChange={this.handleChange} >
        <Form.Group controlId="exampleForm.SelectCustomSizeLg">
          <Form.Label><h3>Please login to continue</h3></Form.Label>
          <Form.Control as="select" size="lg" >
			{authedUser==='' && (
             <option>Please select a user</option>
             )}
      {users.map(user=>
       <option key={user.id} value={user.id}>{user.name} </option> 
      )}
         </Form.Control>   
      </Form.Group>
 	 <Button variant="primary" type="submit" disabled={authedUser === ''}>
    Submit
  </Button>
</Form>

  </div>
    )
  }
}

function mapStateToProps ({users}) {
 
  return {
   users: Object.values(users)    
  }
}

export default connect(mapStateToProps)(Login) 