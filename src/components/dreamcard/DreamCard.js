import React, { Component } from 'react'
import profile from '../profile/profile.css'
import Profile from '../profile/Profile'

class DreamCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isClicked: false
        }
        this.handleMouseClick = this.handleMouseClick.bind(this)
    }

    handleMouseClick() {
        this.setState(this.toggle)
    }

    toggle(state) {
        return {
            isClicked: !state.isClicked,

        }
    }

    render() {
        console.log(this.props)
        return (
            <div className="dreamcard">
                <h3 key={this.props.e.dream_id} onClick={() => this.handleMouseClick()} >{this.props.e.dream}</h3>

                {this.state.isClicked && <button className="shareButt" onClick={() => this.props.share(this.props.e.dream_id)}>Share</button>}
            </div>
        )

    }

}

export default DreamCard;