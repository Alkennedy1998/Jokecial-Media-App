import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import {connect} from 'react-redux'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'

import {submitComment} from '../../redux/actions/dataActions'

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

class CommentForm extends Component {

    state={
        body:'',
        errors:{}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors:nextProps.UI.errors})
        }
    }
    handleChange = (event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        this.props.submitComment(this.props.jokeId,{body:this.state.body})
    }
    render() {
        const {classes,authenticated} = this.props
        const errors = this.state.errors
        const commentFormMarkup = authenticated ?(
            <Grid item sm={12} style={{textAlign:'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type='text'
                        label="Comment on Joke"
                        error={errors.comment?true:false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                        />
                        <Button type='submit'
                        variants='contained'
                        color="primary"
                        className={classes.button}
                        >Submit</Button>
                </form>
                <hr className={classes.visibleSeperator}/>
            </Grid>
        ):null
        return commentFormMarkup
    }
}

CommentForm.propTypes={
    submitComment:PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    jokeId: PropTypes.string.isRequired,
    authenticated: PropTypes.bool.isRequired


}
const mapStateToProps= state =>({
    UI:state.UI,
    authenticated:state.user.authenticated
})
export default connect(mapStateToProps,{submitComment})(withStyles(styles)(CommentForm))
