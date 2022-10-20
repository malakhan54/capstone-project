import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'primeicons/primeicons.css';

function NavBar() {

  return (

    <Navbar bg="light" expand="lg">

      <Container>

        <Navbar.Brand href="#home">React-Project</Navbar.Brand>

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">

            <Nav.Link href="#home">Home</Nav.Link>

            <Nav.Link href="#link">Contact Us</Nav.Link>

          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>

    //buttons
   

  );
  //<div>
    //<form><button type="button" class= "btn btn-primary btn-lg btn-block" onClick={clicked}>LOGIN</button>
////<button type="button" class="btn btn-secondary btn-lg btn-block" onClick={clicked}>SIGN UP</button>
//</form>
//</div>


}



export default NavBar;

