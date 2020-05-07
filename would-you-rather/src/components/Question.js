import React, { Component } from 'react'
import { connect } from 'react-redux'
//import { formatQuestion  } from '../utils/_Data.js'
import {Tabs, Tab, Card} from 'react-bootstrap';


class Question extends Component {
  render() {
console.log('Question props', this.props)
 const {question_id, match} = this.props
    return (

      <div >
      Question
      </div>
      )
  }
}



export default connect()(Question) 