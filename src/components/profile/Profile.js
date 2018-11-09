import React, { Component } from 'react';
import axios from 'axios';
import profile from '../profile/profile.css'
import DreamCard from '../dreamcard/DreamCard'
import StarRatingComponent from 'react-star-rating-component'

import { connect } from 'react-redux';

import { getUser } from '../../ducks/reducer'



class Profile extends Component {
    constructor() {
        super();
        this.state = {
            dream: [],
            isClicked: false,
            rating: 1

        }
        this.shareHandler = this.shareHandler.bind(this);


    }


    async componentDidMount() {
        await this.props.getUser();
        await axios.get(`/api/dreams/${this.props.user.user_id}`)
            .then(response => this.setState({ dream: response.data }));



    }

    // getUser = () => {
    //     axios.get('/api/getUser').then(response => console.log(response, 'FRONT END PROFILE GET USER'))
    // }

    shareHandler(value) {


        axios.put('/api/dreams', { value: value }).then(response => {
            console.log('response in sharehandler', response)
        })


    }




















    render() {

        const { rating } = this.state;

        const display = this.state.dream.map((e, i) => {

            return (
                <DreamCard
                    key={i}
                    dreamId={e.dream_id}
                    e={e}
                    share={this.shareHandler}


                />
                // <h3 className='dreamcard' key={e.dream_id} onClick={() => this.handleMouseClick()} >
                //     {e.dream}


                //     {/* {this.state.isClicked && <button className="shareButt" key={i} onClick={() => this.shareHandler(e.dream_id)}>Share</button>} */}
                //     {this.state.isClicked ? <button className="shareButt" key={e.dream_id} onClick={() => this.shareHandler(e.dream_id)}>Share</button> : null}
                // </h3>

            )

        })

        return (

            <div>
                <h2>My Dreams</h2>

                <div className="dreamCardContainer">

                    {display}


                </div>
            </div>

        )
    }
}

const mapStateToProps = state => (state)

export default connect(mapStateToProps, { getUser })(Profile);