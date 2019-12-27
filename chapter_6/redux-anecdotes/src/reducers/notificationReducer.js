export const setNotification = (text, timeout) => {
    return async dispatch => {
        dispatch({
            type: 'NOTIFY',
            data: text
        })

        setTimeout(() => {
            dispatch({ type: 'EMPTY' })
        }, timeout * 1000)
    }
}

const notificationReducer = (state = "", action) => {
    switch (action.type) {
        case "EMPTY":
            return ""
        case "NOTIFY":
            return action.data
        default:
            return state
    }
}

export default notificationReducer
