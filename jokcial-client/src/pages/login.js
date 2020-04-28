import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
import AppIcon from '../images/smile.png'
import {Link} from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
//Redux stuff
import {connect} from 'react-redux'
import {loginUser} from '../redux/actions/userActions'
const styles = {
    form:{
        textAlign:"center"
    },
    image:{
        margin:"20px auto 20px"
    },
    pageTitle:{
        margin: '10px auto 10px auto'
    },
    textField:{
        margin: '10x auto 10px auto'
    },
    button:{
        marginTop:20,
        position:'relative'
    },
    customError:{
        color:'red',
        fontSize:"0.8rem"
    },
    progress:{
        position: 'absolute'
    }
}

export class login extends Component {

    constructor(){
        super();
        this.state = {
            email: '',
            password:'',
            errors:{}
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({errors: nextProps.UI.errors})
        }
    }
    handleSubmit =(event)=>{
        event.preventDefault()
      
        const userData ={
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData,this.props.history)
    }

    handleChange = (event)=>{
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    render() {
        const {classes, UI:{loading}} = this.props
        const {errors}= this.state

        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="Smile"/>
                    <Typography variants='h2' className={classes.pageTitle}>
                    Login
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField 
                        id="email" 
                        name='email' 
                        type='email' 
                        label="Email" 
                        className={classes.textField}
                        value={this.state.email} 
                        helperText={errors.email} 
                        error={errors.email ? true:false} 
                        onChange={this.handleChange} 
                        fullWidth
                        />
                        <TextField 
                        id="password" 
                        helperText={errors.password} 
                        error={errors.password ? true:false}  
                        name='password' 
                        type='password' 
                        label="password" 
                        className={classes.textField}
                        value={this.state.password} 
                        onChange={this.handleChange} fullWidth
                        />
                        {errors.general &&(
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" disabled={loading}variant="contained" color="primary" className={classes.button}>
                            Login
                            {loading&&(
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                        <small>
                            Don't have an account? Signup <Link to="/signup">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser :PropTypes.func.isRequired,
    user:PropTypes.func.isRequired,
    UI:PropTypes.func.isRequired
}

const mapStateToProps = (state)=>({
    user: state.user,
    UI: state.UI
})

const mapActionsToProps = {
    loginUser
}
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(login));
