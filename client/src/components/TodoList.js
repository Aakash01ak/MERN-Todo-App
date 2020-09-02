import React, { Component } from 'react'
import axios from 'axios'
import { ListGroup, ListGroupItem, Button, Form, Input, FormGroup } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { withRouter } from "react-router-dom";

class TodoList extends Component {

    constructor(props){
        super(props);
        this.state = {
            todos: [],
            name: ''
        }
    }
       
    componentDidMount(){
     axios.defaults.headers.common['Authentication'] = localStorage.getItem('jwtToken');

     axios.get("api/todos")
     .then(res => {
         this.setState({ todos: res.data})
     })
     .catch((error) => {
          this.props.history.push("/login");
      })
    }

    // logout = () => {
    //     localStorage.removeItem('jwtToken');
    //     this.props.history.push("/login")
    //     window.location.reload();
    //   }

   handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  
  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.name){
    const temp = this.state.name;
        axios
        .post("api/todos",{
            name: this.state.name
        })
        .then(res => {
            this.setState(state => ({
                todos: [ {_id: res.data._id, name: temp}, ...state.todos]
            })) 
        })
    }
    
    this.setState({name: ''});

  }

  onDeleteClick = (_id) => {
    this.setState( state => ({
        todos: state.todos.filter(todo =>(todo._id !== _id))
    }))
      axios.delete(`api/todos/${_id}`)
  }

    render() {
        const { todos } = this.state;
        return (
            <div>

                {/* {
                localStorage.getItem('jwtToken') &&
                    <button className="btn btn-primary" onClick={this.logout}>Logout</button>
                } */}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                    <Input type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter a todo"/>
                    </FormGroup>
                    <Button 
                    className="btn1"
                    color="success" 
                    size="md" 
                    block
                    >Submit</Button>
                </Form>

                    <ListGroup className="mt-5">
                    <TransitionGroup>
                        {
                            todos.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="my-node">
                                <ListGroupItem  >
                                <Button
                                className="btn2" 
                                color="danger"
                                size="sm"
                                onClick={ 
                                            this.onDeleteClick.bind(this, _id)
                                }
                                >&times;
                                </Button>&nbsp;&nbsp;{name}
                                </ListGroupItem>
                            </CSSTransition>
                            
                            ))
                        }
                    </TransitionGroup>
                    </ListGroup>

                
            </div>
        )
    }
}

export default withRouter(TodoList); 
