
export const setNotification = (text) => {
    return { type: "NOTIFY", data: { text } }
}

export const emptyNotification = () => {
    return { type: "EMPTY" }
}

const notificationReducer = (state = "", action) => {
    // console.log("state ", state)
    //console.log("action.data >>", action.data)

    switch (action.type) {
        case "EMPTY":
            return ""
        case "NOTIFY":
            return action.data.text
        default:
            return state
    }
}

export default notificationReducer