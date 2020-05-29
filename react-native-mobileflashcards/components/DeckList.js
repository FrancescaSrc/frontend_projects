import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, ScrollView, TouchableHighlight} from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { handleInitialData } from '../actions/index'
import  CreateDeck  from './CreateDeck'
import  DeckDetail  from './DeckDetail'
import { white, red, black} from '../utils/colors'
import { handleReload } from '../actions/index'


class DeckList extends Component {

  state = {
    deckList: this.props
  }

 reloadSampleData= ()=>{
  this.props.dispatch(handleReload())
}


 render() {
   const { deckList } = this.props;

   return (
    <View>
    {(this.props.deckList.length === 0 || this.props.deckList.deck === {})  ? (
    
        <View >
        <Text style={styles.title}>There are no Decks available in your list.</Text>
        <Text style={styles.title}>Please create a new deck or load a sample!</Text>
         
        <CreateDeck />
        <TouchableHighlight 
        style={styles.btn} 
        underlayColor='#eee'
        activeOpacity={0.6}
        onPress={this.reloadSampleData} 
        >
        <Text style={styles.btnTxt2}>Load sample deck</Text>
        </TouchableHighlight>
         </View>
     ):(
 
        <ScrollView>
      <Text style={styles.mainTitle}>Your Decks</Text>
          {deckList.map((deck, id)=>{
                const cards = (deck.questions) ? deck.questions.length : 0
                return(         
                
                   <TouchableOpacity  style={styles.deckContainer} key={id}
                  onPress={() => this.props.navigation.navigate('DeckDetail', { title: deck.title})}            
                  >
                  <View >
                    <Text style={styles.btnTxt}>{deck.title}</Text>
                                   
                    <Text style={styles.btnTxt}>{cards} card(s)</Text>
                  </View>

                  </TouchableOpacity>
                  
                  )})}
               
               </ScrollView>           
                      )}

      </View>
    
)
    
 }
}



const styles = StyleSheet.create({
 
 mainTitle:{
   fontSize: 40,
   textAlign: 'center',
   marginBottom: 15,
   marginTop:20,
   color: red

 },

 deckContainer:{
  flex: 1,
  marginTop: 20,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: white,
  borderColor: 'gray',
  borderWidth: 2,
  borderRadius: 5,
  marginBottom: 5,
},
title: {
  color: "#333",
  fontSize: 20,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 10,
  marginBottom: 12,
},
btnTxt: {
  fontSize: 32
},
btn:{
    backgroundColor: white,
    padding: 20,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: red,
      borderWidth: 1,
  },
    

  btnTxt2: {
    color: red,
    fontSize: 20,
  }
	
})

function mapStateToProps (state) {
  const deckList = Object.values(state);
 return({deckList})
  
  
}

export default connect(mapStateToProps)(DeckList);