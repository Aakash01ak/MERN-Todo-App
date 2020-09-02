import React from 'react';
import Home from './Home'
import AppNavbar from './components/AppNavbar'
import Register from './components/Register'
import Login from './components/Login'
import { Container } from 'reactstrap'

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <AppNavbar />
        <Container>
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Container>
        </Router>
    </div>
  );
}

export default App;
