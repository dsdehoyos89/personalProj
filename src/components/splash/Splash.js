import React, { Component } from 'react'

class Splash extends Component {


    onHandleClickUnsplash(url) {
        document.body.style.background = url("https://source.unsplash.com/2000x1312/?clouds,stars,sky ");
    }
    render() {
        return (
            <div>
                <button onClick={this.onHandleClickUnsplash}> Change Background</button>

            </div>
        )
    }
}

export default Splash 