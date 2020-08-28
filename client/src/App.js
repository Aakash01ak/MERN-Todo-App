import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'reactstrap'
import AppNavbar from './components/AppNavbar'
import TodoList from './components/TodoList'


function App() {
  return (
    <div>
        <AppNavbar />
      <Container>
        <TodoList />
      </Container>
    </div>
  );
}

export default App;
