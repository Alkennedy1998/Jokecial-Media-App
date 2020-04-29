import React, { Component,Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import {connect} from 'react-redux'
import {editUserDetails} from '../redux/actions/userActions'
const styles=(theme)=>({
    ...theme
})

class EditDetails extends Component {

    state={
        bio:'',
        website:'',
        location:'',
        open:false
    }

    componentDidMount(){
        const {credentials} = this.props
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''

        })
    }

        return (
            <div>
                
            </div>
        )
    }
}

EditDetails.propTypes ={
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state)=>{
    credentials: state.user.credentials
}
export default connect(mapStateToProps,{editUserDetails})(withStyles(styles)(EditDetails))
