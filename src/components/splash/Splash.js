import React, { Component } from "react";
import splash from "../splash/splash.css";
import axios from "axios";
import { Link } from "react-router-dom";

const clientId = process.env.REACT_APP_UNSPLASH_CLIENTID;
const endPoint = "https://api.unsplash.com/search/photos/";

class Splash extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      query: "",
      page: 1,
      intervalId: 0
    };

    this.trackQueryValue = this.trackQueryValue.bind(this);

    this.loadMorePics = this.loadMorePics.bind(this);
    this.backToTop = this.backToTop.bind(this);
  }

  loadMorePics() {
    const { page } = this.state;
    fetch(
      `${endPoint}?query=${
        this.state.query
      }&client_id=${clientId}&per_page=20&page=${page}`
    )
      .then(response => {
        return response.json();
      })
      .then(jsonResponse =>
        this.setState({
          photos: [...this.state.photos, ...jsonResponse.results]
        })
      );
  }

  trackQueryValue(e) {
    this.state.query = e.target.value;
  }

  onKeyUp = e => {
    if (e.which === 13) {
      fetch(
        `${endPoint}?query=${
          this.state.query
        }&client_id=${clientId}&per_page=30`
      )
        .then(response => {
          console.log(response);
          return response.json();
        })
        .then(jsonResponse => {
          console.log(jsonResponse);
          this.setState({ photos: jsonResponse.results });
        });

      e.target.value = "";
    }
  };

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1
      }),
      this.loadMorePics
    );
  };

  backToTop = () => {
    console.log("clicked");
    document.documentElement.scrollTop = 0;
  };

  render() {
    console.log(this.state.photos, "state of the splash component");
    let photosRend =
      this.state.photos &&
      this.state.photos.map((img, i) => {
        return <img key={i} className="photo" src={img.urls.small} />;
      });
    return (
      <div
        className="bodyContainer"
        onScroll={this.handleScroll}
        ref={scroller => {
          this.scroller = scroller;
        }}
      >
        <div className="inputCont">
          <input
            id="searchInput"
            type="text"
            onChange={this.trackQueryValue}
            onKeyUp={e => this.onKeyUp(e)}
          />
        </div>
        <div className="photosContainer">{photosRend}</div>

        <a className="loadMore" onClick={this.loadMore}>
          loadMore
        </a>
        <button id="topBut" onClick={this.backToTop}>
          Top
        </button>
      </div>
    );
  }
}

export default Splash;
