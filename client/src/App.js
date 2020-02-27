import React, { Component } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import { Login, Signup, Profile } from './components/auth';
import UnloggedHome from './components/home/UnloggedHome';
import LoggedHome from './components/home/LoggedHome';
import Navbar from './components/navbar/Navbar';
import './App.css';

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInUser: this.props.user,
    }
  }

  getTheUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }

  render() {
    if (this.state.loggedInUser) {
      return (
        <div className='App'>
          <Route path='/signup' render={() => <Redirect to='/'></Redirect>} />
          <Route path='/login' render={() => <Redirect to='/'></Redirect>} />
          <Navbar
            userInSession={this.state.loggedInUser}
          />
          <Switch>
            <Route exact path='/' render={() =>
              <LoggedHome
                userInSession={this.state.loggedInUser}
              />} />
            <Route exact path='/profile' render={() =>
              <Profile
                userInSession={this.state.loggedInUser}
                getUser={this.getTheUser}
              />} />
          </Switch>
        </div>
      )
    } else {
      return (
        <div className='App'>
          <Switch>
            <Route exact path='/' component={UnloggedHome} />
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser} />} />
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser} />} />
            <Redirect to='/' />
          </Switch>
        </div>

      )
    }
  }
}

export default App;
