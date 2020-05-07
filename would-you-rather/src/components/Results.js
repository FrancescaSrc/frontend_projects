import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, ProgressBar } from 'react-bootstrap';
import { FaBookmark } from 'react-icons/fa';

class Results extends Component {
	render() {
		const {pollResults, user} = this.props
		const {authorName, avatarUrl, optionOne, optionTwo, votesOptionOne, votesOptionTwo} = pollResults
		const vote_tot= votesOptionOne.length+votesOptionTwo.length
		const votes1 = ((votesOptionOne.length / vote_tot)*100).toFixed(2);
		const votes2 = ((votesOptionTwo.length / vote_tot)*100).toFixed(2);
		const style1 = {
		      color:"#0AAAAA",
		      backgroundColor: "#b9e5e2",		
		    };
		 const style2 = {
		      color: "#333",
		      backgroundColor: "#f1f1f1",
		    };
		
		const color1= (votes1>votes2) ? style1: style2
		const color2= (votes1<votes2) ? style1 : style2
		
		const userVote = user.answers[pollResults.id];

		return (
			<Card className="results">			
				<Card.Body>
				<h2>Asked by {authorName}</h2>
					<div className="flex-container">
					<div className='avatar'><img src={avatarUrl} className="Avartar" alt="Avatar" /></div>
						<div className='poll-data'>
							<h3>Results:</h3>
						<Card style={color1}>
						<Card.Body>
						{userVote === 'optionOne' && (<div className="selected vote">
							<FaBookmark style={{width: 120, height:100, color: "orange"}} /><p>Your <br />vote</p>
							</div>)}
						<div className='user-data result' >
						<h4 style={color1}>Would you rather {optionOne} </h4>
						
						<ProgressBar now={votes1} label={`${votes1}%`} />
						<p className='result'>{votesOptionOne.length} out of {vote_tot}</p>
						</div>	

						</Card.Body>
						</Card>
					
							
						<Card className='poll-data2' style={color2}>
						<Card.Body>
						{userVote === 'optionTwo' && (<div className="selected vote" >
							<FaBookmark style={{width: 120, height:100, color: "orange"}} /><p>Your <br />vote</p></div>)}
							<div className='user-data result2' >
							<h4 style={color2}>Would you rather {optionTwo}</h4>
							<ProgressBar now={votes2} label={`${votes2}%`} />
							<p className='result'>{votesOptionTwo.length} out of {vote_tot}</p>
							</div>
							               		
						</Card.Body>
						</Card>
					

						</div> 	
					</div>
				</Card.Body>
			</Card>
			)
		}
	}

	function mapStateToProps ({authedUser, users}) {
		const user = users[authedUser]

		return {
			user

		}
	}





	export default connect(mapStateToProps)(Results) 