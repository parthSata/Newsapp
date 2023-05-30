import React, { Component } from 'react';
import Newsitem from './Newsitem';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults:0
    };
  }

  async componentDidMount() {
    let url =
      'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d1a83067ca2a4429a446468500e61923&pageSize=20';
    let response = await fetch(url);
    let data = await response.json();
    data = data.articles;
    this.setState({ articles: data, totalResults: data.totalResults });
  }

  handelNextclick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
     
    } else {
      let url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=d1a83067ca2a4429a446468500e61923&page=${
        this.state.page + 1
      }&pageSize=12 `;
      let response = await fetch(url);
      let data = await response.json();
      data = data.articles;
      this.setState({
        page: this.state.page + 1,
        articles: data,
      });
    }
  };

  handelPrevclick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
      // Do something when there are no more pages
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=d1a83067ca2a4429a446468500e61923&page=${
        this.state.page - 1
      }&pageSize=12`;
      let response = await fetch(url);
      let data = await response.json();
      data = data.articles;
      this.setState({
        page: this.state.page - 1,
        articles: data,
      });
    }
  };

  render() {
    return (
      <div className='container'>
        <h1>News Monkey</h1>
        <div className='row'>
          {this.state.articles &&
            this.state.articles.map((element) => {
              return (
                <div className='col md-2' key={element.url}>
                  <Newsitem
                    Title={element.title ? element.title.slice(0, 40) : ''}
                    Description={
                      element.description
                        ? element.description.slice(0, 80)
                        : ''
                    }
                    imgurl={element.urlToImage ? element.urlToImage : ''}
                    NewsUrl={element.url}
                  />
                </div>
              );
            })}
        </div>
        <div className='container d-flex justify-content-between'>
          <button
            type='button'
            className='btn btn-dark'
            disabled={this.state.page <= 1}
            onClick={this.handelPrevclick}
          >
            &larr; Previous
          </button>
          <button
            type='button'
            className='btn btn-dark'
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            onClick={this.handelNextclick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
