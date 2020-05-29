import { AsyncStorage } from 'react-native'
import { deckSample } from './_Data'
import { Notifications } from 'expo' 
import * as Permissions from 'expo-permissions';


 const DECK_STORAGE_KEY = 'MobileFlashcard:deck'
 const NOTIFICATION_KEY = 'MobileFlashcard:notifications'


export async function reloadSample(){
	await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deckSample))
	return deckSample
}

export async function getInitialData () {
	const dataStore = await AsyncStorage.getItem(DECK_STORAGE_KEY)
//	console.log('data storage', dataStore)
	if(dataStore === null || dataStore === {}){
		//load sample data
		await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deckSample))
		return deckSample
	}

	console.log('data  async', dataStore)

	return JSON.parse(dataStore);
}


export async function getDeck(title) {
	try{
		const storedData = await AsyncStorage.getItem(DECK_STORAGE_KEY)
		const deck = JSON.parse(storedData)[title]
		return deck
	}catch(err){
		console.log('Error while fetching the deck ' + err)
	}

}


export function createDeck(title) {
	//console.log('createDeck', title)
	AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[title]: {title, questions:[]},
	}))
	.catch(err=>{
		console.log(err);
	})
}

export async function addQuestion(title, card) {
	
	const deck = await getDeck(title);
	//console.log('card ', card)
	AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[title]: {
			questions:[...deck.questions, card]},
		}))
	.catch(err=>{
		console.log(err);
	})
}

export function removeDeckFromStorage(title) {
	console.log('remove title', title)
	AsyncStorage.getItem(DECK_STORAGE_KEY)
	.then((results)=>{
		const data = JSON.parse(results);		
		data[title] = undefined;
		delete data[title];
		console.log('results remove after removal', data)
		AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
	})
	.catch(err=>{
		console.log(err);
	})

}

export async function removeDecks() {
	
	try {
		await AsyncStorage.removeItem(DECK_STORAGE_KEY);
		return true;
	}
	catch(exception) {
		return false;
	}
}


export function createLocalNotification(){
	return {
    title: 'Flash Cards Reminder!',
    body: "👋 don't forget to complete your quiz for today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }

}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
    .catch(err=>console.log('Error in clear local notification', err))
}

export async function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
      	Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
          	console.log('status notification', status)
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate())
              tomorrow.setHours(24)
              tomorrow.setMinutes(0)
              console.log(tomorrow)
              Notifications.scheduleLocalNotificationAsync(
                createLocalNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
    .catch(err=>console.log('Error in set local notification', err))
}