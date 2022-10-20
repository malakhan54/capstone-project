import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { ApiKey } from "./constants";

import DisplayPage from "./DisplayPage";
const POSTURL = "http://127.0.0.1:8901/login/?APIKey=" + ApiKey;

/* eslint-disable default-case */
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtusername: "",
      txtuserPassword: "",
      usernameflag: false,
      validation: false,
      userId: "",
      userType: "",
      errMessage: "",
      flag: false,
      signupFlag: false,
    };
  }
  changeValue = (event) => {
    const fieldName = event.target.name;
    switch (fieldName) {
      case "username":
        this.setState({ txtusername: event.target.value });
        this.validateUserName(event.target.value);
        break;
    }
  };
  //Validation
  validateUserName = (value) => {
    if (value.length < 5) {
      this.setState({ errmsgusername: "Invalid username" });
      this.setState({ usernameflag: false });
    } else {
      this.setState({ errmsgusername: "" });
      this.setState({ usernameflag: true });
    }
  };

  handleUserNamePassword = (event) => {
    if (event.target.name === "username")
      this.setState({ txtusername: event.target.value });
    else if (event.target.name === "pwd")
      this.setState({ txtuserPassword: event.target.value });
  };

  checkUser = () => {
    let json = {
      username: this.state.txtusername,
      password: this.state.txtuserPassword,
    };

    axios
      .post(POSTURL, json)
      .then((response) => {
        let data = response.data;
        console.log("data", data);
        if (data && data.validation === true) {
          this.setState({ userId: data._id, userType: data.type, flag: true });
        } else
          this.setState({
            errMessage: "Invalid username or password!",
            flag: false,
          });
      })
      .catch((error) => {
        if (error.response) {
          console.log("error", error.response.data.message);
          this.setState({
            errMessage: "Invalid username or password!",
            flag: false,
          });
        } else {
          console.log("error else", error.message);
        }
      });
  };

  handleCreateNew = (event) => {
    this.setState({ signupFlag: true });
  };

  render() {
    if (this.state.flag) {
      // display user page
      // add user id and type to localstorage
      localStorage.setItem("loggedIn", true);
      localStorage.setItem("userId", this.state.userId);
      localStorage.setItem("userType", this.state.userType);

      // return <DisplayPage />
      return <Navigate to="/display"></Navigate>;
    } else if (this.state.signupFlag == true) {
      return <Navigate to="/signup"></Navigate>;
    } else {
      localStorage.setItem("loggedIn", false);
      return (
        <div>
          <Container>
            <Row className="vh-10 d-flex justify-content-center align-items-center">
              <Col md={8} lg={6} xs={12}>
                <div className="border border-3 border-primary"></div>
                <Card className="shadow">
                  <Card.Body>
                    <div className="mb-2 mt-md-2">
                      <h2 className="fw-bold mb-2 text-uppercase ">Konnect</h2>
                      <p className=" mb-2 text-info">
                        Please enter your details to login or
                        <button
                          name="signup"
                          className="btn btn-light btn-sm "
                          type="button"
                          onClick={this.handleCreateNew}
                        >
                          Create New Account
                        </button>
                      </p>
                      <p>
                        <span className="text-danger">
                          {this.state.errMessage}
                        </span>
                      </p>
                      <div className="mb-1">
                        <Form>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label className="text-center">
                              User Name
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="User Name"
                              name="username"
                              onChange={this.handleUserNamePassword}
                            />
                          </Form.Group>

                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              type="password"
                              placeholder="Password"
                              name="pwd"
                              onChange={this.handleUserNamePassword}
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicCheckbox"
                          ></Form.Group>
                          <div>
                            <button
                              className="btn-primary btn btn-sm"
                              type="button"
                              onClick={this.checkUser}
                            >
                              Login
                            </button>
                          </div>
                          <div></div>
                        </Form>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      );
    }
  }
}
