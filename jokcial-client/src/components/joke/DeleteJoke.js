import React, { Component,Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from "prop-types"
import MyButton from '../../util/MyButton'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DeleteOutline from '@material-ui/icons/DeleteOutline'

import {connect} from 'react-redux'
import {deleteJoke} from '../../redux/actions/dataActions'

const styles ={
    deleteButton:{
        position:"absolute",
        left: '80%',
        top:'10%'
    }
}
class DeleteJoke extends Component {
    state={
        open:false
    }
    handleOpen=()=>{
        this.setState({
            open:true
        })
    }
    handleClose=()=>{
        this.setState({
            open:false
        })
    }
    deleteJoke=()=>{
        this.props.deleteJoke(this.props.jokeId)
        this.setState({
            open:false
        })
    }
    render() {
        const {classes} = this.props
        return (
            <Fragment>
                <MyButton tip="Delete Joke"
                onClick={this.handleOpen}
                btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary"/>
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWifth="sm"
                    >
                        <DialogTitle>
                            Are you sure you want to delete this joke?
                        </DialogTitle>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={this.deleteJoke} color="secondary">
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
            </Fragment>
        )
    }
}

DeleteJoke.propTypes={
    deleteJoke:PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    jokeId: PropTypes.string.isRequired
}
export default connect(null,{deleteJoke})(withStyles(styles)(DeleteJoke))
