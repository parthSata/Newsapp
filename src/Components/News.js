import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import './App.css';

const apiKey = '92a3cb76968846e69f7e4b66467df8d8';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'technology',
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

   capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsMonkey- ${this.capitalizeFirstLetter(
      this.props.category
    )}`;
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let response = await fetch(url);
    let data = await response.json();
    console.log('resilts', data);
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
    });
  }
  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${this.props.category}&apiKey=${apiKey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let response = await fetch(url);
    let data = await response.json();
    data = data.articles;
    this.setState({
      articles: data,
      loading: false,
    });
  }

  handelNextclick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };

  handelPrevclick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };

  render() {
    return (
      <div className='container'>
        <h1 className='text-center my-4 '>News Monkey - Top HeadLines On {this.capitalizeFirstLetter(
      this.props.category
    )+ "."} </h1>
        {this.state.loading && <Spinner />}
        <div className='row'>
          {this.state.articles &&
            this.state.articles.map((element) => {
              return (
                <div className='col md-3' key={element.url}>
                  <Newsitem
                    Title={element.title ? element.title : ''}
                    Description={
                      element.description
                        ? element.description.slice(0, 100)
                        : 'Hello This is Breaking News Of Today ..'
                    }
                    imgurl={
                      element.urlToImage
                        ? element.urlToImage
                        : 'https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE='
                    }
                    NewsUrl={element.url}
                    date={element.publishedAt}
                    author={element.author}
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
