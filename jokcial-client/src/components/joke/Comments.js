import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
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
      commentImage:{
          maxWidth:"100%",
          height:100,
          objectFir:'cover',
          borderRadius:'50%'
      },
      commentData:{
          marginLeft:20
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

class Comments extends Component{
    render(){
        const {comments,classes} = this.props
        return(
            <Grid container>
                {comments.map((comment,index)=>{
                    const {body,createdAt,userImage,userHandle} = comment;
                    return(
                        <Fragment key={createdAt}>
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h5"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="primary">
                                                    {userHandle}
                                                </Typography>
                                                <Typography variant='body2' color='textSecondary'>
                                                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                                </Typography>
                                                {index!== comments.length-1 && (
                                                    <hr className={classes.invisibleSeparator}/>

                                                )}
                                                <Typography variant = "body1">{body}</Typography>
                                                
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr className={classes.visibleSeparator}/>
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

Comments.propTypes={
    comments: PropTypes.array.isRequired
}

export default withStyles(styles)(Comments)