import React, { Component } from 'react';

import './App.css';
import routes from './routes';
import { Link, withRouter } from 'react-router-dom';
import Header from './components/header/Header'
import ListIcon from './components/listIcon/ListIcon'
import SignUp from './components/signUp/SignUp'
import { connect } from 'react-redux';
import { getUser } from './ducks/reducer';

class App extends Component {
  render() {

    return (
      <div className="App">
        <Header />

        {routes}

      </div>
    );
  }
}

const mapStateToProps = state => (state)


export default withRouter(connect(mapStateToProps, { getUser })(App));
