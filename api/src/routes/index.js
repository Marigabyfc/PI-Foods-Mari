const { Router } = require('express');
require('dotenv').config();
const {API_KEY} = process.env;
const axios = require('axios')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();
const recipesRouter = require('./recipesRouter')
const dietsRouter = require('./dietsRouter')

//REDIRECTING DATA
router.use('/recipes', recipesRouter);

router.use('/diets', dietsRouter);


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
