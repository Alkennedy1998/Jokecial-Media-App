import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import Profile from '../components/profile/Profile'
import Joke from '../components/joke/Joke'

import JokeSkeleton from '../util/JokeSkeleton'
import {connect } from 'react-redux'
import {getRecentJokes} from '../redux/actions/dataActions'
class home extends Component {
   
    componentDidMount(){
        this.props.getRecentJokes()
    }
    render() {
        const {jokes, loading} = this.props.data;
        let recentJokesMarkup = !loading ? (
        jokes.map(joke => <Joke key={joke.jokeId} joke={joke}/>)
        ) :<JokeSkeleton/>

        return (
            <Grid container spacing={16}>
                <Grid item sm={8} xs={12}>
                    <h1>Most Recent</h1>
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
    getRecentJokes:PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}
const mapStateToProps = state=>({
    data:state.data
})

export default connect(mapStateToProps, {getRecentJokes})(home)
