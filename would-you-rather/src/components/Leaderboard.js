import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { formatQuestion  } from '../utils/_Data.js'
import User from './User'

class Leaderboard extends Component {
  render() { 
    const {leaderboardUsers} = this.props;
    return (
      <div className='leaderboard'>
        <h3 className='center'>Leaderboard</h3>
        <ul className='leaderboard-list'>
          {leaderboardUsers.map((user) => (     
            <li key={user.id}>
              <User user={user}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({users}) {
 
 let leaderboardUsers = 
        Object.values(users).map(user=>({
          id: user.id,
          name: user.name,
          avatarURL: user.avatarURL,
          answered: Object.keys(user.answers).length,
          created: user.questions.length,
          score: Object.keys(user.answers).length+user.questions.length,
        }))
 		.sort((a,b)=> b.score - a.score)

  return {
   leaderboardUsers      
  }
}

export default connect(mapStateToProps)(Leaderboard) 