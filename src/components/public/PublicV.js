import React, { Component } from 'react';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import publicView from '../public/publicView.css';
import moment from 'moment';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import Modal from 'react-responsive-modal';

class PublicV extends Component {
    constructor() {
        super();
        this.state = {
            publicDreams: [],
            currentIndex: 0,
            open: false,
            comment: '',

        }
    }

    async componentDidMount() {
        await this.props.getUser();
        await axios.get('/api/publicDreams').then(response => this.setState({ publicDreams: response.data }))
    }


    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };






    render() {
        const { open } = this.state;
        let buttonToggle = this.props.loggedIn ? <h1 id="conditionalRendIn" > Public View</h1> :
            <h1 id="conditionalRend">Login/signup</h1>
        console.log('dreams on state', this.state.publicDreams)
        console.log('user in publicView', this.props)
        // console.log(this.state.publicDreams.e.profile_name)
        const dreams = this.state.publicDreams.map((e, i) => {
            return (
                <div className="dreamcard">
                    <h8 id="timeStamp" >Posted on:{moment(e.date_created).format('LLL')}</h8>
                    <h8 id="userName">@{e.profile_name}</h8>
                    <h3 className="dreamcard" key={e.dream_id}>{e.dream}</h3>
                    <button onClick={this.onOpenModal}>Comment</button>
                    <div className="modalWrapper">
                        <Modal className='modal' open={open} onClose={this.onCloseModal} center>
                            <h2>Enter Comment below...</h2>
                            <textarea
                                id='textArea'
                                defaultValue={this.state.comment}
                                maxLength={250}
                                onChange={e => this.setState({ comment: e.target.value })}

                            />
                            <button>Submit</button>
                        </Modal>

                    </div>
                </div>
            )
        })
        return (
            <div>
                {buttonToggle}
                {dreams}
            </div>
        )
    }
}

const mapStateToProps = state => (state)

export default connect(mapStateToProps, { getUser })(PublicV);