import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import listIcon from '../listIcon/listicon.css'

class ListIcon extends Component {
    state = {
        sideNav: false,
        links: [
            <Link to='/'>Landing</Link>,
            <Link to='/public'>Public</Link>,
            <Link to='/input'>Input</Link>,
            <Link to="/profile">Profile view</Link>,
            <Link to='/editor'>Editor</Link>

        ]
    }
    render() {
        const redirect = () => {
            window.location.href = `${process.env.REACT_APP_SERVER}/login`;
        }
        const { sideNav } = this.state;
        let linkMap = this.state.links.map((link, index) => {
            return <ul key={index}><Link to={link.props.to}>{link.props.children}</Link></ul>
        })
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
                    {/* <button onClick={} */}
                    <button onClick={() => redirect()}>Login</button>
                </div>

            </nav>

        )
    }
}

export default ListIcon;