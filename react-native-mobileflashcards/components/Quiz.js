import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, TouchableHighlight} from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { handleInitialData } from '../actions/index'
import  DeckDetail  from './DeckDetail'
import { white, red, black, green, gray} from '../utils/colors'
import ViewPager from "@react-native-community/viewpager";
import { setLocalNotification, clearLocalNotification } from '../utils/api'
import AddCard from '../components/AddCard'



class Quiz extends Component {

  state={
    correct: 0,
    show: false,
    answers: Array(this.props.deck.questions.length).fill(null)

  }
  componentDidMount() {
    clearLocalNotification()
    .then(setLocalNotification);}

  toggleAnswer = ()=>{
    this.setState({ show: !this.state.show });
  }

  handleAnswer = (id, type)=>{
    this.setState((current)=>{ 
      current.answers[id]= type,
      current.correct += type,
      current.show = false
    });
     this.toggleAnswer()
  }

 handleReset=()=>{
  this.setState({ 
    correct: 0,
    show: false,
    answers: Array(this.props.deck.questions.length).fill(null)

    });
 }



  render() {
   const { deckId, deck } = this.props;
   const questions = deck.questions
   const no_q= questions.length
   const correct = this.state.correct
   const score = ((correct / no_q) * 100).toFixed(0);


   return (

<View style={styles.container}>

{(this.state.answers[no_q-1] !== null) 
      ? ( 
      <View style={styles.resCard}>
        <Text style={styles.title}>Quiz Results</Text>   
        <Text style={styles.title}>Your score: </Text>
        <Text style={styles.results}>
        {correct} / {no_q} correct
        </Text>
        
        {score >= 80 && (
          <View>
            <Text style={styles.title}>You are doing great: </Text>
            <Text style={styles.results}>{score}% correct!! </Text>
          </View>
          )}

        {score < 80 && (
          <View>
            <Text style={styles.title}>You score is: </Text>
            <Text style={styles.results}>{score}% correct! </Text>
            <Text style={styles.title}>Please try again! </Text>
            </View>
          )}
        
        <TouchableHighlight 
          style={styles.btn1} 
          underlayColor='#EEE'
          activeOpacity={0.6}
          onPress={() => this.handleReset()}
          >
          <Text style={styles.btnTxt}>Reset Quiz</Text>
          </TouchableHighlight>

           <TouchableHighlight 
          style={styles.btn_gray} 
          underlayColor='#EEE'
          activeOpacity={0.6}
          onPress={() => this.props.navigation.navigate('DeckList')}
          >
          <Text style={styles.btnTxt}>Try another Deck</Text>
          </TouchableHighlight>

      </View>)
      : (
          
          <View style={styles.title}>
            <Text style={styles.title}>Quiz</Text>
        
        <ViewPager
       style={styles.viewPager}
       initialPage={0}>

         {questions.map((obj, id)=>{
           return( 

           <View style={styles.cardContainer} key={id+1}>

               <View style={styles.card}>
                 <Text style={styles.count}>
                 {id + 1} / {questions.length}
                 </Text>
               
               <Text style={styles.question}>{obj.question}</Text>
               {this.state.show && (
                 <Text style={styles.answer}>{obj.answer}</Text>)}
            </View>
             <TouchableHighlight 
             style={styles.btn2} 
             underlayColor='#E53224'
             activeOpacity={0.8}
             onPress={() => this.toggleAnswer()}
            >
            <Text style={styles.btnTxt2}>Show/Hide answer</Text>
            </TouchableHighlight>
            
            <TouchableHighlight 
            style={styles.btn1} 
            underlayColor='#EEE'
            activeOpacity={0.6}
            onPress={() => this.handleAnswer(id, 1)}
            disabled={this.state.answers[id] !== null}
            >
            <Text style={styles.btnTxt}>Correct</Text>
            </TouchableHighlight>
            

            <TouchableHighlight 
            style={styles.btn} 
            underlayColor='#fff'
            activeOpacity={0.6}
            onPress={() => this.handleAnswer(id, 0)}
            disabled={this.state.answers[id] !== null}
            >
            <Text style={styles.btnTxt}>Incorrect</Text>
            </TouchableHighlight>
            </View>

             )})}
           </ViewPager>
          </View>
          )}
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
    viewPager: {
      flex: 1,
      padding: 30,
      height: 100,
      width: 400,
        alignItems: 'center',
    justifyContent: 'center',


    },
    cardContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      
    },
resCard: {
  flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      height: 100,  

},
    card: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      borderColor: '#aaa',
      borderWidth: 2,
      borderRadius: 5,
      marginBottom: 5,
      padding:10,
      minWidth: 350,
      maxWidth: 400

    },

    title:{
     fontSize: 40,
     textAlign: 'center',
     marginBottom: 26,
     color: red

   },

   btnContainer:{
    flex: 1,
    margin: 10,
    flexBasis: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
  },
  title: {
    color: 'black',
    fontSize: 30,


  },
  question: {
    flex: 1,
    color: '#333',
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20

  },
  answer: {
    color: red,
    fontSize: 25,
      alignItems: 'center',
    justifyContent: 'center',

  },
  results: {
    color: red,
    fontSize: 35,
       alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,

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
    backgroundColor: green,
    padding: 20,
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: gray,
    borderWidth: 1,
  },

  btn2:{
    backgroundColor: white,
    padding: 10,
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: red,
    borderWidth: 1,

  },

   btn_gray:{
    backgroundColor: gray,
    padding: 20,
    marginTop: 20,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    borderColor: "#333",
    borderWidth: 1,

  },
  btnTxt: {
    color: white,
    fontSize: 20,
  },

  btnTxt2: {
    color: red,
    fontSize: 20,
  },
  btnTxt_gray: {
    color: "#333",
    fontSize: 20,
  }
})

 

function mapStateToProps(state, props){

  const deckId = props.route.params.title
  const deck = state[deckId]

    return{
      deckId,
      deck
    }
  }
  export default connect(mapStateToProps)(Quiz);