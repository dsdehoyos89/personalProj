import React, { Component } from 'react'
// import { Bar } from 'react-chartjs-2'
import signUp from '../signUp/signUp.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

class SignUp extends Component {
    render() {
        return (
            <div className='container'>
                <nav>
                    <img src='001-indian.svg' alt='dreamcatcher' ></img>
                </nav>
                <div>
                    <Link to="/">About</Link>
                    <br />
                    <br />
                    <Link to='/login'>Login/SignUp</Link>

                </div>

            </div>
        )
    }
}


export default SignUp;