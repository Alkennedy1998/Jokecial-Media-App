import React, { Component } from 'react'
import MyButton from '../../util/MyButton'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

import FavoriteIcon from "@material-ui/icons/Favorite"
import FavoriteBorder from "@material-ui/icons/FavoriteBorder"

import {connect} from 'react-redux'
import {likeJoke,unlikeJoke} from '../../redux/actions/dataActions'

export class LikeButton extends Component {
    likedJoke=()=>{
        if(this.props.user.likes && this.props.user.likes.find(like=>like.jokeId===this.props.jokeId)){
            return true
        }
        else{
            return false
        }
    }
    likeJoke=()=>{
        this.props.likeJoke(this.props.jokeId)
    }
    unlikeJoke=()=>{
        this.props.unlikeJoke(this.props.jokeId)
    }

    render() {
        const {authenticated} = this.props.user
        const likeButton = !authenticated?(
            <Link to='/login'>

            <MyButton tip='like'>
                    <FavoriteBorder color='primary'/>
            </MyButton>
            </Link>
        ):this.likedJoke()?(
                <MyButton tip="Unlike" onClick={this.unlikeJoke}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ):(
                <MyButton tip="Like" onClick={this.likeJoke}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        
        
        
        
        return likeButton
    }
}

LikeButton.propTypes={
    user:PropTypes.object.isRequired,
    jokeId: PropTypes.string.isRequired,
    likeJoke: PropTypes.func.isRequired,
    unlikeJoke: PropTypes.func.isRequired

}

const mapStateToProps =(state)=>({
    user:state.user
})

const mapActionsToProps={
    likeJoke,
    unlikeJoke
}
export default connect(mapStateToProps, mapActionsToProps)(LikeButton)
