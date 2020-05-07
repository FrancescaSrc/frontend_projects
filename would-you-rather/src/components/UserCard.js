import React, { Component } from 'react'
import { connect } from 'react-redux'
import PollView from './PollView';
import Poll from './Poll';
import Results from './Results';
import { Redirect } from 'react-router-dom'; 

class UserCard extends Component {

  state={
    pollType: this.props.pollType
  }

  
  render() {
    const {pollView, pollData, pollResults} = this.props
    const { pollType } =  this.state 


  return (
    <div>
   {pollData.type === 'notFound' && (<Redirect push to={`/error`} />)}
   {this.state.pollType === 'view' && (
      <div className="user-card" key={pollView.id}>
      <PollView question={pollView} pollType={pollType}/>

      </div>
      )}

     {pollData.type === 'poll'  && (
         <div className="poll-card" key={this.props.question_id}>
        <Poll question_id={pollData.id} pollData={pollData}  pollType={pollData.type}/></div>
    )}

    {pollData.type === 'results' && (
         <div className="poll-card" key={this.props.question_id}>
        <Results question_id={pollResults.id} pollResults={pollData}  pollType={pollResults.type}/></div>
    )}


    
    </div>
    
    )
  }
}

function mapStateToProps({ questions, authedUser, users }, {match}) {
  const answeredByUser = Object.keys(users[authedUser].answers)
  let pollData={}
  let pollResults={}
  let pollQuestion=""
  
  if(match && match.path.includes('questions')){
      let question_id= match.params.question_id
      pollQuestion=questions[question_id]
      const authors=Object.values(users)
      if(pollQuestion){
      pollData={  
         id: pollQuestion.id,
         authorName: authors.filter(user=>((user.id===pollQuestion.author)))[0].name,
         avatarUrl: authors.filter(user=>((user.id===pollQuestion.author)))[0].avatarURL,
         optionOne: Object.values(pollQuestion.optionOne)[1],
         optionTwo: Object.values(pollQuestion.optionTwo)[1],
         answered: (answeredByUser.includes(pollQuestion.id) ? true : false),
         type: "poll"
       }
      
      }else{
      pollData={  
         type: "notFound"
       }      
      }
      
  }else if(match && match.path.includes('results')){
      
      let question_id= match.params.question_id
      pollResults=questions[question_id]
      const authors=Object.values(users)
      if(pollResults){
      pollData={  
         id: pollResults.id,
         authorName: authors.filter(user=>((user.id===pollResults.author)))[0].name,
         avatarUrl: authors.filter(user=>((user.id===pollResults.author)))[0].avatarURL,
         optionOne: Object.values(pollResults.optionOne)[1],
         optionTwo: Object.values(pollResults.optionTwo)[1],
         votesOptionOne: Object.values(pollResults.optionOne)[0],
         votesOptionTwo: Object.values(pollResults.optionTwo)[0],
         type: (match.path.includes('undefined')) ? "undefined": "results"
       } 
      }else{pollData={  
         type: "notFound"
       }
      }
  }
  
  return {
    authedUser,
    questions,
    pollData,
    pollResults,
   
  };
}


export default connect(mapStateToProps)(UserCard) 