
const setQueryCategories = (obj) => {
    return {
        type: "SET_QUERY_CATEGORIES",
        payload: obj
    }
}
const setQueryPrice = (obj) => {
    return {
        type: "SET_QUERY_PRICE",
        payload: obj
    }
}
const setMinRating = (obj) => {
    return {
        type: "SET_MINRATING",
        payload: obj
    }
}
const setIsOpen = (obj) => {
    return {
        type: "SET_ISOPEN",
        payload: obj
    }
}
const clearQuery = () => {
    return {
        type: "CLEAR_QUERY",        
    }
}

export { setQueryCategories, setQueryPrice, setMinRating, setIsOpen, clearQuery }