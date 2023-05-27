import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {
  render() {
    return (
        <div>
            <h1>This is News</h1>
        <Newsitem/>
      </div>
    )
  }
}

export default News
