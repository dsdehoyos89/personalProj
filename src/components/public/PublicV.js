import React, { Component } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import publicView from '../public/publicView.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';

class PublicV extends Component {
    constructor() {
        super();
        this.state = {
            publicDreams: [],
            currentIndex: 0
        }
    }

    async componentDidMount() {
        await this.props.getUser();
        await axios.get('/api/publicDreams').then(response => this.setState({ publicDreams: response.data }))
    }






    render() {
        console.log('dreams on state', this.state.publicDreams)
        console.log('user in publicView', this.props)
        // console.log(this.state.publicDreams.e.profile_name)
        const dreams = this.state.publicDreams.map((e, i) => {
            return (
                <div className="dreamcard">
                    <h8 id="timeStamp" >{moment(e.date_created).format('LLL')}</h8>
                    <h8 id="userName">@{e.profile_name}</h8>
                    <h3 className="dreamcard" key={e.dream_id}>{e.dream}</h3>
                </div>
            )
        })
        return (
            <div>
                This is the public dream view.
                {dreams}
            </div>
        )
    }
}

const mapStateToProps = state => (state)

export default connect(mapStateToProps, { getUser })(PublicV);