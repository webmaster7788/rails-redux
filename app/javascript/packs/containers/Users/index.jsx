import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUsersList, setUsersFilter } from '../../actions/users'
import { goToPage } from '../../helpers/application_helper'
import UsersList from '../../components/UsersList'
import TextField from 'material-ui/TextField'

export class Users extends Component {

    showVisibleUsers() {
        const filter = this.props.usersList.get('filter')
        const users = this.props.usersList.get('users')
        if(filter)
            return users.filter(user => user.get('name').includes(filter))
        return users
    }

    render() {
        const { usersList, getUsersList, pages, goToPage, setUsersFilter } = this.props
        return(
            <div>
                <TextField
                    id='users-filter'
                    floatingLabelText='Search'
                    onKeyUp={(e) => setUsersFilter(e)}
                />
                <UsersList
                    users={this.showVisibleUsers()}
                    isFetching={usersList.get('isFetching')}
                    goToPage={goToPage}
                    getUsersList={getUsersList}
                    listEnd={pages.get('usersListEnd')}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    usersList: state.usersList,
    pages: state.pages
})

const mapDispatchToProps = dispatch => ({
    getUsersList: page => {
        const filter = document.getElementById('users-filter').value
        dispatch(getUsersList(page, filter))
    },
    goToPage: url => dispatch(goToPage(url)),
    setUsersFilter: e => {
        const filter = document.getElementById('users-filter').value
        dispatch(setUsersFilter(filter))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Users)
