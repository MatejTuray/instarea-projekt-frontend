import { combineReducers } from "redux"
import catReducer from "./catReducer";
import queryReducer from "./queryReducer";
import venuesReducer from "./venueReducer";

const rootReducer = combineReducers({
    categories: catReducer,
    query: queryReducer,
    venues: venuesReducer,
 
    
})

export default rootReducer