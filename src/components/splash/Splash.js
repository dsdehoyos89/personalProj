import React, { Component } from 'react'
import splash from '../splash/splash.css'
import axios from 'axios';
// import fetch from 'react'


// require('dotenv').config();
const clientId = process.env.REACT_APP_UNSPLASH_CLIENTID;
const endPoint = 'https://api.unsplash.com/search/photos'

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
        fetch(`${endPoint}?query=${this.state.query}&client_id=${clientId}`)
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
            fetch(`${endPoint}?query=${this.state.query}&client_id=${clientId}`)
                .then(response => {
                    return response.json()
                }).then(jsonResponse => {
                    this.setState({ photos: jsonResponse.results })
                })




            e.target.value = '';
        }
    }



    render() {
        console.log(this.state.photos, 'state of the splash component')
        let photosRend = this.state.photos.map((img, i) => {
            return (


                <img key={i} className="photo"
                    src={img.urls.small} />

            )
        })
        return (
            <div className="bodyContainer">
                <div className="inputCont">
                    <input id='searchInput' type="text" onChange={this.trackQueryValue} onKeyUp={(e) => this.onKeyUp(e)} ></input>
                    {/* <button id="searchButton" onClick={this.search}>Search</button> */}
                </div>
                <div className='photosContainer'>

                    {photosRend}
                </div>
            </div>
        )
    }
}

export default Splash;