import React, { Component } from 'react'
import { Grid, Col } from 'react-flexbox-grid'
import { isMobile } from '../helpers/application_helper'

export default class Children extends Component {

    render() {
        const { children } = this.props
        if (isMobile()) {
            return (
                <Grid fluid className="root">
                    {children}
                </Grid>)
        } else {
            return(
                <Grid className="root">
                    <Col
                        xsOffset={4} xs={8}
                        smOffset={3} sm={9}
                        mdOffset={3} md={9}
                        lgOffset={2} lg={10}
                    >
                        {children}
                    </Col>
                </Grid>)
        }
    }
}
