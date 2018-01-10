import React, { Component } from 'react'
import Children from './Children'
import LeftBar from '../containers/LeftBar'
import NavBar from '../containers/NavBar'

export default class ApplicationLayout extends Component {

    render() {
        return(
            <div>
                <LeftBar />
                <NavBar />
                <Children children={this.props.children} />
            </div>
        )
    }
}
