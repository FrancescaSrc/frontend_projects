import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableHighlight} from 'react-native'
import { connect } from 'react-redux'
import { white, red, black} from '../utils/colors'
import AddCard from '../components/AddCard'

class Feedback extends Component {

	render() {
		return (
			<View style={styles.container}>
			<Text style={styles.title}>Sorry, there are no cards to start the Quiz. Please, create a card first.</Text>		
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

	title: {
		color: 'black',
		fontSize: 30,
	},

});

export default connect()(Feedback);