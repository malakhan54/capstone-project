/* eslint-disable default-case */
import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import validator from "validator";
import DisplayPage from "./DisplayPage";
import { ApiKey } from "./constants";

//npm install validator

const POSTURL =
  "http://127.0.0.1:8901/users/updatePassword/:userName?APIKey=" + ApiKey;

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordOld: "",
      passwordOlderrmsg: "",
      passwordOldflag: false,
      passwordNew: "",
      passwordNewerrmsg: "",
      passwordNewflag: false,
      passwordConfirm: "",
      passwordConfirmerrmsg: "",
      passwordConfirmflag: false,
      successmsg: "",
      errormsg: "",
    };
    this.userId = props.userId;
  }
  changeValue = (event) => {
    const fieldName = event.target.name;
    switch (fieldName) {
      case "passwordOld":
        this.setState({ passwordOld: event.target.value });
        break;
      case "passwordNew":
        this.setState({ passwordNew: event.target.value });
        this.validatepassword(event.target.value);
        break;
      case "passwordConfirm":
        this.setState({ passwordConfirm: event.target.value });
        this.validatepasswordConfirm(event.target.value);
        break;
    }
  };
  validatepassword = (value) => {
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;

    if (value.length === 0) {
      this.setState({
        passwordNewerrmsg: "Invalid password: Password is empty",
      });
      this.setState({ passwordNewflag: false });
    } else if (!uppercaseRegExp.test(value)) {
      this.setState({
        passwordNewerrmsg: "Invalid password: At least one Uppercase",
      });
      this.setState({ passwordNewflag: false });
    } else if (!lowercaseRegExp.test(value)) {
      this.setState({
        passwordNewerrmsg: "Invalid password: At least one Lowercase",
      });
      this.setState({ passwordNewflag: false });
    } else if (!digitsRegExp.test(value)) {
      this.setState({
        passwordNewerrmsg: "Invalid password: At least one digit",
      });
      this.setState({ passwordNewflag: false });
    } else if (!minLengthRegExp.test(value)) {
      this.setState({
        passwordNewerrmsg: "Invalid password: minumum 8 characters",
      });
      this.setState({ passwordNewflag: false });
    } else {
      this.setState({ passwordNewerrmsg: "" });
      this.setState({ passwordNewflag: true });
    }
  };
  // validatepassword = (value) => {

  //     // if (validator.isStrongPassword(value, {
  //     //     minLength: 8
  //     // }))
  //     if (value.length >=8)
  //     {
  //         this.setState({ passwordNewerrmsg: "" })
  //         this.setState({ passwordNewflag: true })
  //     } else {
  //         this.setState({ passwordNewerrmsg: "Password should have minimum 8 chars, at least one uppercase, one lowercase and one digit" })
  //         this.setState({ passwordNewflag: false })
  //     }
  // }

  validatepasswordConfirm = (value) => {
    if ((value.length < 4) | (value !== this.state.passwordNew)) {
      this.setState({ passwordConfirmerrmsg: "Password did not match" });
      this.setState({ passwordConfirmflag: false });
    } else {
      this.setState({ passwordConfirmerrmsg: "" });
      this.setState({ passwordConfirmflag: true });
    }
  };

  addCust = () => {
    this.setState({ errormsg: "" });
    if (this.state.passwordNewflag && this.state.passwordConfirmflag) {
      this.addCustToAPI();
    } else {
      this.preventDefault();
    }
  };

  addCustToAPI = () => {
    let goToUrl = POSTURL + this.userId;
    let jsonInput = {
      oldpassword: this.state.passwordOld,
      newpassword: this.state.passwordNew,
      confirmpassword: this.state.passwordConfirm,
    };
    axios
      .put(goToUrl.replace(":userId", this.userId), jsonInput)
      .then((response) => {
        console.log(response);
        this.setState({
          successmsg: "Password updated successfully !",
          error: "",
        });
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          this.setState({ errormsg: error.response.data, successmsg: "" });
        } else {
          this.setState({ errormsg: "Error occured", successmsg: "" });
        }
      });
  };

  preventDefault = () => {
    this.setState({ errormsg: "Please enter all the fields" });
  };

  render() {
    if (this.state.goBackFlag) {
      return <DisplayPage userType="U" />;
    } else
      return (
        <div className="container-fluid row">
          <div className="col-md-8 offset-md-2">
            <div className="card">
              <div className="card-header bg-custom">
                <h2>
                  Change password
                  <span className="badge badge-primary">Konnect</span>
                </h2>
              </div>
              <div className="card-body">
                <form className="form">
                  <div className="form-group">
                    <label htmlFor="passwordOld">
                      Old Password<span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      name="passwordOld"
                      value={this.state.passwordOld}
                      onChange={this.changeValue}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {this.state.passwordOlderrmsg}
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="passwordNew">
                      New Password<span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      name="passwordNew"
                      value={this.state.passwordNew}
                      onChange={this.changeValue}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {this.state.passwordNewerrmsg}
                    </span>
                  </div>

                  <div className="form-group">
                    <label htmlFor="passwordConfirm">
                      Confirm password<span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      name="passwordConfirm"
                      value={this.state.password2txt}
                      onChange={this.changeValue}
                      className="form-control"
                    />
                    <span className="text-danger">
                      {this.state.passwordConfirmerrmsg}
                    </span>
                  </div>

                  <p>
                    <span className="text-danger">*Required fields</span>
                  </p>

                  <div className="form-group">
                    <button
                      type="button"
                      onClick={this.addCust}
                      className="btn  btn-primary btn-sm me-2"
                      me-2
                    >
                      Update password
                    </button>
                  </div>
                  <br></br>
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

export default ChangePassword;
