import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';

//components
import Navbar from './components/Navbar'
//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path="/" component={home}></Route>
          <Route exact path="/login" component={login}></Route>
          <Route exact path="/signup" component={signup}></Route>        
          </Switch>
      </Router>
    </div>
  );
}

export default App;
