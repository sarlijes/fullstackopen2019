
const notificationAtStart = 'Hey Ya'

const notificationReducer = (state = notificationAtStart, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export default notificationReducer