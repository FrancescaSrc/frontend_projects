import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'; 


class PollView extends Component {

  state={
    pollType: this.props.pollType,
    answer: ''
  }

  handleViewPoll=(e)=>{
    e.preventDefault()
   this.setState({
    pollType:"poll"
   })

 }

 handleViewResults=(e)=>{
   this.setState({pollType: "results"})
 }

 render() {
   const {id, authorName, avatarUrl, optionOne, answered} = this.props.question
   const { pollType } = this.state
   return (
    <div>
    {pollType==='poll' && (<Redirect push to={`/questions/${id}`} />)}
    {pollType==='results' && (<Redirect push to={`/results/${id}`} />)}
    <h3>{authorName} asks:</h3>
    <div className="flex-container" >
    <div className='avatar'><img src={avatarUrl} className="Avartar" alt="Avatar" /></div>    
    <div className='user-data'>

    <h4>Would you rather</h4>
    <div className='options'>

    <p>{optionOne.slice(0,25)}...</p>

    {!answered ? (
        <div>
        <Button variant="primary" 
        style={{borderColor: "#0aaaaa", backgroundColor: "white", color:"black", margin: 5}} 
        type="submit" block 
        onClick={this.handleViewPoll}>
        View Poll
        </Button></div>)
    : (
        <div>
        <Button variant="primary" 
        style={{borderColor: "#0aaaaa", backgroundColor: "#0aaaaa", color:"white", margin: 5, aHover: "#0aaaaa"}} 
        type="submit" block onClick={this.handleViewResults}> 
        View Results
        </Button></div>) }
    </div>
    </div>
    </div>
    </div>
    )
  }
}




export default connect()(PollView) 