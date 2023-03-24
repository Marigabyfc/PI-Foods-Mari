import style from './NavBar.module.css'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipeByName } from '../../redux/actions'
import { Link } from 'react-router-dom'
import gify from '../../images/taquito.gif'

export default function NavBar() {

const dispatch = useDispatch()

const [recipeName, setRecipeName] = useState({
  recipeValue: ''
})


const handleSearch = (e) =>{
  setRecipeName({recipeValue: e.target.value})
}

const onSearch = () =>{
  dispatch(getRecipeByName(recipeName.recipeValue))
  // console.log('este es mi dispatch' + getRecipeByName(recipeName.recipeValue)); 
}


  return (
    
    <div className={style.divNav}>
      <Link to='/'><img src={gify} alt='gify' className={style.imgNav}/></Link>
      <input className={style.inputNav} type="text" name='search' value={recipeName.recipeValue} onChange={(e)=>handleSearch(e)} placeholder='recipes..'/>
      <div>
      <button className={style.buttonNav} onClick={onSearch}>Search</button>
      </div>
    </div>
  )
}
