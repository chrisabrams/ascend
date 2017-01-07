import React, {Component} from 'react'
import { connect } from 'react-redux'
import './index.css'

import store from 'redux/store'

// Actions
import { addCenterCard, removeCenterCard, reset } from 'redux/modules/game'

@connect(state => ({

}))
export default class Toolbar extends Component {

  constructor(props) {
    super(props)

    this.state = {
      settingsVisible: false
    }

  }

  render() {

    return (<div id="toolbar">
      <ul id="menu">
        <li>
          <a href="#settings" onClick={this.toggleSettingsMenu}>Settings</a>
        </li>
      </ul>

      <div id="settingsMenu">
        <ul>
          <li><a href="#reset" onClick={this.onReset}>Reset Game</a></li>
          <li><a href="#addCenterCard" onClick={this.onAddCenterCard}>Add Center Card</a></li>
          <li><a href="#removeCenterCard" onClick={this.onRemoveCenterCard}>Remove Center Card</a></li>
        </ul>
      </div>
    </div>)
  }

  onAddCenterCard(e) {
    e.preventDefault()

    store.dispatch(addCenterCard())
  }

  onRemoveCenterCard(e) {
    e.preventDefault()

    store.dispatch(removeCenterCard())
  }

  onReset(e) {
    e.preventDefault()

    store.dispatch(reset())

    let count = 1
    const interval = setInterval(function onResetInterval() {

      if(count < 6) {
        store.dispatch(addCenterCard())
        count++
      }
      else {
        clearInterval(interval)
      }

    }, 250)

  }

  toggleSettingsMenu(e) {
    e.preventDefault()

    if(this.state) {
      this.setState({settingsVisible: false})
    }
    else {
      this.setState({settingsVisible: true})
    }

  }

}
