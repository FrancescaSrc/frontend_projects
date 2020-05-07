import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import { Card, Form } from 'react-bootstrap';
import { handleSaveQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom'; 

class NewPoll extends Component {

  state={
    option1:"",
    option2:"",
    submitted: false
  }

  handleChange = (e)=>{
    e.preventDefault()
  //  console.log(e.target.value)
  this.setState({
    [e.target.id]: e.target.value
  })
}

handleSubmitPoll =(e)=>{ 
  e.preventDefault()
  const valid =this.addNewQuestion()
  console.log(valid)
  console.log('valid', valid)
  if(valid){
    this.setState({
      option1: "",
      option2: "",
      submitted: true
    })
  }
}

addNewQuestion= async function(){  
  const {authedUser, dispatch} = this.props
  const author= authedUser 
  const optionOneText= this.state.option1
  const optionTwoText= this.state.option2
  return await dispatch(handleSaveQuestion({ optionOneText, optionTwoText, author }))
}

render() {
   // console.log('newQuestion props', this.props)
 //    console.log('state in new question add', this.state)

 if (this.state.submitted === true) {
  return <Redirect to="/" />;
}

return (
  
  <div>
  <Card className="new-poll">
  <Card.Body>
  <h3>Create New Question</h3>    
  <div className='user-data'>
  <p className='user-data'>Complete the question</p>

  <h4>Would you rather...</h4>
  <div className='new-poll'>
  <Form.Group >
  <div className="poll-input">
  <Form.Control
    type="text" 
    id="option1" 
    name="option1"
    size="lg"
    placeholder="Type here option 1"
    value={this.state.option1}
    onChange={this.handleChange} />

  </div>
  <div className='divider'><hr className='divider' /><p>OR</p></div>

  <div className="poll-input2">
  <Form.Control 
    type="text" 
    id="option2" 
    name="option2"
    size="lg"
    placeholder="Type here option 2"
    value={this.state.option2}  
    onChange={this.handleChange}/>
  </div>
  <Button variant="primary" 
    style={{borderColor: "#0aaaaa", 
    backgroundColor: "#0aaaaa", color:"white", margin: 5, aHover: "#0aaaaa"}} 
    type="submit" block 
    onClick={(e)=>this.handleSubmitPoll(e)} disabled={this.state.option1 === ''|| this.state.option1 === ''}> 
    Create new question
  </Button>
  </Form.Group> 
  </div>
  </div>
  </Card.Body>
  </Card>
  </div>)
}
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser,

  };
}



export default connect(mapStateToProps)(NewPoll) 