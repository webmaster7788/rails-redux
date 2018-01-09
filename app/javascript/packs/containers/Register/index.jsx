import React, { Component } from 'react'
import { connect } from 'react-redux'
import { register } from '../../actions/users'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { Row } from 'react-flexbox-grid'

export class Register extends Component {

    render() {
        const { onSubmitRegister, errors, user } = this.props
        return (
            <div>
                <h1>Registration</h1>
                <form id='register-form' onSubmit={(e) => onSubmitRegister(e)}>
                    <Row>
                        <TextField
                            name='user[name]'
                            floatingLabelText='Name'
                            errorText={errors.get('name')}
                        />
                    </Row>
                    <Row>
                        <TextField
                            name='user[email]'
                            floatingLabelText='Email'
                            errorText={errors.get('email')}
                        />
                    </Row>
                    <Row>
                        <TextField
                            type='password'
                            name='user[password]'
                            floatingLabelText='Password'
                            errorText={errors.get('password')}
                        />
                    </Row>
                    <Row>
                        <TextField
                            type='password'
                            name='user[password_confirmation]'
                            floatingLabelText='Password confirmation'
                            errorText={errors.get('password_confirmation')}
                        />
                    </Row>
                    <Row>
                        <RaisedButton
                            className="submit-button"
                            type="submit"
                            disabled={user.get('isFetching')}
                            label="Sign up"
                        />
                    </Row>
                </form>
                <Row>
                    <p><Link to='/login'>Login</Link></p>
                </Row>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errors: state.errors,
    user: state.currentUser
})

const mapDispatchToProps = dispatch =>  ({
    onSubmitRegister: (e) => {
        e.preventDefault()
        const user = new FormData(document.getElementById('register-form'))
        dispatch(register(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)

