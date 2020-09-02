import React from 'react'
import {  Button, Form, Input, FormGroup} from 'reactstrap';
import axios from 'axios'
import { withRouter } from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          name:'',
          email: '',
          password: ''
        };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();

      const { name, email, password } = this.state;

      axios
      .post('api/user/register', { name, email, password })
      .then((res) => {
        alert(`Welcome ${JSON.stringify(res.data.user)}`);
        this.setState({name :""});
        this.setState({email :""});
        this.setState({password :""});
        this.props.history.push("/login")
      })
      .catch(err => {
        alert(JSON.stringify(err.response.data.msg));
      })
    }
  
    render() {
      return (
        <div>
        <h2 style={{textAlign:"center", marginBottom: "30px"}}>Register</h2>
        <Form style={{border:"2px solid red", padding: "50px"}} onSubmit={this.handleSubmit}>
            <FormGroup>
            <h5>Name:</h5> <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
            <h5>Email:</h5> <Input type="text" name="email" value={this.state.email} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
            <h5>Password:</h5> <Input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </FormGroup>
          <Button color="info" block size="md">Register</Button>
        </Form>
        </div>
      );
    }
  }

  export default withRouter(Register);