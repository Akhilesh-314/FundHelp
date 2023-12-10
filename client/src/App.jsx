import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from "reactstrap";
import { AuthProvider } from './context/AuthContext';

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import About from "./components/About";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import Login from "./components/Login";
import GetFunds from "./components/GetFunds";
import Donate from "./components/Donate";

import './App.css'

import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

function App() {
  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <div className="app-bg">
          <AuthProvider>
            <NavBar />
            <Container className="body-container flex-grow-1 mt-5">
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/about" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/profile" component={Profile} />
                <Route path="/getfunds" component={GetFunds} />
                <Route exact path="/donate" component={Donate} />
              </Switch>
            </Container>
            <Footer />
          </AuthProvider>
        </div>
        
      </div>
    </Router>
  )
}

export default App
