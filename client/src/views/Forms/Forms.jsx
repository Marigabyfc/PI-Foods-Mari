import React, { useEffect, useState } from 'react'
import { getDiets } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import validations from './validations'
import { Link } from 'react-router-dom'
import axios from 'axios'
import style from './Forms.module.css'
import gify from '../../images/osito.carta.gif'
import takeHome from '../../images/take-me-home.gif'
import { Loader } from '../view'

export default function Forms() {

    const diets = useSelector(state => state.diets)

    const dispatch = useDispatch()

    useEffect(()=>{
      dispatch(getDiets())
    }, [dispatch])

    
    const [newRecipe, setNewRecipe] = useState({
      name: '',
      summary: '',
      healthscore: '',
      steps: '',
      image: '',
      diets: []
    })
    
    const [error, setError] = useState({
      name: '',
      summary: '',
      healthscore: '',
      steps: '',
      image: ''
    })

    // const [checked, setChecked] = useState([])

    const handleChange = (e)=>{
      setNewRecipe({
        ...newRecipe,
            [e.target.name] : e.target.value,
            // diets : [...checked, e.target.value]
          })
          console.log(newRecipe);
        setError(validations({
            ...newRecipe,
            [e.target.name] : e.target.value
          }))

      //  if(e.target.checked && e.target.name === 'diets'){
      //       setChecked([...checked, e.target.value])
      //       console.log(checked);
      //     }
      }

      const handleChecked = (e) =>{
        if (e.target.checked){
          setNewRecipe({
            ...newRecipe,
            diets : [...newRecipe.diets, e.target.value]
          })}
        else{
          setNewRecipe({
            ...newRecipe,
            diets: newRecipe.diets.filter(x => x !== e.target.value)
      })
    }
  }     
            const handleSubmit = (e) =>{
      e.preventDefault()
      axios.post('http://localhost:3001/recipes', newRecipe)
      .then(res => alert('Recipe created succesfully!'))
      .catch(err => alert("Oh!  We're having some trouble creating your recipe, please try again"))
      setNewRecipe({
        name: '',
        summary: '',
        healthscore: '',
        steps: '',
        image: '',
        diets: []
      })
    }
    
    //FALTAN LAS VALIDACIONES
    //ME FALTAN LOS CONDICIONALES PARA QUE NO SE MUESTRE TODO EN EL ESTADO AUNQUE LO DESELECCIONE
    //FALTA DETAILS


  return (
    <div className={style.box1}>
    <div className={style.divForms}>

        <div className={style.divAllInputForms}>


        <div className={style.divInputForms}>
      <label htmlFor="name">Name: </label>
      <input className={style.labelInputForms} value={newRecipe.name} type="text" name='name' onChange={handleChange} /> 
      {error.name && <span className={style.spanInputError}>{error.name}</span>}
        </div>

        <div className={style.divInputForms}>
      <label className={style.labelForms} htmlFor="summary">Summary: </label>
      <input className={style.labelInputForms} value={newRecipe.summary} type="text" name='summary' onChange={handleChange}/>
      {error.summary && <span className={style.spanInputError}>{error.summary}</span>}
        </div>

        <div className={style.divInputForms}>
      <label className={style.labelForms} htmlFor="healthscore">Healthscore: </label>
      <input className={style.labelInputForms} value={newRecipe.healthscore} type="number" name='healthscore' onChange={handleChange}/>
       {error.healthscore && <span className={style.spanInputError}>{error.healthscore}</span>}
        </div>

        <div className={style.divInputForms}>
      <label className={style.labelForms} htmlFor="steps">Steps: </label>
      <input className={style.labelInputForms} value={newRecipe.steps} type="text" name='steps' onChange={handleChange}/>
      {error.steps && <span className={style.spanInputError}>{error.steps}</span>}
        </div>

        <div className={style.divInputForms}>
      <label className={style.labelForms} htmlFor="image">Image: </label>
      <input className={style.labelInputForms} value={newRecipe.image} type="text" name='image' onChange={handleChange}/>
      {error.image && <span className={style.spanInputError}>{error.image}</span>}
        </div>

        </div>

            <h2 className={style.h2Forms}>Choose your diets..</h2>
        <div className={style.divmappingAndOthersForms}>
          <div className={style.divMappingDietsForms}>
              {
                diets.length >= 1 ?
                diets?.map((elem, index) =>
                (
                  <label htmlFor= 'diets' key={index}>
                      <input type= 'checkbox' name= 'diets' value={elem} key= {index} onChange={handleChecked} />
                      {elem}
                    </label>
                  ))
                  : (<Loader/>)
              }
              {error.diets && <span>{error.diets}</span>}
          </div>
         <div className={style.divButtonAndImgForms}>
            <img src={gify} alt="gify osito" height= '150px'/>

            {
              newRecipe.name !== '' && newRecipe.summary !== '' && newRecipe.healthscore !== '' && newRecipe.image !== '' && newRecipe.image !== '' && newRecipe.diets.length >= 1
              ? <button className={style.buttonSubmitForm} type='submit' onClick={(e) => handleSubmit(e)}>Submit</button> 
              :<button disabled className={style.buttonSubmitForm}>Submit</button> 
            }
         </div>
        </div>

</div>
          <div className={style.divImgFormsToHome}> 
           <Link to='/home'><img src={takeHome} alt="Home button" height='200px' width='250px' /></Link> 
          </div>
  </div>)
}
