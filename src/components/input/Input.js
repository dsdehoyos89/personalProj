import React, { Component } from 'react';
import input from '../input/input.css';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';

class Input extends Component {
    constructor() {
        super();
        this.state = {
            dream: []

        }
    }

    handleChange(input) {
        this.setState({ dream: input })


    }

    componentDidMount() {
        this.props.getUser();

    }

    handleSubmit = () => {
        let dream = this.state.dream

        axios.post('/api/dreams', {
            dream: dream,
            category: 'private',
            user_id: this.props.user.user_id
        })
            .then(this.setState({ dream: [] }))
    };


    render() {
        console.log(this.state.dream)
        console.log(this.props)
        console.log(this.props.user)
        return (
            <div className="inputContainer">
                <h1>Dream Input</h1>
                <textarea className="input" placeholder="Enter your dream..." value={this.state.dream} onChange={(e) => this.handleChange(e.target.value)}>

                </textarea >
                <h2 >Tag Input</h2>
                <input style={{ width: "50px", margin: "auto", border: "15px" }}></input>

                <button className="btn" onClick={this.handleSubmit} >Submit Dream</button>

            </div>
        )
    }
}

const mapStateToProps = state => (state)

export default connect(mapStateToProps, { getUser })(Input);

