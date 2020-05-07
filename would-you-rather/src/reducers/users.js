import { RECEIVE_USERS } from '../actions/users'
import { ADD_ANSWER_USER } from '../actions/users'
import { ADD_QUESTION_TO_USER } from '../actions/users'

export default function users (state={}, action){
switch(action.type){
  case RECEIVE_USERS:
    return{
      ...state,
      ...action.users
    }

    case ADD_ANSWER_USER:
    	const {authedUser, qid, answer} = action;

    	return{
    		...state,
    		[authedUser]: {
    			...state[authedUser],
    			answers: {
    				...state[authedUser].answers,
    				[qid] :answer
    			}
    		}
    	};

      case ADD_QUESTION_TO_USER:
     // console.log('action ', action)
      const {author, id} = action;
      return{
        ...state,
        [author]: {
          ...state[author],
          questions: [...state[author].questions, id]
        }
      };
    
  default: 
    return state
}

}