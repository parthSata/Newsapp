import React, { Component } from 'react';
import NewsItem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const apiKey = '53ce2a819b2d47f8aa3d9d0984abda62';

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

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
  }

  async componentDidMount() {
    this.fetchNews();
  }

  fetchNews = async () => {
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    try {
      let response = await fetch(url);
      if (response.status === 426) {
        console.error('426 Upgrade Required: The server requires the client to switch protocols.');
        return;
      }
      let data = await response.json();
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false });
    }
  };

  fetchMoreData = async () => {
    let pageNumber = this.state.page + 1;
    this.setState({ page: pageNumber });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&pageSize=${this.props.pageSize}&page=${pageNumber}`;
    try {
      let response = await fetch(url);
      if (response.status === 426) {
        console.error('426 Upgrade Required: The server requires the client to switch protocols.');
        return;
      }
      let data = await response.json();
      const filteredData = data.articles.filter(
        (item) => !this.state.articles.some((item2) => item2.url === item.url)
      );
      this.setState({
        articles: this.state.articles.concat(filteredData),
        totalResults: data.totalResults,
      });
    } catch (error) {
      console.error('Error fetching more news:', error);
    }
  };

  render() {
    return (
      <>
        <h1 className='text-center' style={{ marginTop: "100px" }}>
          News Monkey - Top Headlines On {this.capitalizeFirstLetter(this.props.category)}
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className='row'>
              {this.state.articles.map((element) => (
                <div className='col-md-4' key={element.url}>
                  <NewsItem
                    title={element.title || ''}
                    description={element.description ? element.description.slice(0, 100) : 'No description available.'}
                    imgUrl={element.urlToImage || 'https://media.istockphoto.com/id/1311148884/vector/abstract-globe-background.jpg?s=612x612&w=0&k=20&c=9rVQfrUGNtR5Q0ygmuQ9jviVUfrnYHUHcfiwaH5-WFE='}
                    newsUrl={element.url}
                    date={element.publishedAt}
                    author={element.author}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
