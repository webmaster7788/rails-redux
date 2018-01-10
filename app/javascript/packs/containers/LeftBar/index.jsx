import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getCurrentUser } from '../../actions/users'
import { setDrawer } from '../../actions/pages'
import { logOut } from '../../actions/auth'
import { isMobile, goToPage } from '../../helpers/application_helper'
import Drawer from 'material-ui/Drawer'
import Avatar from 'material-ui/Avatar'
import MenuItem from 'material-ui/MenuItem'

export class LeftBar extends Component {

    componentDidMount() {
        this.props.getCurrentUser()
    }
    render() {
        const { user, setDrawer, logOut, goToPage, drawer } = this.props
        return(
            <Drawer
                className = 'left-bar'
                docked={!isMobile()}
                width={200}
                open={drawer}
                swipeAreaWidth={100}
                onRequestChange={(open) => setDrawer(open)}
            >
                <MenuItem
                    className="current-user"
                    onTouchTap={(e) => goToPage('users/' + user.get('id'))}
                >
                    <Avatar size={80} src={user.get('avatar')} />
                    <h4>{user.get('name')}</h4>
                </MenuItem>

                <MenuItem
                    onTouchTap={(e) => goToPage('/')}>

                    News
                </MenuItem>

                <MenuItem onTouchTap={(e) => goToPage('users/')}>
                    Users
                </MenuItem>

                <MenuItem onTouchTap={(e) => goToPage('chatrooms/')}>
                    Chatrooms
                </MenuItem>

                <MenuItem onTouchTap={(e) => logOut(e)}>
                    Exit
                </MenuItem>
                <p className="version-info ">{isMobile()? "It`s mobile version":"It`s pc version"}</p>
            </Drawer>
        )
    }
}

const mapStateToProps = state => ({
    user: state.currentUser,
    drawer: state.pages.get('drawer')
})

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(getCurrentUser()),
    logOut: () => dispatch(logOut()),
    setDrawer: (value) => dispatch(setDrawer(value)),
    goToPage: (url) => dispatch(goToPage(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(LeftBar)
