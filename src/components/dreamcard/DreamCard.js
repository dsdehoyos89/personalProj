import React, { Component } from 'react'
import profile from '../profile/profile.css'
import Profile from '../profile/Profile'
import StarRatingComponent from 'react-star-rating-component'
import dreamcard from '../dreamcard/dreamcard.css'
import axios from 'axios';
import moment from 'moment';


class DreamCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            rating: 1,
            cohesion: 1,
            lucidity: 1,
            input: ''

        }
        this.handleMouseClick = this.handleMouseClick.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
    }

    handleMouseClick() {

        this.setState(this.toggle)
    }

    toggle(state) {
        return {
            isClicked: !state.isClicked,

        }
    }

    onStarClick(nextValue, prevValue, rating) {
        this.setState({ rating: nextValue }, () => this.ratingHandler())
        console.log('nextValue', nextValue)
    }

    onStarCohesionClick(nextValue, prevValue, cohesion) {
        this.setState({ cohesion: nextValue }, () => this.ratingHandler())
    }

    onStarLucidityClick(nextValue, prevValue, lucidity) {
        this.setState({ lucidity: nextValue }, () => this.ratingHandler())
    }

    // handleTitleInput(title) {
    //     this.setState({ input: title })
    // }

    handleTitle(event) {
        console.log(event, event.key, 'dreamcard and event')
        if (event.key === 'Enter') {
            this.setState({ input: event })

        }

    }




    // ratingHandler(value) {


    // }

    // ratingHandler() {
    //     axios.put()


    // }







    render() {
        console.log(this.props)
        return (
            <div className="dreamcard">
                <h8 id="timeStamp" >{moment(this.props.e.date_created).format('LLL')}</h8>

                <h3 className='titleOut'>{this.state.input}</h3>

                <input className='titleInput' onBlur={this.handleTitle}></input>

                <h3 key={this.props.e.dream_id} onClick={() => this.handleMouseClick()} >{this.props.e.dream}</h3>
                <div className='ratingCont'>
                    <div>
                        <h6>Cohesion</h6>
                        <StarRatingComponent
                            name="cohesion"
                            starCount={5}
                            value={this.props.e.cohesion}
                            key={this.props.dream_id}
                            onStarClick={this.onStarCohesionClick.bind(this)}
                        // onChange={(e) => this.ratingHandler(e.target.value)}
                        />
                    </div>

                    <div>
                        <h6>Rating</h6>
                        <StarRatingComponent
                            name="rating"
                            starCount={5}
                            value={this.props.e.rating}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>

                    <div>
                        <h6>Lucidity</h6>
                        <StarRatingComponent
                            name="lucidity"
                            starCount={5}
                            value={this.props.e.lucidity}
                            onStarClick={this.onStarLucidityClick.bind(this)}
                        />
                    </div>

                </div>

                {this.state.isClicked && <button className="shareButt" onClick={() => this.props.share(this.props.e.dream_id)}>Share</button>}
            </div >
        )

    }

}

export default DreamCard;