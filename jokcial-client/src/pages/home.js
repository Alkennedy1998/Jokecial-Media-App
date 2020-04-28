import React, { Component } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'

import Profile from '../components/Profile'
import Joke from '../components/Joke'

class home extends Component {
    state={
        jokes: null
    }
    componentDidMount(){
        axios.get("/jokes")
        .then(res=>{
            this.setState({
                jokes:res.data
            })
        })
        .catch(err=>console.log(err));
    }
    render() {
        let recentJokesMarkup = this.state.jokes ? (
        this.state.jokes.map(joke => <Joke key={joke.jokeId} joke={joke}/>)
        ) :<p>Loading...</p>

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    {recentJokesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

export default home
