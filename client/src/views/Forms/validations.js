export default function validation (newRecipe){
    let regexUrl = new RegExp(
        '^(https?:\\/\\/)?' + // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
          '(\\#[-a-z\\d_]*)?$', // fragment locator
        'i'
      );
    let error = {}
    if (newRecipe.name === '') {
        error.name = 'Name is required'
    }

    if (newRecipe.healthscore === '') {
        error.healthscore = 'Healthscore is required'
    }

    if (newRecipe.summary === '') {
        error.summary = 'Summary is required'
    }

    if (newRecipe.steps === '') {
        error.steps = 'Steps is required'
    }

    if (newRecipe.image === '') {
        error.image = 'Image is required'
    }

    if(!/^[A-Za-z\s]*$/.test(newRecipe.name)){
        error.name = 'The recipe name must not have any numerical characters'
    }

    if(newRecipe.healthscore.length > 3){
        error.healthscore = "You must enter a valid healthscore"
    }

    if(!regexUrl.test(newRecipe.image)){
        error.image = 'You must provide an URL'
    }



    return  error;
}