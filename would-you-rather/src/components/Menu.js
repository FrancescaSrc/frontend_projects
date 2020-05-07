import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Nav, Navbar} from 'react-bootstrap';
import { setAuthedUser } from '../actions/authedUser';
import { NavLink } from 'react-router-dom';



class Menu extends Component {
  handleLogout=()=>{
    const {dispatch }= this.props;
 dispatch(setAuthedUser(null))
}

render() {
   const {users, authedUser} = this.props

   return (
    <div>
    <Navbar collapseOnSelect  bg="white" expand="lg" variant="light" >
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    
    <Nav className="mr-auto" fill variant="pills" defaultActiveKey="/home">

    <Nav.Link name="home" as={NavLink} to="/" exact>Home</Nav.Link>
    <Nav.Link name="leaderboard" as={NavLink} to="/leaderboard">Leader Board</Nav.Link>
    <Nav.Link name="add" as={NavLink} to="/add">Add Question</Nav.Link>
    
    {(authedUser !== null) && (
      <Navbar.Collapse >
      <Navbar.Text >
      <span> Signed in as: <img src={users[authedUser].avatarURL} alt="avatar icon" style={{height:60, width:60, margin:"0 2px"}}  /></span>
      {users[authedUser].name} <a href="home" onClick={this.handleLogout}>Logout</a>
      </Navbar.Text>
      </Navbar.Collapse>

      )}
      </Nav>
      </Navbar.Collapse>
      </Navbar>
      </div>
      )
    }
  }

  function mapStateToProps ({users, authedUser}) {

    return {
     authedUser,
     users
   }
   
 }

 export default connect(mapStateToProps, {setAuthedUser})(Menu) 