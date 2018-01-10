import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser, updateUser } from '../../actions/users'
import { Col } from 'react-flexbox-grid'
import Dropzone from 'react-dropzone'

export class User extends Component {

    componentDidMount() {
        const { params, getUser } = this.props
        getUser(params.id)
    }

    componentWillReceiveProps(nextProps) {
        const { params, getUser } = this.props
        const { id } = nextProps.params
        if (params.id != id) {
            getUser(id)
        }
    }

    render() {

        const { user, currentUser, updateUser } = this.props
        return(
            <Col
                className="user-profile"
                xs={12}
                smOffset={1} sm={10}
                mdOffset={1} md={8}
                lgOffset={2} lg={6}
            >
                { (user.get('id')== currentUser.get('id'))?
                    <form id='edit-form'>
                        <Dropzone id="avatar-dropzone" name="user[avatar]" onDrop={() => updateUser()}>
                            <div>
                                Upload your photo
                            </div>
                            <img className="avatar" src={user.get('avatar')}/>
                        </Dropzone>
                        <p>Click on image to change avatar</p>
                    </form>
                    :
                    <img className="avatar" src={user.get('avatar')}/>
                }
                <h3>{user.get('name')}</h3>
            </Col>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user,
    currentUser: state.currentUser
})

const mapDispatchToProps = dispatch => ({
    getUser: id => dispatch(getUser(id)),
    updateUser: () => {
        const user = new FormData(document.getElementById('edit-form'))
        dispatch(updateUser(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(User)
