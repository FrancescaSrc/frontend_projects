import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux'
import { white, red, black} from '../utils/colors'
import Feedback from '../components/Feedback'
import AddCard from '../components/AddCard'

class DeckDetail extends Component {



startQuiz = ()=>{
const deck = this.props.deck
if(deck.questions.length===0){

	this.props.navigation.navigate('Feedback', { title: deck.title })			
			
	}else{
	 this.props.navigation.navigate('Quiz', { title: deck.title })
	}
}				

	render() {
		const {deck, deckId} = this.props
		return (

			<View style={styles.container}>

		{this.props.deck=== undefined
					? (<View style={styles.container}><Text style={styles.title}>Your deck is empty.</Text></View>)
					: (
				<View style={styles.container}>
					
					<View style={styles.formContainer}>
					<View>
					<Text style={styles.title}>Deck - {deck.title}</Text>
					</View>
					<View style={styles.deckContainer}>
					<Text style={styles.label} key={deckId}>{deck.questions.length} cards</Text>
						</View>
					
					</View>
					<TouchableHighlight 
					style={styles.btn1} 
					underlayColor='#E53224'
					activeOpacity={0.6}
					onPress={() =>
						this.props.navigation.navigate('AddCard', { title: deck.title })
					}
					>
					<Text style={styles.btnTxt2}>Add Card</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.btn} 
					underlayColor='#fff'
					activeOpacity={0.6}
					onPress={this.startQuiz}
					>
					<Text style={styles.btnTxt}>Start Quiz</Text>
					</TouchableHighlight>

					<TouchableHighlight 
					style={styles.btn2} 
					underlayColor='#fff'
					activeOpacity={0.6}
					onPress={() =>
						this.props.navigation.navigate('RemoveDeck', { title: deck.title })
					}
					>
					<Text style={styles.btnTxt}>Remove Deck</Text>
					</TouchableHighlight>


				</View>)}

			
</View>
				
			)
	}
}

	const styles = StyleSheet.create({
		container:{
			flex: 1,
			alignItems: 'center',
  			justifyContent: 'center',
			paddingTop: 16,
			paddingLeft: 16,
			paddingRight: 16,
			paddingBottom: 16,
			backgroundColor: '#eee',
			
		},
		formContainer:{
			flex: 1,
			alignItems: 'center',
  			justifyContent: 'center',
			paddingTop: 16,
			paddingLeft: 16,
			paddingRight: 16,
			paddingBottom: 16,
			backgroundColor: '#fff',
			borderColor: '#aaa',
			borderWidth: 2,
			borderRadius: 5,
			marginBottom: 5,
		},
		title: {
			color: 'black',
			fontSize: 30,

		},
		label: {
			color: '#333',
			fontSize: 25,

		},
		btn:{
		backgroundColor: red,
		padding: 20,
		marginTop: 20,
		width: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3
	},
	btn1:{
		backgroundColor: white,
		padding: 20,
		marginTop: 20,
		width: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		borderColor: red,
		borderWidth: 1,
	},


	btn2:{
		backgroundColor: 'black',
		padding: 20,
		marginTop: 50,
		width: 200,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		borderColor: '#eee',
	},
		btnTxt: {
		color: white,
		fontSize: 20,
	},

	btnTxt2: {
		color: red,
		fontSize: 20,
	}
	});

	function mapStateToProps(state, props){
		const deckId = props.route.params.title
		const deck = state[deckId]
		
		return{
			deckId,
			deck,
			
		}
	}


	export default connect(mapStateToProps)(DeckDetail);