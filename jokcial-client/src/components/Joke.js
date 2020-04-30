import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import PropTypes from "prop-types"
import MyButton from '../util/MyButton'
import ChatIcon from '@material-ui/icons/Chat'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorder from '@material-ui/icons/FavoriteBorder'
import DeleteJoke from './DeleteJoke'
import {connect} from 'react-redux'
import {likeJoke,unlikeJoke} from '../redux/actions/dataActions'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography'

const styles = {
    card:{
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image:{
        minWidth:200,
    },
    content:{
        padding: 25,
        objectFit:"cover"
    }
}
export class Joke extends Component {

    likedJoke=()=>{
        if(this.props.user.likes && this.props.user.likes.find(like=>like.jokeId===this.props.joke.jokeId)){
            return true
        }
        else{
            return false
        }
    }
    likeJoke=()=>{
        this.props.likeJoke(this.props.joke.jokeId)
    }
    unlikeJoke=()=>{
        this.props.unlikeJoke(this.props.joke.jokeId)
    }
    render() {
        dayjs.extend(relativeTime)

        const { classes,user:{authenticated,credentials:{handle}},joke:{body,createdAt,userImage,userHandle,jokeId,likeCount,commentCount} } = this.props

        const likeButton = !authenticated?(
            <MyButton tip='like'>
                <Link to='/login'>
                    <FavoriteBorder color='primary'/>
                </Link>
            </MyButton>
        ):(
            this.likedJoke()?(
                <MyButton tip="Unlike" onClick={this.unlikeJoke}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ):(
                <MyButton tip="Like" onClick={this.likeJoke}>
                    <FavoriteBorder color="primary"/>
                </MyButton>
            )
        )

        const deleteButton = authenticated && userHandle === handle ?(
            <DeleteJoke jokeId={jokeId}/>
        ):null
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography 
                    variants="h5" 
                    component={Link} 
                    to={`/users/${userHandle}`}
                    color="primary"
                    >{userHandle}</Typography>
                    {deleteButton}
                    <Typography variants="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
                    <Typography variants="body1" >{body}</Typography>
                    {likeButton}
                    <span>{likeCount} Likes</span>
                    <MyButton tip='comments'>
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>
                </CardContent>
            </Card>
        )
    }
}

Joke.propType={
    likeJoke:PropTypes.func.isRequired,
    unlikeJoke:PropTypes.func.isRequired,
    user:PropTypes.object.isRequired,
    joke:PropTypes.object.isRequired,
    classes:PropTypes.object.isRequired


}
const mapStateToProps = state =>({
    user:state.user
})

const mapActionsToProps={
    likeJoke,
    unlikeJoke
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Joke))
