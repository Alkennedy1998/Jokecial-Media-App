import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
import dayjs from 'dayjs'
import {Link} from 'react-router-dom'

//MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'
import CircularProgress from '@material-ui/core/CircularProgress'
import CloseIcon from "@material-ui/icons/Close"
import UnfoldMore from "@material-ui/icons/UnfoldMore"
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/icons/Close'
import {connect} from 'react-redux'
import {getJoke} from '../redux/actions/dataActions'

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
    }
    render(){
        const{classes,
            joke:{jokeId,body,createdAt,likeCount,commentCount,userImage,userHandle},UI:{loading}}=this.props

        const dialogMarkup = loading?(
            <CircularProgress size={200}/>
        ):(
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt='profile' className={classes.profileImage}/>
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
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant='body2' color='textSecondary'>
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant='body1'>
                            {body}
                        </Typography>
                </Grid>
            </Grid>
        )
        
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Expand Joke" tipClassName={classes.extendButton}>
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
    joke:PropTypes.object.isRequired
}

const mapStateToProps = state=>({
    joke:state.data.joke,
    UI:state.UI
})

const mapActionsToProps={
    getJoke
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(JokeDialog))