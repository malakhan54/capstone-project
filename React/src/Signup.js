/* eslint-disable default-case */
import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navigate } from "react-router-dom";
import { ApiKey } from "./constants";

const POSTURL = "http://127.0.0.1:8901/users?APIKey=" + ApiKey;

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //name
      nametxt: "",
      nameerrmsg: "",
      nameflag: false,
      //phone
      phonetxt: "",
      phoneerrmsg: "",
      phoneflag: false,
      //email
      emailtxt: "",
      emailerrmsg: "",
      emailflag: false,
      //address
      addresstxt: "",
      addresserrmsg: "",
      addressflag: false,
      //username
      usernametxt: "",
      usernameerrmsg: "",
      usernameflag: false,
      //password
      passwordtxt: "",
      passworderrmsg: "",
      passwordflag: false,
      //password2
      password2txt: "",
      password2errmsg: "",
      password2flag: false,

      successmsg: "",
      errormsg: "",
      loginFlag: false,
    };
  }
  changeValue = (event) => {
    const fieldName = event.target.name;
    switch (fieldName) {
      //name
      case "nametxt":
        this.setState({ nametxt: event.target.value });
        this.validateName(event.target.value);
        break;
      //phonetxt
      case "phonetxt":
        this.setState({ phonetxt: event.target.value });
        this.validatePhone(event.target.value);
        break;
      //emailtxt
      case "emailtxt":
        this.setState({ emailtxt: event.target.value });
        this.validateemail(event.target.value);
        break;
      //address
      case "addresstxt":
        this.setState({ addresstxt: event.target.value });
        this.validateaddress(event.target.value);
        break;
      //username
      case "usernametxt":
        this.setState({ usernametxt: event.target.value });
        this.validateusername(event.target.value);
        break;
      //username
      case "passwordtxt":
        this.setState({ passwordtxt: event.target.value });
        this.validatepassword(event.target.value);
        break;
      //password2
      case "password2txt":
        this.setState({ password2txt: event.target.value });
        this.validatepasswordandverify(event.target.value);
        break;
    }
  };

  validateName = (value) => {
    if (value.length < 4) {
      this.setState({
        nameerrmsg: "Invalid Name: should be minimum 4 characters",
      });
      this.setState({ nameflag: false });
    } else {
      this.setState({ nameerrmsg: "" });
      this.setState({ nameflag: true });
    }
  };

  validatePhone = (value) => {
    if ((value.length < 10) | isNaN(value) | (value.length > 10)) {
      this.setState({
        phoneerrmsg:
          "Invalid Phone Number : only digits and minimum 10 digits : example: 0412345678",
      });
      this.setState({ phoneflag: false });
    } else {
      this.setState({ phoneerrmsg: "" });
      this.setState({ phoneflag: true });
    }
  };

  validateemail = (value) => {
    if (
      (value.indexOf("@") === -1) |
      (value.indexOf("@") > value.indexOf(".com"))
    ) {
      this.setState({
        emailerrmsg: "Invalid Email : example - <username>@<domain>.com",
      });
      this.setState({ emailflag: false });
    } else {
      console.log("else" + value.indexOf("."));
      this.setState({ emailerrmsg: "" });
      this.setState({ emailflag: true });
    }
  };

  validateaddress = (value) => {
    if (value.length < 10) {
      this.setState({
        addresserrmsg: "Invalid Address: should be minimum 10 characters ",
      });
      this.setState({ addressflag: false });
    } else {
      this.setState({ addresserrmsg: "" });
      this.setState({ addressflag: true });
    }
  };

  validateusername = (value) => {
    if (value.length < 8) {
      this.setState({
        usernameerrmsg: "Invalid username: should be minimum 8 characters",
      });
      this.setState({ usernameflag: false });
    } else {
      this.setState({ usernameerrmsg: "" });
      this.setState({ usernameflag: true });
    }
  };

  validatepassword = (value) => {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;

    if (value.length === 0) {
      this.setState({ passworderrmsg: "Invalid password: Password is empty" });
      this.setState({ passwordflag: false });
    } else if (!uppercaseRegExp.test(value)) {
      this.setState({
        passworderrmsg: "Invalid password: At least one Uppercase",
      });
      this.setState({ passwordflag: false });
    } else if (!lowercaseRegExp.test(value)) {
      this.setState({
        passworderrmsg: "Invalid password: At least one Lowercase",
      });
      this.setState({ passwordflag: false });
    } else if (!digitsRegExp.test(value)) {
      this.setState({ passworderrmsg: "Invalid password: At least one digit" });
      this.setState({ passwordflag: false });
      // } else if (!specialCharRegExp.test(value)) {
      //     this.setState({ passworderrmsg: "Invalid password: At least one Special Characters" })
      //     this.setState({ passwordflag: false })
    } else if (!minLengthRegExp.test(value)) {
      this.setState({
        passworderrmsg: "Invalid password: minumum 8 characters",
      });
      this.setState({ passwordflag: false });
    } else {
      this.setState({ passworderrmsg: "" });
      this.setState({ passwordflag: true });
    }
  };

  validatepasswordandverify = (value) => {
    if ((value.length < 4) | (value !== this.state.passwordtxt)) {
      this.setState({ password2errmsg: "Password did not match" });
      this.setState({ password2flag: false });
    } else {
      this.setState({ password2errmsg: "" });
      this.setState({ password2flag: true });
    }
  };

  addCust = (event) => {
    if (
      this.state.nameflag &
      this.state.phoneflag &
      this.state.emailflag &
      this.state.addressflag &
      this.state.usernameflag &
      this.state.passwordflag &
      this.state.password2flag
    ) {
      this.addCustToAPI();
    } else {
      this.preventDefault();
    }
  };

  addCustToAPI = () => {
    let jsonInput = {
      name: this.state.nametxt,
      phoneNo: this.state.phonetxt,
      email: this.state.emailtxt,
      address: this.state.addresstxt,
      username: this.state.usernametxt,
      password: this.state.passwordtxt,
      pass2: this.state.password2txt,
    };
    axios
      .post(POSTURL, jsonInput)
      .then((response) => {
        console.log(response);
        this.setState({ successmsg: response.data, error: "" });
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          this.setState({
            errormsg: error.response.data.message,
            successmsg: "",
          });
        } else {
          this.setState({ errormsg: error.message, successmsg: "" });
        }
      });
  };

  preventDefault = () => {
    this.setState({ errormsg: "Invalid input" });
    this.setState({
      nameerrmsg: "Invalid Name: should be minimum 4 characters",
    });
    this.setState({
      phoneerrmsg:
        "Invalid Phone Number : only digits and minimum 10 digits : example: 0412345678",
    });
    this.setState({
      emailerrmsg: "Invalid Email : example - <username>@<domain>.com",
    });
    this.setState({
      addresserrmsg: "Invalid Address: should be minimum 10 characters ",
    });
    this.setState({
      usernameerrmsg: "Invalid username: should be minimum 8 characters",
    });
    this.setState({
      passworderrmsg:
        "Invalid password: minimum 8 chars, at least one uppercase, one lowercase and one digit",
    });
  };

  handleChangeLogin = () => {
    this.setState({ loginFlag: true });
  };

  render() {
    if (this.state.loginFlag === true) {
      return <Navigate to="/"></Navigate>;
    } else
      return (
        <div className="container-fluid row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-header bg-custom">
                <h2>
                  Home Konnect
                  <span className="badge badge-primary">Sign up</span>
                </h2>
              </div>
              <div className="card-body">
                <form className="form">
                  <div className="form-group">
                    <label htmlFor="nametxt">Name</label>
                    <input
                      type="text"
                      name="nametxt"
                      value={this.state.nametxt}
                      onChange={this.changeValue}
                      className="form-control"
                      placeholder="minimum 4 characters"
                    />
                    <span className="text-danger">{this.state.nameerrmsg}</span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phonetxt">Phone Number</label>
                    <input
                      type="text"
                      name="phonetxt"
                      value={this.state.phonetxt}
                      onChange={this.changeValue}
                      className="form-control"
                      placeholder="only digits and minimum 10 digits"
                    />
                    <span className="text-danger">
                      {this.state.phoneerrmsg}
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="emailtxt">Email Address</label>
                    <input
                      type="text"
                      name="emailtxt"
                      value={this.state.emailtxt}
                      onChange={this.changeValue}
                      className="form-control"
                      placeholder="<username>@<domain>.com"
                    />
                    <span className="text-danger">
                      {this.state.emailerrmsg}
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="addresstxt">Address</label>
                    <input
                      type="text"
                      name="addresstxt"
                      value={this.state.addresstxt}
                      onChange={this.changeValue}
                      className="form-control"
                      placeholder="minimum 10 characters"
                    />
                    <span className="text-danger">
                      {this.state.addresserrmsg}
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="usernametxt">Username</label>
                    <input
                      type="text"
                      name="usernametxt"
                      value={this.state.usernametxt}
                      onChange={this.changeValue}
                      className="form-control"
                      placeholder="minimum 8 characters"
                    />
                    <span className="text-danger">
                      {this.state.usernameerrmsg}
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="passwordtxt">Password</label>
                    <input
                      type="password"
                      name="passwordtxt"
                      value={this.state.passwordtxt}
                      onChange={this.changeValue}
                      className="form-control"
                      placeholder="minimum 8 chars, at least one uppercase, one lowercase and one digit"
                    />
                    <span className="text-danger">
                      {this.state.passworderrmsg}
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="password2txt">verify password</label>
                    <input
                      type="text"
                      name="password2txt"
                      value={this.state.password2txt}
                      onChange={this.changeValue}
                      className="form-control"
                      placeholder="verify password"
                    />
                    <span className="text-danger">
                      {this.state.password2errmsg}
                    </span>
                  </div>

                  <br />
                  <div className="form-group">
                    <button
                      type="button"
                      onClick={this.addCust}
                      className="btn btn-primary me-2"
                    >
                      Sign up
                    </button>
                    <button
                      type="button"
                      onClick={this.handleChangeLogin}
                      className="btn btn-primary"
                    >
                      Login
                    </button>
                  </div>
                  <span className="text-success">{this.state.successmsg}</span>
                  <span className="text-danger">{this.state.errormsg}</span>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Signup;
