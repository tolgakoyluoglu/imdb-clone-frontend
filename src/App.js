import React, { Component } from "react";
import Home from "./components/home/Home";
import { Route, BrowserRouter } from "react-router-dom";
//Components
import Movie from "./components/movies/Movie";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Navbar from './components/navbar/Navbar';
import Register from './components/register/Register';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/movie/:id" component={Movie} />
          <div>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
