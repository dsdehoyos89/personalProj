import React from 'react';
import '../header/header.css'
import ListIcon from '../listIcon/ListIcon'
import { Link } from 'react-router-dom'



function Header() {
    return (
        <div className='header'>
            <div className='logo' onClick={() => <Link to='/'></Link>}>
                <img src='001-indian.svg' alt='dreamcatcher' />

            </div>
            < h2 className='appName' onClick={() => <Link to='/'></Link>}>DreamCatcher</h2>
            <div className="list">
                <ListIcon />
            </div>

        </div>
    )
}

export default Header;