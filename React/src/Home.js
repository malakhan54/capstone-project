import React, { Component } from 'react'
import { Navigate } from "react-router-dom";
import Login from './Login';

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginFlag: false,
      signupFlag: false,
      loggedIn: false,
      userId: "",
      userType: ""
    }
  }

  componentDidMount() {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';

    if (loggedIn) {
      const id = localStorage.getItem('userId')
      const type = localStorage.getItem('type')
      this.setState({ loggedIn: true, userId: id, userType: type });
    }

    console.log("in home component did mount")
  }

  render() {

    if (this.state.loggedIn) {

     return (<Navigate to = "/display"></Navigate>)
    }

    else {
      return (
        <div>
          <Login />
        </div>

      )
    }
  }
}

