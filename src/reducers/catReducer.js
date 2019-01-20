import multiSelectOptionMarkup from "../utils/checkboxMarkupHelper"

const catReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCH_CATEGORIES":
            return action.payload.data.data.map(item =>
                !item.text
                  ? (item = {
                      text: item,
                      value: item, 
                      markup: multiSelectOptionMarkup(item)           
                    })
                  : (item = item)
              );          
      
        default:
            return state
    }
}

export default catReducer