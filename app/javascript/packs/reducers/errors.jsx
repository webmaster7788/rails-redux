import { Map, fromJS } from 'immutable'

export default function (state = Map(), action) {
    if (action.errors) {
        var errors = fromJS(action.errors).map(error => {
            return error.join(', ')
        })
        return errors
    }
    return Map()
}
