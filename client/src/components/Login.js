import React from 'react'
import axios from 'axios'
import {  Button, Form, Input, FormGroup} from 'reactstrap';
import {  Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          email: '',
          password: ''
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillUnmount() {
      // fix Warning: Can't perform a React state update on an unmounted component
      this.setState = (state,callback)=>{
          return;
      };
  }
  
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();

      const { email, password } = this.state;
      // const info = JSON.stringify({ email, password})

        axios
        .post('api/user/login', {email, password})
        .then(res => {
          window.sessionStorage.setItem('jwtToken', res.data);
          this.props.history.push('/')
          this.setState({email :""});
          this.setState({password :""});
        })
        .catch((error) => {
            alert(JSON.stringify(error.response.data.msg));
        });
    }
  
    render() {
      return (
        <div>
        <h2 style={{textAlign:"center", marginBottom: "30px"}}>Login</h2>
        <Form style={{border:"2px solid red", padding: "50px"}} onSubmit={this.handleSubmit}>
            <FormGroup>
            <h5>Email:</h5> <Input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
            <h5>Password:</h5> <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </FormGroup>
          <Button color="info" block size="md">Login</Button>
          <p className="mt-3">
            Not a member? <Link to="/register">Register here</Link>
          </p>
        </Form>
        </div>
      );
    }
  }

  export default withRouter(Login)