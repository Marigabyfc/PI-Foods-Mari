const { getRecipeById, getAllRecipes } = require('../controllers/recipesControllers')
const {Recipe, Diets} = require('../db.js')

// VALIDATING AND RETURNING DATA
const getAllRecipeHandler = async (req, res) => {
    try {
        const allRecipes = await getAllRecipes()
        if(req.query.hasOwnProperty("name")){
            const { name } = req.query 
             const filteredName = allRecipes.filter((e) => 
             e.name.toLowerCase().includes(name.toLowerCase()))

             filteredName.length > 0

             ?res.status(200).json(filteredName)

             :res.status(404).send("couldn't find the recipe you're searching for")

         }else{
            res.status(200).json(allRecipes)
         }
        } catch (err) {        
            res.status(400).json({message : err})      
    }
};

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//SEND INFO BY ID

const getRecipeByIdHandler = async (req, res)=>{
    const {id} = req.params
        try{
            const getId = await getRecipeById(id)
            res.status(200).json(getId)
        }catch(err){
            res.status(400).json({message: err})
        }};

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//POSTING DATA

const postRecipeHandler = async (req, res) => {

const { 
    name,
    summary,
    healthscore,
    image,
    steps, diets } = req.body;
    try {
        const post = await Recipe.create({
            name,
            summary,
            healthscore,
            image,
            steps
        });

//ASOCIATTING DATA
    diets?.map(async (e) => {
        let dietDb = await Diets.findOne({where: {name: e}})
        await post.addDiets(dietDb)
}) 
            res.status(201).json(post)
        } catch (err) {
            res.status(400).json({message: err})
        } 
    }


module.exports = {
    getAllRecipeHandler,
    getRecipeByIdHandler,
    postRecipeHandler
}

