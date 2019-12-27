export const setFilter = (value) => {
    return { type: "FILTER", data: { value } }
}

export const emptyFilter = () => {
    return { type: "EMPTY" }
}

const filterReducer = (state = "", action) => {
    // console.log("state ", state)
    // console.log("action.data -->>", action.data)

    switch (action.type) {
        case "EMPTY":
            return ""
        case "FILTER":
            return action.data.value
        default:
            return state
    }
}

export default filterReducer