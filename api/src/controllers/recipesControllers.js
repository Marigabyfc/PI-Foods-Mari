require('dotenv').config();
const axios = require('axios');
const {Recipe, Diets} = require('../db.js')
const {API_KEY} = process.env;

const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`

const mock = 'https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5'

// const url2 = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}&addRecipeInformation=true`


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// FIND BY ID 

const getRecipeById = async (id) => {
    const source = isNaN(id) ? "db" : "api"
    if (source === "api"){
       const data = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
        .then(response => response.data)
        .then(data => {
           let received = {
               id : data.id,
               name : data.title,
               image : data.image,
               summary : data.summary.replace( /(<([^>]+)>)/ig, ''),
               healthscore : data.healthScore,
               steps : data.instructions.replace( /(<([^>]+)>)/ig, ''),
               vegetarian : data.vegetarian,
               vegan: data.vegan,
               glutenFree: data.glutenFree,
               diets : data.diets
           }
           return received
        })
        return data
    }
    return await Recipe.findByPk(id)
}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// GET INFO API

const getRecipeByApi = async () => {
        const apiUrl= await axios.get(mock)
        // console.log('entro', JSON.stringify(await apiUrl.data))       
        const apiInfo = await apiUrl.data.results?.map((data) =>{
            return{
                id : data.id,
               name : data.title,
               image : data.image,
               summary : data.summary,
               healthscore : data.healthScore,
               steps : data.instructions,
               vegetarian : data.vegetarian,
               vegan: data.vegan,
               glutenFree: data.glutenFree,
               diets : data.diets
            }
        })
        
        return apiInfo;
}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//GET INFO IN DB

const getRecipeByDb = async () =>{
    const recipe = await Recipe.findAll(
        {
            include: { 
                model: Diets,
                attributes: ['name']
             }
          }
        )
       const recipeDb = recipe.map((e) => {
            return {
                name : e.name,
                image : e.image,
                summary : e.summary,
                healthscore : e.healthscore,
                steps: e.steps,
                diets: e.Diets.map(x => x.name)
            }
        })
        return recipeDb
    }


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// VALIDATE INFO DB

// const getNameByDb = async (name) =>{
//     const dbName = await Recipe.findAll({
//         where :{
//             [Op.iLike]: `%${name}%`
//         }
//     })
//     return await dbName
// }


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// MIXING BOTH INFO

    
const getAllRecipes = async() => {
    const getByApi = await getRecipeByApi();
    const getByDb = await getRecipeByDb();
    const receivedAll = getByDb.concat(getByApi)
    return receivedAll
}


//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<



module.exports = {
    getRecipeById,
    getRecipeByApi,
    getRecipeByDb,
    getAllRecipes,
    // postRecipe
}
