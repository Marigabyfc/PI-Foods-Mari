import { GET_ALL_RECIPES, GET_DIETS, GET_RECIPE_BY_NAME, HS_ASC, HS_DESC, FILTER_BY_DIETS, GET_RECIPE_DETAIL, ORDER, ORDER_DESC, POST_RECIPE, GET_BY_API, RESET } from "./actions";
// , GET_BY_DB
const initialState = {
    recipes: [],
    diets: [],
    recipeDetail: {},
    filterRecipes: []
}

const rootReducer = (state = initialState, action) =>{
    switch(action.type){

        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,
                filterRecipes: action.payload
            }

        case GET_BY_API:
            console.log('mi filtro' + state.recipes)
            let recipeFilterData= action.payload === 'db' ? 
            state.filterRecipes.filter(e => e.createdInDb) 
            : state.filterRecipes.filter( x => !x.createdInDb)
            return{
                ...state,
                recipes: recipeFilterData
            }
            
            // const recipeFilter = action.payload === 'db' ?
            // (state.filterRecipes.filter(e => !/^[0-9]+$/.test(e.id))) :
            // state.recipes;
        // case GET_BY_DB:
        //     const recipedb = action.payload === 'db'?
        //     state.filterRecipes.map(e => ![0-9].test(e.id))
        //     : state.recipes
        //     return{
        //         ...state,
        //         recipes: recipedb
        //     }
                

        case GET_DIETS:
            return{
                ...state,
                diets: action.payload
            }

        case GET_RECIPE_BY_NAME:
            return{        
                ...state,
                recipes: action.payload
            }

        case GET_RECIPE_DETAIL:
            console.log('este es mi recipe detail' + state.recipeDetail);
            return{
                ...state,
                recipeDetail: action.payload
            }
            
        case FILTER_BY_DIETS:
            const dietsFiltered = state.filterRecipes.filter(e => e.diets.includes(action.payload))
            return {
                    ...state,
                    recipes: action.payload === 'All' ? state.filterRecipes : dietsFiltered               
        }

        case POST_RECIPE:
            return{
                ...state,
                recipes: state.recipes.concat(action.payload)
            }

        case ORDER:
            return {
                ...state,
                recipes: state.filterRecipes.sort((a, b) => a.name.localeCompare(b.name))
            };

        case ORDER_DESC:     
            return{
                ...state,
                recipes:  state.filterRecipes.sort((a, b) => b.name.localeCompare(a.name))
            }

        case HS_ASC:
          
            return{
                ...state,
                recipes:  state.filterRecipes.sort((a, b) => b.healthscore - a.healthscore)
            }
            
            case HS_DESC:
            return{
                    ...state,
                recipes:  state.filterRecipes.sort((a, b) => a.healthscore - b.healthscore)
            }
            
            case RESET:
                return{
                    ...state,
                    recipes: state.filterRecipes
                }

        default : return {...state}
    }
}

export default rootReducer
