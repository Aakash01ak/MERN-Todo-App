import React from 'react';
import { Container } from 'reactstrap'
import TodoList from './components/TodoList'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <div>
      <Container>
        <TodoList />
      </Container>
    </div>
  );
}

export default App;
