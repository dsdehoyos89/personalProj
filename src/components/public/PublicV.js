import React, { Component } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import publicView from '../public/publicView.css';
import moment from 'moment'

class PublicV extends Component {
    constructor() {
        super();
        this.state = {
            publicDreams: [],
            currentIndex: 0
        }
    }

    componentDidMount() {
        axios.get('/api/publicDreams').then(response => this.setState({ publicDreams: response.data }))
    }

    // slideTo = (i) => this.setState({ currentIndex: i });

    // onSlideChanged = (e) => this.setState({ currentIndex: e.dream })

    // slideNext = () => this.setState({ currentIndex: this.state.currentIndex + 1 });

    // slidePrev = () => this.setState({ currentIndex: this.state.currentIndex - 1 })


    // renderThumbs = () =>
    //     <ul>{this.state.publicDreams.map((dream, i) =>
    //         <h2 key={i} className="" onClick={() => this.slideTo(i)}>thumb {dream.dream}</h2>)}

    //     </ul>;

    // renderGallery() {
    //     const { currentIndex, publicDreams } = this.state;

    //     return (<AliceCarousel
    //         dotsDisabled={true}
    //         buttonsDisabled={true}
    //         slideToIndex={currentIndex}
    //         onSlideChanged={this.onSlideChanged}
    //     >
    //         {publicDreams.map((dream, i) => <div key={i}>{dream.dream}</div>)}
    //     </AliceCarousel>)
    // }






    render() {
        console.log('dreams on state', this.state.publicDreams)
        const dreams = this.state.publicDreams.map((e, i) => {
            return (
                <div className="dreamcard">
                    <h8 id="timeStamp" >{moment(e.date_created).format('LLL')}</h8>
                    <h3 className="dreamcard" key={e.dream_id}>{e.dream}</h3>
                </div>
            )
        })
        return (
            <div>
                This is the public dream view.
                {dreams}
                {/* {this.renderThumbs()}
                <button onClick={() => this.slidePrev()}>Previous</button>
                <button onClick={() => this.slideNext()}>Next</button>
                {this.renderGallery()} */}
            </div>
        )
    }
}

export default PublicV;