import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class MessageForm extends Component {

    render() {
        const { handleSubmit, handleKeyUp } = this.props
        return(
            <form id="message-form" onSubmit={(e) => handleSubmit(e)}>
                <TextField
                    id="message"
                    multiLine={true}
                    rows ={1}
                    rowsMax={3}
                    fullWidth={true}
                    onKeyUp={(e) => handleKeyUp(e)}
                />
                <RaisedButton type="submit">Send</RaisedButton>
            </form>
        )
    }
}
