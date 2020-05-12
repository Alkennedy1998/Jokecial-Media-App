import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Joke from '../components/joke/Joke'
import Grid from '@material-ui/core/Grid'
import JokeSkeleton from '../util/JokeSkeleton'

import StaticProfile from '../components/profile/StaticProfile'
import {connect} from 'react-redux'
import {getUserData} from '../redux/actions/dataActions'
export class user extends Component {

    state ={
        profile:null,
        jokeIdParam : null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle
        const jokeId = this.props.match.params.jokeId

        if(jokeId) this.setState({jokeIdParam:jokeId})

        this.props.getUserData(handle)
        axios.get(`/user/${handle}`)
        .then(res=>{
            this.setState({
                profile:res.data.user
            })
        })
        .catch(err=>console.log(err))
    }
    render() {

        const {jokes,loading} = this.props.data
        const {jokeIdParam} = this.state
        const jokesMarkup = loading?(
            <JokeSkeleton/>
        ):jokes===null ? (
            <p>No jokes from this user</p>
        ): !jokeIdParam ? (
            jokes.map(joke=><Joke key={joke.jokeId} joke={joke}/>)
        ):(
            jokes.map(joke=>{
                if(joke.jokeId!==jokeIdParam)
                    return <Joke key={joke.jokeId} joke={joke}/>
                else return <Joke key={joke.jokeId} joke={joke} openDialog/>
            })
        )
        return (
            <Grid container spacing={16}>
            <Grid item sm={8} xs={12}>
                {jokesMarkup}
            </Grid>
            <Grid item sm={4} xs={12}>
                {this.state.profile===null ?(
                    <p>Loading profile...</p>
                ):(
                    <StaticProfile profile={this.state.profile}/>
                )}
            </Grid>
        </Grid>
        )
    }
}

user.propTypes={
    getUserData: PropTypes.func.isRequired,
    data:PropTypes.object.isRequired
}

const mapStateToProps = state=>({
    data:state.data
})
export default connect(mapStateToProps,{getUserData})(user)
