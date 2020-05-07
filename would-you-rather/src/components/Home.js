import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserCard from './UserCard'
import {Tabs, Tab, Card} from 'react-bootstrap';

class Home extends Component {

  state={
    type: ""
  }

  
  render() {
    const {homeUserData} = this.props; 
    const answered_questions = homeUserData.filter(question=>(question.answered===true))
    const unanswered_questions = homeUserData.filter(question=>(question.answered===false))
 
    return (
     <Card className="home">
      <Card.Body>
      <Tabs defaultActiveKey="unanswered" transition={false} id="noanim-tab-example">   
      <Tab eventKey="unanswered" title="Unanswered Questions" className="question-tab">
      {unanswered_questions.map((question) => (<UserCard pollView={question} key={question.id} pollType="view"/>))}    
      </Tab>

      <Tab eventKey="answered" title="Answered Questions" className="question-tab">
      {answered_questions.map((question) => (<UserCard pollView={question} key={question.id} pollType="view" /> ))}
      </Tab>

      </Tabs>    

      </Card.Body>
      </Card>
      
      )
  }
}

function mapStateToProps ({questions, authedUser, users}) {
  const answeredByUser = Object.keys(users[authedUser].answers) 
  const authors=Object.values(users)
  const homeUserData=Object.values(questions)
                    .map(question=>({  
                     id: question.id,
                     authorName: authors.filter(user=>((user.id===question.author)))[0].name,
                     avatarUrl: authors.filter(user=>((user.id===question.author)))[0].avatarURL,
                     optionOne: Object.values(question.optionOne)[1],
                     optionTwo: Object.values(question.optionTwo)[1],
                     answered: (answeredByUser.includes(question.id))? true : false,
                   }))
  
  

  return {
   authedUser,
   homeUserData
 }
}

export default connect(mapStateToProps)(Home) 