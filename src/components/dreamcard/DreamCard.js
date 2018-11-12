import React, { Component } from 'react'
import profile from '../profile/profile.css'
import Profile from '../profile/Profile'
import StarRatingComponent from 'react-star-rating-component'
import dreamcard from '../dreamcard/dreamcard.css'
import axios from 'axios';
import moment from 'moment';
import DeleteSharpIcon from '@material-ui/icons/DeleteSharp'
import Share from '@material-ui/icons/Share'



class DreamCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false,
            rating: 1,
            cohesion: 1,
            lucidity: 1


        }
        this.handleMouseClick = this.handleMouseClick.bind(this);
        // this.handleTitle = this.handleTitle.bind(this);
    }

    componentDidMount() {
        this.setState({ rating: this.props.e.rating, cohesion: this.props.e.cohesion, lucidity: this.props.e.lucidity })
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



    ratingHandler() {


        axios.put(`/api/ratings/${this.props.e.dream_id}`, {
            lucidity: +this.state.lucidity,
            cohesion: +this.state.cohesion,
            rating: +this.state.rating
        }).then(response => {
            console.log("response in dreamCard", response)
            this.setState({
                lucidity: response.data[0].lucidity,
                cohesion: response.data[0].cohesion,
                rating: response.data[0].rating
            })

        })



    }






    render() {
        console.log(this.props)
        return (
            <div className="dreamcard" >
                <h8 id="timeStamp" >Posted on:{moment(this.props.e.date_created).format('LLL')}</h8>

                {/* // <h3 className='titleOut'>{this.state.input}</h3>

                // <input className='titleInput' onClick={this.handleTitle}></input> */}

                <h3 key={this.props.e.dream_id} onClick={() => this.handleMouseClick()} >{this.props.e.dream}</h3>
                <div className='ratingCont'>
                    <div>
                        <h6>Cohesion</h6>
                        <StarRatingComponent
                            name="cohesion"
                            starCount={5}
                            value={this.state.cohesion}
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
                            value={this.state.rating}
                            onStarClick={this.onStarClick.bind(this)}
                        />
                    </div>

                    <div>
                        <h6>Lucidity</h6>
                        <StarRatingComponent
                            name="lucidity"
                            starCount={5}
                            value={this.state.lucidity}
                            onStarClick={this.onStarLucidityClick.bind(this)}
                        />
                    </div>

                </div>

                {this.state.isClicked && <button className='share'><Share onClick={() => this.props.share(this.props.e.dream_id)} /></button>}
                <DeleteSharpIcon className="deleteButton" onClick={() => this.props.delete(this.props.e.dream_id)} />
            </div >
        )

    }

}

export default DreamCard; 