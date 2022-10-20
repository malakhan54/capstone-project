import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import Admin from "./Admin";
import User from "./User";
import { Navbar, Nav, Container } from "react-bootstrap";
import EditProfile from "./EditProfile";
import ChangePassword from "./ChangePassword";
import WeatherApp from "./WeatherApp";

export default class DisplayPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      userType: "",
      loggedIn: true,
      loggedOut: false,
    };
  }

  componentDidMount() {
    const loggedIn = localStorage.getItem("loggedIn") === "true";

    if (loggedIn) {
      let id = localStorage.getItem("userId");
      let type = localStorage.getItem("userType");
      this.setState({
        loggedIn: true,
        userId: id,
        userType: type,
        renderRight: "",
        viewProfile: "View profile",
      });

      // if (type === "A")
      //     this.setState({ renderRight: <Admin userId={id} />, viewProfile: "View all Users" })
      // else
      //     this.setState({ renderRight: <User userId={id} /> })

      this.setState({ renderRight: <WeatherApp userId={id} /> });
    }
  }

  handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
    localStorage.removeItem("type");
    //  this.setState({ loggedOut: true })
  };

  handleMenuButton = (e) => {
    let name = e.target.name;
    switch (name) {
      case "editProfile":
        this.setState({
          renderRight: <EditProfile userId={this.state.userId} />,
        });
        break;
      case "changePassword":
        this.setState({
          renderRight: <ChangePassword userId={this.state.userId} />,
        });
        break;
      case "viewProfile":
        if (this.state.userType === "A")
          this.setState({
            renderRight: <Admin userId={this.state.userId} />,
            viewProfile: "View all Users",
          });
        else
          this.setState({ renderRight: <User userId={this.state.userId} /> });
        break;
      case "logout":
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userId");
        localStorage.removeItem("type");
        this.setState({ loggedOut: true });
        break;
      case "weatherapp":
        this.setState({ renderRight: <WeatherApp /> });
        break;
      default:
        break;
    }
  };
  render() {
    if (this.state.loggedOut) {
      return <Navigate to="/"></Navigate>;
    }

    return (
      <>
        <div className="row">
          <div className="col-sm-2">
            <div class="d-grid gap-2">
              <button
                className="btn btn-sm btn-info"
                name="weatherapp"
                onClick={this.handleMenuButton}
              >
                Weather Forecast
              </button>
              <button
                className="btn btn-sm btn-info"
                name="viewProfile"
                onClick={this.handleMenuButton}
              >
                {this.state.viewProfile}
              </button>

              <button
                className="btn btn-sm btn-info"
                name="editProfile"
                onClick={this.handleMenuButton}
              >
                Edit profile
              </button>
              <button
                className="btn btn-sm btn-info"
                name="changePassword"
                onClick={this.handleMenuButton}
              >
                Change password
              </button>
              <button
                className="btn btn-sm btn-info"
                name="logout"
                onClick={this.handleMenuButton}
              >
                Logout
              </button>
              <br></br>
            </div>
          </div>
          <div className="col-sm-8">{this.state.renderRight}</div>
        </div>
      </>
    );
  }
}
