const venuesReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_VENUES":
            return action.payload.data
        case "TOGGLE_VISIBILITY": 
        const updated = state.venues.map(item => {
            if(item.name === action.name){               
                return Object.assign({}, item, action.payload)
            }
            return item
          })
          return updated
        default:
            return state
    }
}

export default venuesReducer