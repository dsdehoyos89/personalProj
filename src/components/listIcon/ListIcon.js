import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import listIcon from '../listIcon/listicon.css';

import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';




class ListIcon extends Component {
    state = {
        sideNav: false,
        links: [
            <Link to='/'>About</Link>,
            <Link to='/public'>Public</Link>,
            <Link to='/input'>Input</Link>,
            <Link to="/profile">My Dreams</Link>,
            <Link to='/splash'>Splash</Link>
            // <Link to='/signup'>Signup</Link>


        ]
    }



    componentDidMount() {
        this.props.getUser();
    }


    render() {
        console.log(this.props.match, 'user information')

        const redirect = () => {
            window.location.href = `${process.env.REACT_APP_SERVER}/login`;
        };

        const redirectLogout = () => {
            window.location.href = `${process.env.REACT_APP_SERVER}/login`
        }



        const { sideNav } = this.state;
        let linkMap = this.state.links.map((link, index) => {
            return <ul key={index}><Link to={link.props.to}>{link.props.children}</Link></ul>
        })

        let buttonToggle = this.props.loggedIn ? <button className="logButt" onClick={() => redirectLogout()}> Logout </button> :
            <button className="logButt" onClick={() => redirect()}>Login</button>





        return (


            <nav className="nav">

                <div className="menu">


                    <div className="main_nav">{linkMap}</div>
                    <div className="hamburger">
                        <div className="hamburger-icon" onClick={() => this.setState({ sideNav: !sideNav })}>
                            <div className="burger burger1"></div>
                            <div className="burger burger2"></div>
                            <div className="burger burger3"></div>
                        </div>
                        {sideNav && <div className="sidenav">{linkMap}</div>}

                    </div>

                </div>
                <div>

                    {/* <button onClick={() => redirect()}>Login</button> */}
                    {buttonToggle}
                </div>

            </nav>

        )
    }
}

const mapStateToProps = state => (state);

export default connect(mapStateToProps, { getUser })(ListIcon);