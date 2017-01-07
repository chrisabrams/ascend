import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import './index.css'
import classNames from 'classnames'

import store from 'redux/store'

// Actions
import { reset } from 'redux/modules/game'

class CardCost extends Component {

  static propTypes = {
    amount: PropTypes.number,
  }

  render() {
    return (<div className='cardCost'>
      {this.props.amount}
    </div>)
  }

}

function normalizedTypes(type, faction) {

  let normalizedType = null

  switch(type) {

    case 'hero':

      switch(faction) {

        case 'enlightened':

          normalizedType = 'Enlightened Hero'

          break

      }

      break

  }

  return normalizedType

}

@connect(reducers => ({
  game: reducers.game
}))
export default class Card extends Component {

  static propTypes = {
    cost: PropTypes.number,
    faction: PropTypes.string,
    game: PropTypes.object,
    quote: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string
  }

  render() {
    return (<div className={classNames('card', `card__${this.props.faction}`)}>
      <div className={classNames('cardTitle')}>
        <h3>{this.props.title}</h3>
      </div>

      <div className='cardType'>
        <h4>{normalizedTypes(this.props.type, this.props.faction)}</h4>
      </div>

      <div className='cardText'>
        <p className='cardTextText'>{this.props.text}</p>
      </div>

      <div className='cardQuote'>
        <p className='cardQuoteText'>{this.props.quote}</p>
      </div>

      {this.props.type == 'hero' ? <CardCost amount={this.props.cost} /> : null}
    </div>)
  }

}
