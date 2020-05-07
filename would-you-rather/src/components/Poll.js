import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Button } from 'react-bootstrap';
import { handleAddQuestionAnswer } from '../actions/questions';
import { Redirect } from 'react-router-dom'; 
 
class Poll extends Component {
  
  state={
  option:"",
  pollType: this.props.pollType,
  answered: false
  }
 
handleChange = (e)=>{
  const choice= e.target.value
  this.setState({option: choice})
}

  handleSubmitResults =(e)=>{ 
     
  console.log("state after handle change", this.state)
  e.preventDefault()
    this.setState({
      pollType: 'results',
    })
    //save question in state
   this.addQuestion()
}

addQuestion= function(){
if(this.state.option !== ''){
    const {authedUser, question_id, dispatch} = this.props 
    const answer= this.state.option
    const qid=question_id
     dispatch(handleAddQuestionAnswer({authedUser, qid, answer}))
    }
}
    
  render() {
    const {pollData, question_id } = this.props
	const { authorName, avatarUrl, optionOne, optionTwo} = pollData
	const { pollType } = this.state

    return (
    <div>
   {pollType==='results' && (<Redirect push to={`/results/${question_id}`}/>)}
    <div>
        <Card className="poll">
          <Card.Body>
            <h3>{authorName} asks:</h3>
            <div className="flex-container" >
              <div className='avatar'><img src={avatarUrl} className="Avartar" alt="Avatar" /></div>    
              <div className='user-data'>

                <h4>Would you rather</h4>
                <div className='options'>
                  <form className="polls">
                    <div className="poll-input">
                    <input 
                    type="radio" 
                    id="optionOne" 
                    name="optionOne"
                    value="optionOne"
                    checked={this.state.option === 'optionOne'} 
                    onChange={this.handleChange} />
                    <label htmlFor="optionOne">{optionOne}</label>
                    </div>

                    <div className="poll-input">
                    <input 
                    type="radio" 
                    id="optionTwo" 
                    name="optionTwo" 
                    value="optionTwo" 
                    checked={this.state.option === 'optionTwo'} 
                    onChange={this.handleChange}/>
                    <label htmlFor="optionTwo">{optionTwo}</label>
                    </div>
                    <Button variant="primary" 
                    style={{borderColor: "#0aaaaa", 
                    backgroundColor: "#0aaaaa", color:"white", margin: 5, aHover: "#0aaaaa"}} 
                    type="submit" block 
                    onClick={(e)=>this.handleSubmitResults(e)} disabled={this.state.option === ''}> 
                    Submit response
                    </Button>
                  </form> 
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
   </div>
	 </div>)
  }
}
function mapStateToProps({ authedUser }) {
    return {
    authedUser,   
  };
}

export default connect(mapStateToProps)(Poll) 