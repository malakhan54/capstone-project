import React from "react";
/* eslint-disable default-case */
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApiKey } from "./constants";

const POSTURL = "http://127.0.0.1:8901/users/:userId?APIKey=" + ApiKey;

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //userName//
      usernametxt: "",
      //name
      nametxt: "",
      nameerrmsg: "",
      nameflag: true,
      //phone
      phonetxt: "",
      phoneerrmsg: "",
      phoneflag: true,
      //email
      emailtxt: "",
      emailerrmsg: "",
      emailflag: true,
      //address
      addresstxt: "",
      addresserrmsg: "",
      addressflag: true,
      successmsg: "",
      errormsg: "",
    };
    // console.log("editProfile", props);
    this.userId = props.userId;
  }
  componentDidMount() {
    // fetch user data and render from only after data is fetched
    this.fetchDataFromAPI().then((response) => {
      this.setState({
        usernametxt: response.data.username,
        nametxt: response.data.name,
        phonetxt: response.data.phoneNo,
        emailtxt: response.data.email,
        addresstxt: response.data.address,
      });
    });
  }

  fetchDataFromAPI = () => {
    // console.log("fetchDataFromApi", this.userId);
    let goToUrl = POSTURL.replace(":userId", this.userId);
    return axios
      .get(goToUrl)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ error: error.response.data.message });
        } else {
          this.setState({ error: error.message });
        }
      });
  };

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
    }
  };

  validateName = (value) => {
    if (value.length < 4) {
      this.setState({ nameerrmsg: "Invalid Name" });
      this.setState({ nameflag: false });
    } else {
      this.setState({ nameerrmsg: "" });
      this.setState({ nameflag: true });
    }
  };

  validatePhone = (value) => {
    if ((value.length < 10) | isNaN(value) | (value.length > 10)) {
      this.setState({
        phoneerrmsg: "Invalid Phone Number : example: 0412345678",
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
        addresserrmsg: "Invalid Address: should be minimum 10 characters",
      });
      this.setState({ addressflag: false });
    } else {
      this.setState({ addresserrmsg: "" });
      this.setState({ addressflag: true });
    }
  };

  validateusername = (value) => {
    if (value.length < 8) {
      this.setState({ usernameerrmsg: "Invalid username" });
      this.setState({ usernameflag: false });
    } else {
      this.setState({ usernameerrmsg: "" });
      this.setState({ usernameflag: true });
    }
  };

  addCust = (event) => {
    this.setState({ errormsg: "" });
    if (
      this.state.nameflag &
      this.state.phoneflag &
      this.state.emailflag &
      this.state.addressflag
    ) {
      this.addCustToAPI();
    } else {
      console.log(this.state.nameflag);
      this.preventDefault();
    }
  };

  addCustToAPI = () => {
    let jsonInput = {
      name: this.state.nametxt,
      phoneNo: this.state.phonetxt,
      email: this.state.emailtxt,
      address: this.state.addresstxt,
    };
    let goToUrl = POSTURL.replace(":userId", this.userId);
    axios
      .put(goToUrl, jsonInput)
      .then((response) => {
        console.log(response);
        this.setState({
          successmsg: "Details updated successfully!",
          error: "",
        });
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
  };

  render() {
    return (
      <div className="container row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header bg-custom">
              <h2>
                Edit details<span className="badge badge-primary">Konnect</span>
              </h2>
            </div>
            <div className="card-body">
              <form className="form row g-2">
                <div className="col-md-6">
                  <label htmlFor="usernametxt">Username</label>
                  <input
                    type="text"
                    name="usernametxt"
                    value={this.state.usernametxt}
                    disabled
                    className="form-control"
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="nametxt">
                    Name<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="nametxt"
                    value={this.state.nametxt}
                    onChange={this.changeValue}
                    className="form-control"
                  />
                  <span className="text-danger">{this.state.nameerrmsg}</span>
                </div>

                <div className="col-6">
                  <label htmlFor="phonetxt">
                    Phone Number<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="phonetxt"
                    value={this.state.phonetxt}
                    onChange={this.changeValue}
                    className="form-control"
                  />
                  <span className="text-danger fs-6">
                    {this.state.phoneerrmsg}
                  </span>
                </div>

                <div className="col-6">
                  <label htmlFor="emailtxt">
                    Email Address<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="emailtxt"
                    value={this.state.emailtxt}
                    onChange={this.changeValue}
                    className="form-control"
                  />
                  <span className="text-danger">{this.state.emailerrmsg}</span>
                </div>

                <div className="form-group">
                  <label htmlFor="addresstxt">
                    Address<span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    name="addresstxt"
                    value={this.state.addresstxt}
                    onChange={this.changeValue}
                    className="form-control"
                  />
                  <span className="text-danger">
                    {this.state.addresserrmsg}
                  </span>
                </div>
                <p>
                  <span className="text-danger">*Required fields</span>
                </p>

                <div className="form-group">
                  <button
                    type="button"
                    onClick={this.addCust}
                    className="btn btn-primary btn-sm me-2"
                  >
                    Update
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

export default EditProfile;
