import React, { Component } from 'react';
import axios from 'axios'
import landing from '../landing/landing.css'
import profile from '../profile/profile.css'
import { Link, withRouter } from 'react-router-dom'

class Landing extends Component {


    render() {

        return (
            <div>

                <div className="landing-container">
                    <h2>What is a DreamCatcher?</h2>
                    <p className="introContent">DreamCatcher is a dream journal web application that allows you to create and customize your very own dream journal. This will allow you to learn more
                        about yourself through the cataloging of your dreams. Recording your dreams on a regular basis will help you track themes in your dreams and to learn patterns about your dreams. Dream journals are an invaluable source of insight into your most important concerns,activities, and relationships in the waking world. This application will track cohesion or how well you remember the dream, rating, and whether you had intended to become lucid or not.

                </p>

                </div>
                <div className="bottomCont">
                    <p>Enter your first dream and...</p>
                    <button className="getStarted" ><Link to="/input">Get Started</Link></button>

                </div>
            </div>
        )
    }
}

export default withRouter(Landing);