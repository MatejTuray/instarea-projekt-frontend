const queryReducer = (state = {cat__in: "null"}, action) => {
    switch (action.type) {
        case "SET_QUERY_CATEGORIES":
            return Object.assign({}, state, action.payload)
        case "SET_QUERY_PRICE":
            return Object.assign({}, state, action.payload)
        case "SET_MINRATING":
            return Object.assign({}, state, action.payload)
        case "SET_ISOPEN":
            return Object.assign({}, state, action.payload)
        case "CLEAR_QUERY":
            return {}
        default:
            return state
    }
}

export default queryReducer