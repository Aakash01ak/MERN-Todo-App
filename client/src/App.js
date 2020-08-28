import React from 'react';
import { Container } from 'reactstrap'
import AppNavbar from './components/AppNavbar'
import TodoList from './components/TodoList'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


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
