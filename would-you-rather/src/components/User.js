import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {
  render() {
   
    const {user} = this.props
    const {name, avatarURL, created, answered, score} = user
    return (    
      <div className="user-card flex-container leaderboard">
        <div className='avatar'><img src={avatarURL} className="Avartar" alt="Avatar" /></div>
		<div className='user-data leaderboard'>
		<h3>{name}</h3>
        <div className='results'><p className='answered'>Answered questions: {answered}</p>
		<p>Created questions: {created}</p></div>
		</div>
		<div className='score-wrapper'>
		<div className='score'>
		<h3 className='score-title'>Score</h3>
		<div className='score-value'>{score}</div>
		</div>
       </div>
 </div>
    )
  }
}


export default connect()(User) 