import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap'
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import DisplayPage from './DisplayPage';

export default class NavLinks extends Component {
    render() {
        return (

            <Router>
                <div className="border border-1 border-primary"></div>
                <div className='container m-4' >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/display" element={<DisplayPage />} />

                    </Routes>
                </div>
            </Router>


        )
    }
}