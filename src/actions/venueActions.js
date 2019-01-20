import axios from "axios"
const reject = (obj, keys) => {
    return Object.keys(obj)
      .filter(k => !keys.includes(k))
      .map(k => Object.assign({}, { [k]: obj[k] }))
      .reduce((res, o) => Object.assign(res, o), {});
  };
const fetchVenues = (query) => {
    
    if (query.cat__in === "null"){
        query = reject(query, ["cat__in"]) 
    }

    let url = axios.get("https://instarea-projekt-backend.herokuapp.com/api/venues/search", {
        params: query
    })
    console.log(url)
    return {
        type: "FETCH_VENUES",
        payload: url
    }
}
const toggleVisibility = (venue, status) => {
    return {
        type: "TOGGLE_VISIBILITY",       
        name: venue,
        payload: status
    }
}

export {fetchVenues, toggleVisibility}