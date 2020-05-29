import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { addDeck } from '../actions/index'
import  { red } from '../utils/colors'
import { connect } from 'react-redux'
import { removeDeck } from '../actions/index'
import { removeDeckFromStorage } from '../utils/api'

class CreateDeck extends Component {



handleSubmit=()=>{
		const title = this.props.route.params.title;
		this.props.dispatch(removeDeck(title))
		removeDeckFromStorage(title)
		
		this.props.navigation.navigate('DeckList')

	}

  render() {
  	console.log('props removeDeck', this.props)
  	const title = this.props.route.params.title;
  	
  	return (
  	<View style={styles.container}>
		   		
  			<Text style={styles.label}>Are you sure you want to remove your deck "{title}" and all of its contents?</Text>
   		
  		<TouchableHighlight style={styles.btn} underlayColor='#E53224'
  		onPress={this.handleSubmit}
  		
  		>
  		<Text style={styles.btnTxt}>Yes, remove</Text>
  		</TouchableHighlight>
  		
</View>
  	


  		)}
	}

const styles = StyleSheet.create({
	container:{
			flex: 1,
			alignItems: 'center',
  			justifyContent: 'center',
			paddingLeft: 16,
			paddingRight: 16,
			paddingBottom: 16,
			backgroundColor: '#eee',
			
		},
	
	btn:{
		backgroundColor: red,
		padding: 20,
		marginTop: 20,
		width: 250,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3
	},
	label: {
		color: 'black',
		fontSize: 40,
		alignItems: 'center',
  		justifyContent: 'center',
	},

	btnTxt: {
		color: '#fff',
		fontSize: 20,
	}
})

export default connect()(CreateDeck);