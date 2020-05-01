import React, { Component,Fragment } from 'react'
import Link from 'react-router-dom/Link'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import MyButton from '../util/MyButton'
//MUI stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import PostJoke from './PostJoke'
import HomeIcon from '@material-ui/icons/Home'
import StarIcon from '@material-ui/icons/Star'
import TimerIcon from '@material-ui/icons/Timer'

import Notifications from '@material-ui/icons/Notifications'


export class Navbar extends Component {
    render() {
        const {authenticated} = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {true ?(
                        <Fragment>
                            <PostJoke/>
                            <MyButton tip="Recent">
                                <Link to='/'>
                                <TimerIcon/>
                                </Link>
                            </MyButton>
                            <MyButton tip="Top Posts">
                                <Link to='/topOfAllTime'>
                                <StarIcon/>
                                </Link>
                            </MyButton>
                            <MyButton tip="Notifications">
                                <Notifications/>
                            </MyButton>
                        </Fragment>
                    ):(
                        <Fragment>
                             <Button color="inherit" component={Link} to="/login">Login</Button>
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to ="/signup">Signup</Button>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes={
    authenticated: PropTypes.bool.isRequired
}
const mapStateToProps = (state)=>({
    autenticated: state.user.authenticated
})
export default connect(mapStateToProps)(Navbar) 