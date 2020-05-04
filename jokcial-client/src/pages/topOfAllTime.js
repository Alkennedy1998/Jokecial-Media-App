import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Profile from '../components/profile/Profile'
import Joke from '../components/joke/Joke'

import {connect } from 'react-redux'
import {getJokes} from '../redux/actions/dataActions'
class home extends Component {
   
    componentDidMount(){
        this.props.getJokes()
    }
    render() {
        const {jokes, loading} = this.props.data;
        let recentJokesMarkup = !loading ? (
        jokes.map(joke => <Joke key={joke.jokeId} joke={joke}/>)
        ) :<p>Loading...</p>

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    <h1 color='primary'>Top of All Time</h1>
                    {recentJokesMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

home.propTypes={
    getJokes:PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
const mapStateToProps = state=>({
    data:state.data
})

export default connect(mapStateToProps, {getJokes})(home)
