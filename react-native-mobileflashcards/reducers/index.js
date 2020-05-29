import {RECEIVE_DECKS, ADD_DECK, ADD_CARD, REMOVE_DECK, RESET} from '../actions/index'
import { deckSample } from '../utils/_Data';

export default function decks(state={}, action){
	switch(action.type){
	case RECEIVE_DECKS:
	 return{
	 ...state,
	 ...action.decks
	 };
	 case ADD_DECK:
	
	 	const { title } = action;
	 	
	 	return {
	 	...state,
	 	[title]: {
	 	title,
	 	questions: []
	 	 }
	 	};
	 case ADD_CARD:
	  console.log('action add card is ', action)
	   console.log('action state is ', state)
	  const { deckId, card } = action;
	  return {
	  	...state,
	  	[deckId]: {
	  		...state[deckId],
	  		questions: [...state[deckId].questions, card]
	  	}
	  };

	  case REMOVE_DECK:
	  console.log('action remove deck is ', action)
	  const { id }  = action;
	  //return state without the object
	  console.log('remove id from state', id)
	  const {[id]:contents, ...NState} = state 
	  console.log('old state ', state)
		console.log('new state ', NState)
		state = NState
	  return state;

	 case RESET:
      return deckSample;

	  default:
	  return state;

	}

	
    
}

