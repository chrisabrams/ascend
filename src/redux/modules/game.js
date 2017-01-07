export const ADD_CENTER_CARD = 'game/ADD_CENTER_CARD'
export const LOAD = 'game/LOAD'
export const LOAD_SUCCESS = 'game/LOAD_SUCCESS'
export const LOAD_FAIL = 'game/LOAD_FAIL'
export const REMOVE_CENTER_CARD = 'game/REMOVE_CENTER_CARD'
export const RESET = 'game/RESET'

const initialState = {
  cards: [], // List of all cards available for the deck
  cardsQuantity: [], // List of how many of each card
  centerCards: [],
  deck: [],
  numCenterCards: 1,
  void: []
}

import CotGCards from '../../cards/cotg/deck'
import CotGCardsQuantity from '../../cards/cotg/quantity'

initialState.cards = initialState.cards.concat(CotGCards)
initialState.cardsQuantity = initialState.cardsQuantity.concat(CotGCardsQuantity)

const cardsMap = new Map()
for(let i = 0, l = initialState.cards.length; i < l; i++) {
  const card = initialState.cards[i]
  cardsMap.set(card.id, card)
}

const cardsQuantityMap = new Map()
for(let i = 0, l = initialState.cardsQuantity.length; i < l; i++) {
  const card = initialState.cardsQuantity[i]
  cardsQuantityMap.set(card.id, card.quantity)
}

function buildDeck() {

  const deck = []

  for(let i = 0, l = initialState.cardsQuantity.length; i < l; i++) {
    const card = initialState.cardsQuantity[i]

    let count = 0
    while(count < card.quantity) {
      deck.push(cardsMap.get(card.id))

      count++
    }
  }

  return deck

}

/*
NOTE:
This uses the Durstenfeld shuffle method, with option to shuffle multiple iterations
@url: http://stackoverflow.com/a/12646864
*/
function shuffleDeck(deck = [], numTimes = 1) {

  let timesShuffled = 0

  while(timesShuffled < numTimes) {

    for(let i = 0, l = deck.length; i < l; i++) {
      const j = Math.floor(Math.random() * (i + 1))
      const tmp = deck[i]
      deck[i] = deck[j]
      deck[j] = tmp
    }

    timesShuffled++

  }

  return deck

}

function getRandomCardFromDeck(deck = []) {

  const index = Math.random() * deck.length >> 0
  const card = deck[index]
  deck.splice(index, 1) // Remove card from deck, as it is going into play

  return card

}

function getTopCardFromDeck(deck = []) {

  const index = 0
  const card = deck[index]
  deck.splice(index, 1) // Remove card from deck, as it is going into play

  return card

}

export default function reducer(state = initialState, action = {}) {

  let centerCards = []
  let deck = []

  switch (action.type) {

    case ADD_CENTER_CARD:

      const numCenterCards = state.numCenterCards + 1
      centerCards = state.centerCards
      deck = state.deck
      centerCards.push(getTopCardFromDeck(deck))

      return {
        ...state,
        centerCards,
        deck,
        numCenterCards
      }

    case REMOVE_CENTER_CARD:

      return {
        ...state,
        numCenterCards: (state.numCenterCards - 1 > 0) ? state.numCenterCards - 1 : 1
      }

    case RESET:

      deck = buildDeck()
      deck = shuffleDeck(deck, 3)

      centerCards = []
      for(let i = 0, l = initialState.numCenterCards; i < l; i++) {
        centerCards.push(getTopCardFromDeck(deck))
      }

      return {
        ...state,
        centerCards,
        deck
      }

    default:
      return state;
  }
}

export function addCenterCard() {

  return {
    type: ADD_CENTER_CARD
  }
}

export function loadFail(error) {
  return {
    type: LOAD_FAIL,
    error
  };
}

export function loadSuccess(data) {
  return {
    type: LOAD_SUCCESS,
    data
  };
}

export function load() {
  return (dispatch, getState, client) => {
    dispatch({
      type: LOAD
    });

    const date = new Date();
    date.setDate(date.getDate() - 30);

    return client
      .get(
        '/search/repositories?' +
        ['q=created:>' + date.toISOString(), 'sort=stars', 'order=desc'].join('&')
      )
      .then(data => {
        dispatch(loadSuccess(data.items));
      })
      .catch(error => {
        dispatch(loadFail(error));
      });
  };
}

export function removeCenterCard() {

  return {
    type: REMOVE_CENTER_CARD
  }
}

export function reset() {

  return {
    type: RESET
  }
}
