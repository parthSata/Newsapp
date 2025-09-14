// File: /src/Components/News.js

import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 12,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    setProgress: PropTypes.func.isRequired,
  };

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    this.props.setProgress(10);
    // MODIFIED: URL now points to your own backend API route
    const url = `/api/news?category=${this.props.category}&page=${this.state.page}`;
    console.log("🚀 ~ News ~ updateNews ~ url:", url);

    this.setState({ loading: true });
    let response = await fetch(url);
    this.props.setProgress(30);
    let data = await response.json();
    this.props.setProgress(70);

    // Check if the API returned an error
    if (data.status === "error") {
      console.error("Error from API:", data.message);
      this.setState({ loading: false });
      // You might want to set an error state here to show a message to the user
      return;
    }

    this.setState({
      articles: data.articles || [],
      totalResults: data.totalResults || 0,
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    const pageNumber = this.state.page + 1;
    // MODIFIED: URL now points to your own backend API route for the next page
    const url = `/api/news?category=${this.props.category}&page=${pageNumber}`;

    this.setState({ page: pageNumber });
    let response = await fetch(url);
    let data = await response.json();

    // Check if the API returned an error
    if (data.status === "error") {
      console.error("Error fetching more data:", data.message);
      return;
    }

    this.setState({
      articles: this.state.articles.concat(data.articles || []),
      totalResults: data.totalResults || 0,
    });
  };

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "35px 0px", marginTop: "90px" }}
        >
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <Newsitem
                      Title={element.title ? element.title.slice(0, 45) : ""}
                      Description={
                        element.description
                          ? element.description.slice(0, 88)
                          : ""
                      }
                      imgurl={element.urlToImage}
                      NewsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source ? element.source.name : "Unknown"}
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
