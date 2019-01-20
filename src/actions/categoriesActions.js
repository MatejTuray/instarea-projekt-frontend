import axios from "axios"

const fetchCategories = () => {
    return {
        type: "FETCH_CATEGORIES",
        payload: axios.get("https://instarea-projekt-backend.herokuapp.com/api/categories")
    }
}


export default fetchCategories