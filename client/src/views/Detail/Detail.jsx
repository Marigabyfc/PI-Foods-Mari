import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { getRecipeDetail } from '../../redux/actions'
import {useParams} from 'react-router-dom'
import { Link } from 'react-router-dom'
import style from './Detail.module.css'
import { Loader } from '../view'
import takeHome from '../../images/take-me-home.gif'

export default function Detail() {

    const { id } = useParams()
    console.log('este es mi id' + id);
    const selector = useSelector(state => state.recipeDetail)
    
    const dispatch = useDispatch()
    
    useEffect(()=>{
    dispatch(getRecipeDetail(id))
    }, [dispatch, id])

  return (
    <div >
      {
        selector.hasOwnProperty("name") ? (
          <div className={style.allDetails}>
            <div className={style.detailInfo}>
              <h2>Name: </h2>
              <p>{selector.name}</p>
              <h2>Summary: </h2>
              <p class>{selector.summary}</p>
              <h2>healthscore: </h2>
              <label>{selector.healthscore}</label>
              <h2>Steps: </h2>
              <p>{selector.steps}</p>
              <h2>Diets: </h2>
              <p>{selector.diets}</p>
            </div>
              <div className={style.divImgDetails}>
                <img src={selector.image} alt={selector.name} width='300px' height='200px'/>
              </div> 
            <div className={style.divImgToHome}>
            <Link to='/home'><img src={takeHome} alt="Home button" height='200px' width='250px' /></Link>
            </div>
              </div>
        ) : (<Loader/>)
      }
    </div>
  )
}
