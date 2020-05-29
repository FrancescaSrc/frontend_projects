import { getInitialData } from '../utils/api'
import { createDeck } from '../utils/api'
import { reloadSample } from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const REMOVE_DECK = 'REMOVE_DECK'
export const RESET = 'RESET'

export function receiveDecks(decks){
	return {
		type: RECEIVE_DECKS,
		decks
	}
}


export function addDeck(title){
	return {
		type: ADD_DECK,
		title
	}
}

export function removeDeck(id){
	return {
		type: REMOVE_DECK,
		id
	}
}


export function addCard(deckId, card){
	return {
		type: ADD_CARD,
		deckId,
		card
	}
}

export function resetStore() {
  return {
    type: RESET
  };
}

export function handleInitialData(){
	return dispatch => {
		return getInitialData()
		.then(deckList=>{
			dispatch(receiveDecks(deckList))
		})
	}
}

export function handleAddDeck(title){
	return dispatch => {
	 dipatch(addDeck(title))
		.then(title=>{
			return createDeck(title)
		})
		
	}
}



export function handleReload(){
	return dispatch => {
		return reloadSample()
		.then(sampleData=>{
			dispatch(resetStore(sampleData))
		})
	}
}