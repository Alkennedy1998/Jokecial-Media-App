import React, { Component } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Joke from '../components/joke/Joke'
import Grid from '@material-ui/core/Grid'
import StaticProfile from '../components/profile/StaticProfile'
import {connect} from 'react-redux'
import {getUserData} from '../redux/actions/dataActions'
export class user extends Component {

    state ={
        profile:null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle
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

        const jokesMarkup = loading?(
            <p>Loading data...</p>
        ):jokes===null ? (
            <p>No jokes from this user</p>
        ):(
            jokes.map(joke=><Joke key={joke.jokeId} joke={joke}/>)
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
