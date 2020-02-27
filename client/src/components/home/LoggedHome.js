import React, { Component } from 'react'

export class LoggedHome extends Component {
  render() {
    return (
      <div>
        <p>Hello {this.props.userInSession.username}</p>
      </div>
    )
  }
}

export default LoggedHome


