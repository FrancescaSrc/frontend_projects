import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {red } from '../utils/colors'
import { addQuestion } from '../utils/api'
import { addCard } from '../actions/index'

class AddCard extends Component {

	state = {
		question: '',
		answer: '',
	}

	handleQuestionInput=(input)=>{	
		this.setState({	question: input})
	}

	handleAnswerInput=(input)=>{	
		this.setState({	answer: input})
	}

	handleSubmit=()=>{
		const { title } = this.props;		
		const { question, answer } = this.state;
		const card = { question: question,
				      answer: answer}; 
		this.props.dispatch(addCard(title, card))
		addQuestion(title, card)
			
		
		this.setState(()=>({
			question: '',
			answer: '',
		}));
		if(this.props.navigation){
			this.props.navigation.goBack();
		}else{
			this.props.navigation.navigate('DeckList')
		}

		

	}


	render() {
		const question = this.state.question
		const answer = this.state.answer
		return (
		<View style={styles.container}>
			
				<KeyboardAvoidingView behaviour='padding'>
			<View>
				<Text style={styles.label}>Your question</Text>
			</View>


				<TextInput 
				placeholder='Please type your question'
				style={styles.textInput}
				value={question}
				onChangeText={this.handleQuestionInput}
				/>

			
			
			<View>
				<Text style={styles.label}>Type your answer</Text>
			</View>


				<TextInput 
				placeholder='Please type the expected answer'
				style={styles.textInput}
				value={answer}
				onChangeText={this.handleAnswerInput}
				/>
			
			<TouchableOpacity style={styles.btn} 
			underlayColor='#d4271b' 
			onPress={this.handleSubmit}
			disabled={this.state.question === '' || this.state.answer === ''}>

			<Text style={styles.btnTxt}>Submit</Text>
			</TouchableOpacity>
			</KeyboardAvoidingView>
			
</View>


			)}
	}

	const styles = StyleSheet.create({
		container:{
			alignItems: 'center',
			justifyContent: 'center',
			borderColor: "#eee",
			borderWidth: 1,
			marginTop: 20,
		},
		textInput:{
			backgroundColor: "#fff",
			borderStyle: "solid",
			borderColor: "gray",
			borderWidth: 1,
			width: "100%",
			height: 60,
			padding: 8,
			marginTop: 20,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 3,
			fontSize: 20,

		},
		btn:{
			backgroundColor: red,
			padding: 20,
			width: 200,
			marginTop: 20,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 3
		},
		label: {
			color: 'black',
			fontSize: 40,

		},

		btnTxt: {
			color: '#fff',
			fontSize: 20,

		}
	})

	function mapStateToProps(state, props){
		const title = props.route.params.title
		
		return{
			title,
			
		}
	}


	export default connect(mapStateToProps)(AddCard);