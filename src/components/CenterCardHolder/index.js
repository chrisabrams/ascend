import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import './index.css'

import store from 'redux/store'

// Actions
import { reset } from 'redux/modules/game'

@connect(reducers => ({
  game: reducers.game
}))
export default class CenterCardHolder extends Component {

  static propTypes = {
    children: PropTypes.node
  }

  render() {
    return (<li className="centerCardHolder">{this.props.children}</li>)
  }

}
