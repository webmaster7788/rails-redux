import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isMobile } from '../../helpers/application_helper'
import { setDrawer } from '../../actions/pages'
import AppBar from 'material-ui/AppBar'

export class NavBar extends Component {
    render() {
        const { setDrawer } = this.props
        if (isMobile()) {
            return (
                <AppBar
                    className="app-bar"
                    onLeftIconButtonTouchTap={() => setDrawer(true)}
                />
            )
        } else {
            return null
        }
    }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
    setDrawer: (value) => dispatch(setDrawer(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
