import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import { handleInitialData } from '../actions/shared'
import { connect } from 'react-redux'
import Leaderboard from './Leaderboard'
import Home from './Home'
import Login from './Login'
import Menu from './Menu'
import UserCard from './UserCard'
import NewPoll from './NewPoll'
import NotFound from './NotFound'
import Footer from './Footer'
import {Container, Col, Row, Card} from 'react-bootstrap';
import { Route, Switch } from 'react-router-dom'


class App extends Component {
  
 state={
  authedUser: this.props.authedUser,
}

componentDidMount(){
  this.props.dispatch(handleInitialData())
}

render() {
  const {authedUser}= this.props
  
  return (
    <div className="App">
    <Container fluid="md">
      <div className="App-header">
        <div className="nav">
          <Menu />
        </div>
      </div>      

        <Row>
          <Col>
          
          {authedUser===null ? (
            <div className="login">
            <Card>
            
            <Card.Header><h3>Welcome to Would You Rather App</h3></Card.Header>
              <Card.Body>
                <img src={logo} className="App-logo" alt="logo" />
                <Login />
              </Card.Body>
            </Card>
            </div>
            ):(
             <div className="home">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/home" component={Home} />
                <Route path="/add" component={NewPoll} />
                <Route path="/questions/:question_id" component={UserCard} />
                <Route path="/results/:question_id" component={UserCard} />
                <Route path="/leaderboard" component={Leaderboard} />
				<Route  path="/error" component={NotFound} />
              </Switch>
				<Footer />
              </div>

)}          
            </Col>
          </Row>
        </Container>

      
      </div>
      );
    }
  }

  function mapStateToProps({authedUser}){
    return{authedUser}
  }

  export default connect(mapStateToProps)(App);
