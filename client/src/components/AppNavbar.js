import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';


class AppNavbar extends Component {

  constructor(props){
    super(props);
    this.state= {
      isOpen: false
    }
  }

   toggle = () => {
     this.setState({isOpen : !this.state.isOpen})
   }

   logout = () => {
    localStorage.removeItem('jwtToken');
    this.props.history.push("/login")
    window.location.reload();
  }
render(){
  return (
    <div>
      <Navbar color="dark" dark expand="md" className="mb-5">
        <Container>
        <NavbarBrand href="/">Todo App</NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/Aakash01ak/MERN-To-Do-App"><h6>GitHub</h6></NavLink>
            </NavItem>
            {
            localStorage.getItem('jwtToken') 
            ? 
            <NavItem>
            <NavLink onClick={this.logout}><h6>Logout</h6></NavLink>
            </NavItem> 
            :
            <>
           <NavLink href="/register"><h6>Register</h6></NavLink>
           <NavLink href="/login"><h6>Login</h6></NavLink>
           </>
            }
          </Nav>
        </Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
}

export default withRouter(AppNavbar);