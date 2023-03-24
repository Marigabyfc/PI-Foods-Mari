import axios from 'axios'

export const GET_DIETS = 'GET_DIETS';
export const GET_RECIPE_BY_NAME = 'GET_RECIPE_BY_NAME';
export const GET_RECIPE_DETAIL = 'GET_RECIPE_DETAIL';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS';
export const ORDER = 'ORDER';
export const ORDER_DESC = 'ORDER_DESC ';
export const GET_BY_API = 'GET_BY_API';
// export const GET_BY_DB = 'GET_BY_DB'
export const HS_ASC = 'HS_ASC';
export const HS_DESC = 'HS_DESC';
export const POST_RECIPE ='POST_RECIPE'
export const RESET ='RESET'



export const getAllRecipes = () => async (dispatch) =>{
     await axios.get('http://localhost:3001/recipes')
    .then((res)=> res.data)
    .then((data)=> dispatch({type: GET_ALL_RECIPES, payload: data}))
}


export const getRecipeDetail = (id) => async(dispatch)=>{
    dispatch({type: GET_RECIPE_DETAIL, payload: []})
    await axios.get(`http://localhost:3001/recipes/${id}`)
    .then((res) => res.data)
    .then((data) => dispatch({type: GET_RECIPE_DETAIL, payload: data}))
    .catch((err) => console.log(err))
}


export const getDiets = () => async (dispatch) => {
    await axios.get('http://localhost:3001/diets')
    .then((res) => {
        let response = res.data?.map(e => e.name)
        dispatch({type: GET_DIETS, payload: response})})
    }
    
    
    export const filterByDiets = (diets) =>{
        return {
            type: FILTER_BY_DIETS,
        payload: diets
    }
}

export const getRecipeByName = (name) => (dispatch)=>{
    dispatch({type: GET_RECIPE_DETAIL, payload: []})
    axios.get('http://localhost:3001/recipes?name=' + name)
    .then((res) => res.data)
    .then((data) => dispatch({type: GET_RECIPE_BY_NAME, payload: data}))
}


export const postRecipe = (payload) =>{
    return {
        type: POST_RECIPE,
        payload: payload
    }
}

export const order = () =>{
    return {
        type: ORDER
    }
}


export const orderDesc = () =>{
    return {
        type: ORDER_DESC
    }
}

export const getByApi = () =>{
    return {
        type: GET_BY_API
    }
}

// export const getByDb = () =>{
//     return {
//         type: GET_BY_DB
//     }
// }


export const healthScoreAsc = () =>{
    return{
        type: HS_ASC,
    }
}
export const healthScoreDesc = () =>{
    return{
        type: HS_DESC,
    }
}

export const resetRecipes = () =>{
    return {
        type: RESET
    }
}

