import React, { Component } from 'react';
import Newsitem from './Newsitem';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
    };
  }

  async componentDidMount() {
    let url =
      'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=d1a83067ca2a4429a446468500e61923';
    let response = await fetch(url);
    let data = await response.json();
    data = data.articles;
    this.setState({ articles: data }, () => {
      console.log('data', this.state.articles);
    });
  }

    render() {
      console.log('state', this.state.articles)
    return (
      <div className='container'>
        <h2>News Monkey</h2>
        <div className='row'>
          {this.state.articles.length > 0 && this.state.articles.map((element) => {
            return (
              <div className='col md-4' key={element.url}>
                <Newsitem
                  Title={element?.title?.slice(0, 45)}
                  Description={element.description.slice(0, 40)}
                  imgurl={element.urlToImage}
                  NewsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
