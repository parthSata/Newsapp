import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';

const apiKey = '40e960073f634044bcc8b7692dc4cf3d';

export class News extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}&pageSize=${this.props.pageSize}`;
    let response = await fetch(url);
    let data = await response.json();
    // data = data.articles;
    console.log('resilts', data.totalResults);
    this.setState({ articles: data.articles, totalResults: data.totalResults });
  }

  handelNextclick = async () => {
    const pagination = Math.ceil(this.state.totalResults / this.props.pageSize)
    console.log('pagination', pagination)
    console.log('results', this.state.totalResults)
    console.log('size', this.props.pageSize)

    if (
      this.state.page +1 > Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      // Do something when there are no more pages
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
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
    console.log('previous');
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
      // Do something when there are no more pages
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}&page=${
        this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
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
        {this.state.loading && <Spinner />}
        <div className='row'>
          {this.state.articles &&
            this.state.articles.map((element) => {
              return (
                <div className='col md-3' key={element.url}>
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
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
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
