import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import MyButton from '../util/MyButton'
import {connect} from 'react-redux'
import {editUserDetails} from '../redux/actions/userActions'
import {postJoke,clearErrors} from '../redux/actions/dataActions'
//MUI stuff
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit'
import CircularProgress from '@material-ui/core/CircularProgress'
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"


const styles = {
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
    invisibleSeparator: {
      border: 'none',
      margin: 4
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
    }
  }
class PostJoke extends Component{

    state={
        open:false,
        body:'',
        errors:{}
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors:nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors&&!nextProps.UI.loading){
            this.setState({body:'',open:false,errors:{}})
            
        }

    }
    handleOpen=()=>{
        this.setState({
            open:true
        })
    }
    handleClose=()=>{
        this.props.clearErrors()
        this.setState({
            open:false,
            errors:{}
        })
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        this.props.postJoke({body:this.state.body})
    }
    render(){
        const {errors} = this.state;
        const {classes,UI:{loading}}= this.props
        return(
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a joke!">
                    <AddIcon/>
                </MyButton>
                <Dialog 
                open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Post a new joke</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Joke"
                                multiline
                                rows="3"
                                placeholder="Share your best jokes"
                                errors={errors.body ? true:false}
                                helperText={errors.body}
                                className={classes.textField}
                                onChange={this.handleChange}
                                fullWidth
                                />
                                <Button type="submit" variant="contained" color="primary"
                                    className={classes.submitButton} disabled={loading}>
                                        Submit
                                        {loading && (
                                            <CircularProgress size={30} className={classes.progressSpinner}/>
                                        )}
                                    </Button>
                            
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}
PostJoke.propTypes={
    postJoke:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired,
    UI:PropTypes.object.isRequired
}

const mapStateToProps=(state)=>({
    UI:state.UI
})
export default connect(
  mapStateToProps,
  {postJoke,clearErrors}
  )(withStyles(styles)(PostJoke))