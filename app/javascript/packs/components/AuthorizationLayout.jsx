import React, { Component } from 'react'
import { Grid, Col } from 'react-flexbox-grid'

export default class AuthorizationLayout extends Component {
    render() {
        return(
            <Grid fluid className='login-grid'>
                <Col
                    xsOffset={1} xs={10}
                    smOffset={2} sm={8}
                    mdOffset={3} md={6}
                    lgOffset={4} lg={4}
                >
                    {this.props.children}
                </Col>
            </Grid>
        )
    }
}