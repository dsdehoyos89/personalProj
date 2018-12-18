import React, { Component } from "react";
import axios from "axios";
import profile from "../profile/profile.css";
import DreamCard from "../dreamcard/DreamCard";
import StarRatingComponent from "react-star-rating-component";

import { connect } from "react-redux";

import { getUser } from "../../ducks/reducer";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      dream: [],
      isClicked: false,
      rating: 1
    };
    this.shareHandler = this.shareHandler.bind(this);
  }

  async componentDidMount() {
    await this.props.getUser();
    await this.getDreams();
  }

  getDreams = () => {
    axios
      .get(`/api/dreams/${this.props.user.user_id}`)
      .then(response => this.setState({ dream: response.data }));
  };

  shareHandler(value) {
    axios.put("/api/dreams", { value: value }).then(response => {
      console.log("response in sharehandler", response);
    });
  }

  deleteDream(e) {
    console.log(e);
    axios.delete(`/api/dreams/delete/${e}`).then(() => {
      this.getDreams();
    });
  }

  render() {
    const { rating } = this.state;

    let loggedInMess = this.props.loggedIn ? (
      <h1 id="loggedInTitle"> My Dreams</h1>
    ) : (
      <h1 id="loggedOutMess">Login/SignUp</h1>
    );

    const display = this.state.dream.map((e, i) => {
      return (
        <DreamCard
          key={i}
          dreamId={e.dream_id}
          e={e}
          share={this.shareHandler}
          delete={e => this.deleteDream(e)}
        />
      );
    });

    return (
      <div>
        {loggedInMess}

        <div className="dreamCardContainer">{display}</div>
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(
  mapStateToProps,
  { getUser }
)(Profile);
