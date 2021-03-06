import React, { Component, PropTypes } from 'react'
import { head } from 'config'
import Helmet from 'react-helmet'
import './App.css'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    const { children } = this.props;

    return (<div>
      <Helmet {...head}/>
      {children}
    </div>)
  }
}
