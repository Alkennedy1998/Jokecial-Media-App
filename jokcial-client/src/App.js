import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
//components
import Navbar from './components/Navbar'
//pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#2196f3'
    },
    secondary:{
      main:'#1de9b6'
    }
  },
  typography:{
    usenextVariants: true
  }

})
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
      <Router>
      <Navbar/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={home}></Route>
            <Route exact path="/login" component={login}></Route>
            <Route exact path="/signup" component={signup}></Route>        
          </Switch> 
        </div> 
      </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
