import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../../util/MyButton'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'
import Comments from'./Comments'
import CommentForm from './CommentForm'
//MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from "@material-ui/icons/Close"
import UnfoldMore from "@material-ui/icons/UnfoldMore"
import Grid from '@material-ui/core/Grid'
import ChatIcon from '@material-ui/icons/Chat'
import Typography from '@material-ui/core/Typography'
import {connect} from 'react-redux'
import {getJoke,clearErrors} from '../../redux/actions/dataActions'
import LikeButton from './LikeButton'

const styles={
    palette: {
        primary: {
          light: '#33c9dc',
          main: '#00bcd4',
          dark: '#008394',
          contrastText: '#fff'
        },
        secondary: {
          light: '#ff6333',
          main: '#ff3d00',
          dark: '#b22a00',
          contrastText: '#fff'
        }
      },
      expandButton:{
          position:'absolute',
          left:'90%'

      },
      typography: {
        useNextVariants: true
      },
      form: {
        textAlign: 'center'
      },
      image: {
        margin: '20px auto 20px auto'
      },
      pageTitle: {
        margin: '10px auto 10px auto'
      },
      textField: {
        margin: '10px auto 10px auto'
      },
      button: {
        marginTop: 20,
        position: 'relative'
      },
      customError: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: 10
      },
      progress: {
        position: 'absolute'
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      paper: {
        padding: 20
      },
      submitButton:{
          prosition:'relative',
          float: "right",
          marginTop:10
      },
      progressSpinner:{
          position:'absolute'
      },
      closeButton:{
          position:"absolute",
          left:"91%",
          top:'6%'
      },
      invisibleSeparator:{
          border:'none',
          margin: 4
      },
      profileImage:{
          maxWidth:200,
          height:200,
          borderRadius:"50%",
          objectFit:"Cover"
      },
      dialogContent:{
          padding:20
      },
      spinnerDiv:{
          textAlign:'center',
          marginTop:50,
          marginBottom:50
      }
}

class JokeDialog extends Component{
    state={
        open:false
    }
    handleOpen=()=>{
        this.setState({open:true})
        this.props.getJoke(this.props.jokeId)
    }
    handleClose=()=>{
        this.setState({open:false})
        this.props.clearErrors()
    }
    render(){
        const{classes,
            joke:{jokeId,body,comments,createdAt,likeCount,commentCount,userImage,userHandle},UI:{loading}}=this.props

            const dialogMarkup = loading ? (
                <div className={classes.spinnerDiv}>
                  <CircularProgress size={200} thickness={2} />
                </div>
              ) : (
                <Grid container spacing={16}>
                  <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                  </Grid>
                  <Grid item sm={7}>
                    <Typography
                      component={Link}
                      color="primary"
                      variant="h5"
                      to={`/users/${userHandle}`}
                    >
                      @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>  
                    <LikeButton jokeId={jokeId}/>
                    
                    <span>{likeCount} likes</span>  
                    <MyButton tip='comments'>
                        <ChatIcon color="primary"/>
                    </MyButton>
                    <span>{commentCount} Comments</span>             
                  </Grid>
                  <hr className={classes.visibleSeperator}/>
                  <CommentForm jokeId ={jokeId}/>
                  <Comments comments={comments}/>
                
                </Grid>
              );
        
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand Joke" tipClassName={classes.expandButton}>
                    <UnfoldMore color='primary'/>
                </MyButton>
                <Dialog
                open={this.state.open} 
                onClose={this.handleClose} 
                fullWidth maxWidth="sm"
                >
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

JokeDialog.propTypes={
    getJoke: PropTypes.func.isRequired,
    jokeId : PropTypes.string.isRequired,
    userHandle:PropTypes.string.isRequired,
    joke:PropTypes.object.isRequired,
    clearErrors:PropTypes.func.isRequired
}

const mapStateToProps = state=>({
    joke:state.data.joke,
    UI:state.UI
})

const mapActionsToProps={
    getJoke,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(JokeDialog))