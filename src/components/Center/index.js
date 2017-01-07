import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import './index.css'
import Card from '../Card'
import CenterCardHolder from '../CenterCardHolder'
import store from 'redux/store'

// Actions
import { reset } from 'redux/modules/game'

@connect(reducers => ({
  game: reducers.game
}))
export default class Center extends Component {

  static propTypes = {
    game: PropTypes.object
  }

  constructor(props) {
    super(props)

    this.state = {
      //numOccupiedCards: 0
    }

  }

  render() {
    const numCenterCards = this.props.game.numCenterCards
    const centerCards = []

    for(let i = 0, l = this.props.game.centerCards.length; i < l; i++) {
      const card = this.props.game.centerCards[i]

      centerCards.push(<CenterCardHolder key={i}>
        <Card
          {...card}
        />
      </CenterCardHolder>)
    }

    return (<div id="center">
      <ul id="centerCardHolders">
        {centerCards}
      </ul>
    </div>)
  }

}
