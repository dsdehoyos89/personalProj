import React, { Component } from 'react';
import axios from 'axios';
import profile from '../profile/profile.css'
import DreamCard from '../dreamcard/DreamCard'

import { connect } from 'react-redux';

import { getUser } from '../../ducks/reducer'



class Profile extends Component {
    constructor() {
        super();
        this.state = {
            dream: [],
            isClicked: false,


        }
        this.shareHandler = this.shareHandler.bind(this);
        this.handleMouseClick = this.handleMouseClick.bind(this);

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

    handleMouseClick() {
        this.setState(this.toggle)
    }

    toggle(state) {
        return {
            isClicked: !state.isClicked,

        }
    }

    renderOne(value) {
        console.log(value)
    }


















    render() {
        console.log("profileJS", this.state.dream)

        const display = this.state.dream.map((e, i) => {

            return (
                <DreamCard
                    key={i}
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
            <body id='profile'>
                <div>
                    <h2>Profile view</h2>
                    <div >

                        {display}


                    </div>
                </div>
            </body>
        )
    }
}

const mapStateToProps = state => (state)

export default connect(mapStateToProps, { getUser })(Profile);