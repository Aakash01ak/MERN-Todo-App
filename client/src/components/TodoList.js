import React, { Component } from 'react'
import axios from 'axios'
import { ListGroup, ListGroupItem, Button, Form, Input, FormGroup } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

class TodoList extends Component {

       state = {
        todos: [],
        name: ''
    }

    componentDidMount(){
     axios.get("api/todos")
     .then(res => {
         this.setState({ todos: res.data})
     })
    }

   handleChange = (event) => {
    this.setState({name: event.target.value});
  }

  
  handleSubmit = (event) => {
    event.preventDefault();

    if(this.state.name){
        this.setState(state => ({
            todos: [ {_id: uuidv4(), name: this.state.name}, ...state.todos]
        }))

        axios
        .post("api/todos",{
            name: this.state.name
        })
    }
    this.setState({name: ''});
  }

  onDeleteClick = (_id) => {
      axios.delete(`api/todos/${_id}`)
      this.setState( state => ({
        todos: state.todos.filter(todo =>(todo._id !== _id))
    }))
  }

    render() {
        const { todos } = this.state;
        return (
            <div>
                
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                    <Input type="text" value={this.state.name} onChange={this.handleChange} placeholder="Enter a todo"/>
                    </FormGroup>
                    <Button 
                    className="btn"
                    color="success" 
                    size="md" 
                    block
                    >Submit</Button>
                </Form>


                <ListGroup className="mt-5">
                     {
                         todos.map(({ _id, name }) => (
                         <ListGroupItem  key={_id}>
                             <Button
                              className="btn1" 
                              color="danger"
                              size="sm"
                              onClick={ 
                                        this.onDeleteClick.bind(this, _id)
                              }
                             >&times;
                             </Button>&nbsp;&nbsp;{name}
                             </ListGroupItem>
                         ))
                     }
                </ListGroup>
            </div>
        )
    }
}

export default TodoList; 
