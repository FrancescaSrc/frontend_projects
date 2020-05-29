import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableHighlight } from 'react-native'
import { addDeck } from '../actions/index'
import  { red } from '../utils/colors'
import { connect } from 'react-redux'
import { createDeck } from '../utils/api'

class CreateDeck extends Component {

	state = {
		title: ''
	}

	handleChange=(input)=>{
		
		this.setState({	title: input})
	}

	handleSubmit=()=>{
		const { navigation } = this.props;
		const title = this.state.title;
		if(title !== '' || title !== undefined){
			 this.props.dispatch(addDeck(title))
			 createDeck(title)
			
		}
		this.setState(()=>({title: ''}));
		if(navigation){
			navigation.goBack()}
			else{
				console.log('cannot go back', this.props)
			}


	}

  render() {

  	const title = this.state.title
  	console.log(title)
  	
  	return (
  	<View>
		   <KeyboardAvoidingView behaviour='padding' style={styles.container}>
		   {this.props.deckId && (
		   	<View>
  			<Text style={styles.label}>Welcome! To start, please create your first deck!</Text>
  			</View>

		   	)}
  			<View>
  			<Text style={styles.label}>Please input a title for your deck</Text>
  			</View>

  		<TextInput 
  		 placeholder='Deck title'
  		 editable
         maxLength={40}
  		style={styles.textInput}
  		value={title}
  		onChangeText={this.handleChange}	
  		/>
  		
  		</KeyboardAvoidingView>


  		
  		<TouchableHighlight style={styles.btn} underlayColor='#E53224'
  		onPress={this.handleSubmit}
  		disabled={this.state.title === ''}
  		>
  		<Text style={styles.btnTxt}>Submit</Text>
  		</TouchableHighlight>
  		
</View>
  	


  		)}
	}

const styles = StyleSheet.create({
	container:{
		alignItems: 'center',
		justifyContent: 'center',
	},
	textInput:{
		backgroundColor: "#fff",
		borderStyle: "solid",
		borderColor: "gray",
		borderWidth: 1,
		width: "90%",
		height: 60,
		padding: 8,
		margin: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3,
		fontSize: 20,
	},
	btn:{
		backgroundColor: red,
		padding: 20,
		marginTop: 20,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 3
	},
	label: {
		color: 'black',
		fontSize: 40,
		marginTop:10,
		marginBottom: 15,
	},

	btnTxt: {
		color: '#fff',
		fontSize: 20,
	}
})

export default connect()(CreateDeck);