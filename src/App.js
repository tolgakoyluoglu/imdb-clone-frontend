import React, { Component } from "react";
import Home from "./components/home/Home";
import { Route, BrowserRouter } from "react-router-dom";
//Components
import Movie from "./components/movies/Movie";
import Profile from "./components/profile/Profile";
import Login from "./components/login/Login";
import Navbar from './components/navbar/Navbar';
import Register from './components/register/Register';
import Footer from './components/footer/Footer';
import Start from "./components/start/Start";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Start} />
          <Route exact path="/movies" component={Home} />
          <Route path="/movie/:id" component={Movie} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
