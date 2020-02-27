import React, { Component } from 'react';
import { AuthService } from '../auth';
import { NavLink, Link } from 'react-router-dom';

export class Navbar extends Component {
  constructor(props) {
    super(props)
    this.service = new AuthService();
    this.state = { loggedInUser: this.props.userInSession }
  }

  render() {
    return (
      <nav className="navbar">
        {this.props.userInSession ? <NavLink to="/" className="navbar-brand"><h2>Tello</h2></NavLink> : ''}
        <div className="form-inline">
          {this.props.userInSession ? <Link to="/profile">Profile</Link> : ''}
        </div>
      </nav>
    )
  }
}

export default Navbar
