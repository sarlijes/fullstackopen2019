
export const setNotification = (text) => {
    console.log(text)
    return { type: "NOTIFY", data: { text } }
}

export const emptyNotification = (text) => {
    return { type: "EMPTY" }
}

const notificationReducer = (state = "", action) => {
    // console.log("state ", state)
    console.log("action.data >>", action.data)

    switch (action.type) {
        case "EMPTY":
            return ""
        case "NOTIFY":
            return action.data.text
        default:
            return state
    }
}

export const notify = (text, timeout) => {

    setNotification(text)
    setTimeout(() => {
        emptyNotification('')
    }, timeout)
}

export default notificationReducer