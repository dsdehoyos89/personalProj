import React, { Component } from 'react'
import splash from '../splash/splash.css'
import axios from 'axios';
// import fetch from 'react'


// require('dotenv').config();
const clientId = process.env.REACT_APP_UNSPLASH_CLIENTID;
const endPoint = 'https://api.unsplash.com/search/photos/'

class Splash extends Component {
    constructor() {
        super();
        this.state = {
            photos: [],
            query: ''
        }

        this.trackQueryValue = this.trackQueryValue.bind(this);
        this.search = this.search.bind(this);
    }

    search() {
        fetch(`${endPoint}?query=${this.state.query}&client_id=${clientId}&per_page=20`)
            .then(response => {
                return response.json()
            }).then(jsonResponse => {

                this.setState({ photos: jsonResponse.results })
            })




    }

    trackQueryValue(e) {
        this.state.query = e.target.value
    }


    onKeyUp = (e) => {
        if (e.which === 13) {
            fetch(`${endPoint}?query=${this.state.query}&client_id=${clientId}&per_page=30`)
                .then(response => {
                    return response.json()
                }).then(jsonResponse => {
                    console.log(jsonResponse)
                    this.setState({ photos: jsonResponse.results })
                })




            e.target.value = '';
        }
    }

    handleScroll = () => {
        if (this.scroller && this.scroller.scrollTop < 100) {
            console.log('reachedTop')
        }
    }



    render() {
        console.log(this.state.photos, 'state of the splash component')
        let photosRend = this.state.photos && this.state.photos.map((img, i) => {
            return (


                <img key={i} className="photo"
                    src={img.urls.small} />

            )
        })
        return (

            <div className="bodyContainer"
                onScroll={this.handleScroll}
                ref={scroller => { this.scroller = scroller }}
            >
                <div className="inputCont">
                    <input id='searchInput' type="text" onChange={this.trackQueryValue} onKeyUp={(e) => this.onKeyUp(e)} ></input>

                </div>
                <div className='photosContainer'>

                    {photosRend}
                </div>
            </div>
        )
    }
}

export default Splash;