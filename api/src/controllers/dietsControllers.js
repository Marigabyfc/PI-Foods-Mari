const { Diets } = require('../db')
const {getRecipeByApi} = require('./recipesControllers')



//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// MAPPING API DIETS 

const getDietsByApi = async () =>{
    let allDiets = []

    const getDiets = await getRecipeByApi(); 

    const mapDiets = await getDiets?.map((e) => e.diets);

    mapDiets.forEach((e) => e.forEach((dietByDiet) => allDiets.push(dietByDiet)));

    return [...new Set(allDiets)]
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//PUTTING DIETS ON DB

const getAllDiets = async () =>{
    const apiDiets = await getDietsByApi()

    apiDiets.forEach((e) =>{
        Diets.findOrCreate({
            where: {name : e}
        })
})
    const getDiets = await Diets.findAll(
        //{
        // include: [{
        //     through: {
        //       attributes: []
        //     }
        //   }]
        // }  await recetaAgregado.setDiets(diets)
    );

    return getDiets
}

//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<




module.exports= {
    getAllDiets,
    getDietsByApi,
}