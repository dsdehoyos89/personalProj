import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/landing/Landing';
import Intro from './components/intro/Intro';
import Input from './components/input/Input';
import PublicV from './components/public/PublicV';
import Profile from './components/profile/Profile';
import TextEditor from './components/editor/TextEditor';
import Splash from './components/splash/Splash'


export default (
    <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/intro' component={Intro} />
        <Route path='/input' component={Input} />
        <Route path='/public' component={PublicV} />
        <Route path='/profile' component={Profile} />
        <Route path='/splash' component={Splash} />


    </Switch>
)