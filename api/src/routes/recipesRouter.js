const { Router } = require('express');
const recipesRouter = Router();
const {getAllRecipeHandler, getRecipeByIdHandler, postRecipeHandler} = require('../handlers/recipesHandler')

//ALL INFO ROUTER
recipesRouter.get('/', getAllRecipeHandler)

// INFO BY ID ROUTER
recipesRouter.get( '/:id',  getRecipeByIdHandler)

//POST INFO ROUTER
recipesRouter.post('/', postRecipeHandler)



module.exports= recipesRouter;

