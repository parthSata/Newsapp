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
    const { country, category, pageSize } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      this.setState({
        articles: data.articles,
        totalResults: data.totalResults,
        loading: false,
      });
    } catch (error) {
      console.error('Failed to fetch news:', error);
      this.setState({ loading: false });
    }
  };

  fetchMoreData = async () => {
    const { country, category, pageSize } = this.props;
    let { page, articles } = this.state;
    page += 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&pageSize=${pageSize}&page=${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      const filteredData = data.articles.filter(
        (item) => !articles.some((article) => article.url === item.url)
      );
      this.setState({
        articles: articles.concat(filteredData),
        totalResults: data.totalResults,
        loading: false,
        page,
      });
    } catch (error) {
      console.error('Failed to fetch more news:', error);
    }
  };

  render() {
    const { articles, loading, totalResults } = this.state;
    const { category } = this.props;

    return (
      <>
        <h1 className="text-center" style={{ marginTop: '100px' }}>
          News Monkey - Top Headlines On {this.capitalizeFirstLetter(category)}
        </h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => (
                <div className="col-md-4" key={element.url}>
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
