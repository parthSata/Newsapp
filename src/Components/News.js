// File: /src/Components/News.js

import React, { Component } from "react";
import Newsitem from "./Newsitem"; // Assuming Newsitem is in the same folder
import Spinner from "./Spinner"; // Assuming Spinner is in the same folder
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "IN",
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
      error: null, // State to hold any error messages
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsApp`;
  }

  async componentDidMount() {
    this.updateNews();
  }

  async updateNews() {
    this.props.setProgress(10);
    // CHANGED: URL now points to your own API endpoint
    const url = `/api/news?category=${this.props.category}&page=${this.state.page}`;

    this.setState({ loading: true });
    let response = await fetch(url);
    this.props.setProgress(30);
    let data = await response.json();
    this.props.setProgress(70);

    // Error handling for the fetch call
    if (data.status === "error") {
      this.setState({ loading: false, error: data.message });
      console.error("Error from API:", data.message);
    } else {
      this.setState({
        articles: data.articles || [],
        totalResults: data.totalResults || 0,
        loading: false,
        error: null,
      });
    }
    this.props.setProgress(100);
  }

  fetchMoreData = async () => {
    const pageNumber = this.state.page + 1;
    // CHANGED: URL now points to your own API endpoint for the next page
    const url = `/api/news?category=${this.props.category}&page=${pageNumber}`;

    this.setState({ page: pageNumber });
    let response = await fetch(url);
    let data = await response.json();

    if (data.status !== "error") {
      this.setState({
        articles: this.state.articles.concat(data.articles || []),
        totalResults: data.totalResults || 0,
      });
    } else {
      console.error("Error fetching more data:", data.message);
    }
  };

  render() {
    return (
      <>
        <h1
          className="text-center"
          style={{ margin: "35px 0px", marginTop: "90px" }}
        >
          NewsApp - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h1>

        {this.state.loading && <Spinner />}

        {this.state.error && (
          <div className="container text-center alert alert-danger">
            Error: {this.state.error}
          </div>
        )}

        {!this.state.loading && !this.state.error && (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container">
              <div className="row">
                {this.state.articles.map((element) => (
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
                ))}
              </div>
            </div>
          </InfiniteScroll>
        )}
      </>
    );
  }
}

export default News;
