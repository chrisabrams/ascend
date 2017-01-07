import Board from '../../components/Board'
import React, { Component } from 'react'
import { head } from 'config'
import Helmet from 'react-helmet'

export default class Game extends Component {
  render() {

    return (<div>
      <Helmet {...head}/>
      <Board />
    </div>)
  }
}
