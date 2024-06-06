import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import './App.css';
import InfiniteScroll from 'react-infinite-scroll-component';

const apiKey = '239f28ba30e843718ea36f2ba4c41c3a';

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

    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
    });
  }

  // async updateNews() {
  //   this.props.setProgress(10);
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${this.props.category}&apiKey=${apiKey}&page=${
  //     this.state.page + 1
  //   }&pageSize=${this.props.pageSize}`;
  //   this.setState({ loading: true });
  //   this.props.setProgress(30);
  //   let response = await fetch(url);
  //   let data = await response.json();
  //   this.props.setProgress(70);
  //   data = data.articles;
  //   this.setState({
  //     articles: data,
  //     loading: false,
  //   });
  //   this.props.setProgress(100);
  // }

  // handelNextclick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  // handelPrevclick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  fetchMoreData = async () => {
    let pageNumber = this.state.page;
    pageNumber = pageNumber + 1;

    this.setState({ page: pageNumber });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${apiKey}&pageSize=${this.props.pageSize}&page=${pageNumber}`;

    // this.setState({ loading: true });
    let response = await fetch(url);
    let data = await response.json();
    console.log('resilts pagination', data);
    const filterdData =
      data?.articles.length > 0 &&
      this.state.articles.length > 0 &&
      data.articles.filter(
        (item) => !this.state.articles.some((item2) => item2.url === item.url)
      );
    this.setState({
      articles: this.state.articles.concat(filterdData),
      totalResults: data.totalResults,
      loading: false,
    });
  };

  render() {
    // console.log(this.state.page);
    return (
      <>
        <h1 className='text-center'style={{marginTop:"100px"}}>
          News Monkey - Top HeadLines On{' '}
          {this.capitalizeFirstLetter(this.props.category) + '.'}
        </h1>
        {this.state.loading && <Spinner />}

        <InfiniteScroll
          dataLength={this.state.articles?.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className='row'>
              {this.state.articles.map((element, index) => {
                return (
                  <div className='col-md-4' key={element.url}>
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
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
