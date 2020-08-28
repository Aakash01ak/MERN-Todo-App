import React, { Component } from 'react'
import axios from 'axios'
import { ListGroup, ListGroupItem, Button, Form, Input, FormGroup } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group'

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

        axios
        .post("api/todos",{
            name: this.state.name
        })
        .then(res => {
            this.setState(state => ({
                todos: [ {_id: res.data._id, name: this.state.name}, ...state.todos]
            })) 
        })
    }
    setTimeout(() => {
        this.setState({name: ''});
    }, 500)
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
                    <TransitionGroup>
                        {
                            todos.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="my-node">
                                <ListGroupItem  >
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
                            </CSSTransition>
                            
                            ))
                        }
                    </TransitionGroup>
                    </ListGroup>

                
            </div>
        )
    }
}

export default TodoList; 
