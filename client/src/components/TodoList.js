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
            name: '',
            isCompleted: false
        }
    }
       
    componentDidMount(){
     axios.defaults.headers.common['Authentication'] = sessionStorage.getItem('jwtToken');

     axios.get("api/todos")
     .then(res => {
         this.setState({ todos: res.data})
     })
     .catch((error) => {
          this.props.history.push("/login");
      })
    }

   handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value});
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

  onCompleteClick = (_id, isCompleted) => {

    this.setState(state => ({
        todos: state.todos.map(todo => (
            todo._id === _id ? { ...todo, isCompleted : !isCompleted} : todo
        ))
    }))

    axios.patch(`api/todos/${_id}`, {
        isCompleted : !isCompleted
    }) 
  }

    render() {
        const { todos } = this.state;
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                    <Input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter a todo"/>
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
                            todos.map(({ _id, name, isCompleted }) => (
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
                                </Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Input
                                type="checkbox"
                                name="isCompleted"
                                checked={isCompleted}
                                onChange={this.handleChange}
                                onClick={ 
                                            this.onCompleteClick.bind(this, _id, isCompleted)
                                }
                                ></Input>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <div style={{textDecoration: isCompleted ? "line-through" : "", display:"inline"}}>{name}</div>
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
