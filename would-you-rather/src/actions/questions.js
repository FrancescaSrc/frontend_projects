export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const REMOVE_LASTQUESTIONANSWER = 'REMOVE_LASTQUESTIONANSWER'
export const ADD_QUESTIONANSWER = 'ADD_QUESTIONANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'
import { saveQuestionAnswer } from '../utils/api'
import { saveQuestion } from '../utils/api'
import { addAnswerUser } from '../actions/users'
import { addQuestionToUser } from '../actions/users'

export function receiveQuestions(questions){
	return{
		type: RECEIVE_QUESTIONS,
		questions,
	}
}

function addQuestionAnswer({authedUser, qid, answer}){
  console.log('info addQuestionAnswer', {authedUser, qid, answer})
	return{
		type: ADD_QUESTIONANSWER,
      	authedUser,
      	qid,
      	answer,
	}
}

function addQuestion(question){
  return{
    type: ADD_QUESTION,
        question
  }
}

export function handleAddQuestionAnswer(info){
    return (dispatch)=>{ 
    dispatch(addQuestionAnswer(info))
    dispatch(addAnswerUser(info))

    return saveQuestionAnswer(info)
          .catch(e=>{  
      console.warn("Error while saving the answer to the quesition" + e)

    })
}
        
}

export function handleSaveQuestion(question_info){
  console.log('question info', question_info)
  
return (dispatch)=>{
  
  return saveQuestion(question_info)
         .then(question=>{
          console.log('question in SaveQuestion', question)
          dispatch(addQuestion(question))
          dispatch(addQuestionToUser(question))
         })

      .catch(e=>{  
    console.warn("Error while saving the new question" + e)
 // dispatch(removeLastQuestionAnswer(info))
  })
        
}

}
