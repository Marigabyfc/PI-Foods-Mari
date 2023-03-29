import  style from './Home.module.css'
import React, { useEffect, useState } from 'react'
import { Card, Loader } from '../view'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from '../Pagination/Pagination'
import { filterByDiets, getAllRecipes, getDiets, healthScoreAsc, order, orderDesc, healthScoreDesc, getByApi, resetRecipes} from '../../redux/actions'
import NavBar from '../../components/NavBar/NavBar'


export default function Home() {

  const dispatch = useDispatch()


   const allRecipes = useSelector((state)=>state.recipes)

   const diets = useSelector((state) => state.diets)

   const [/* ordered */, setOrdered] = useState('')


    const [currentPage, setCurrentPage] = useState(1)
    const [elementsPerPage, /* setElementsPerPage */] = useState(9)

  
    const indexOfLastElement = currentPage * elementsPerPage
    const indexOfFirstElement = indexOfLastElement - elementsPerPage
    const currentElements = allRecipes.slice(indexOfFirstElement, indexOfLastElement)

    const paginationButtonNext = (e) => {
      e.preventDefault();
      setCurrentPage(currentPage + 1);
  };

    const paginationButtonPrev = (e) => {
      e.preventDefault();
      setCurrentPage(currentPage - 1);
  };
 
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber)
      }
     
    useEffect(()=>{
        dispatch(getAllRecipes())
        dispatch(getDiets())
      },[dispatch])
      
      const handleDiets = (e) =>{
        e.preventDefault()
        dispatch(filterByDiets(e.target.value))
        setOrdered(`order ${e.target.value}`)
      }

      const handleSort = (e) =>{
        e.preventDefault()
        e.target.value === 'Asc'
        ? dispatch(order(e.target.value))
        : dispatch(orderDesc(e.target.value))
        setOrdered(`order ${e.target.value}`)
      }
      
        
      const handleHs = (e)=>{
        console.log('entre al handlehs');
        e.preventDefault()
        e.target.value === 'hsasc'
        ? dispatch(healthScoreAsc(e.target.value))
        : dispatch(healthScoreDesc(e.target.value))
        setOrdered(`order ${e.target.value}`)
        console.log(healthScoreAsc());
      }

      const handleGetBy = (e) =>{
        e.preventDefault()
        dispatch(getByApi(e.target.value))
        setOrdered(`order ${e.target.value}`)
      }

      const handleReset = (e) =>{
        e.preventDefault()
        dispatch(resetRecipes())
        setOrdered(`order ${e.target.value}`)
      }

  return (
    <div className={style.divHome}>
        <NavBar/>
    <div className={style.divButtonForm}>
        <Link to='/form'><button className={style.buttonHomeForm}>Form</button></Link>
    </div>

    <div className={style.allButtonsHome}>

      <div className={style.divOrderHome}>
        <button className={style.buttonOrderHome} value='Asc' onClick={(e)=>handleSort(e)}>A-Z</button>
        <button className={style.buttonOrderHome} value='Desc' onClick={(e)=>handleSort(e)}>Z-A</button>
      </div>
      
      <div className={style.divSortHome}>
        <button className={style.buttonSortHome} value='hsasc' onClick={(e)=>handleHs(e)}>Healthier</button>
        <button className={style.buttonSortHome} value='hsdesc' onClick={(e)=>handleHs(e)}>Less Healthy</button>
      </div>

      <div className={style.divFilterHome}>
        <button className={style.buttonFilterHome} value='api' onClick={(e)=>handleGetBy(e)}>API</button>
        <button className={style.buttonFilterHome} value='db' onClick={(e)=>handleGetBy(e)}>BD</button>
      </div>
      
    </div>
    

      <div className={style.divSelectHome}>
      <select onChange={(e)=>handleDiets(e)} className={style.buttonSortHome}>
        <option value="All">All Recipes</option>
        {
          diets?.map((e, index) =>
          (
            <option value={e} key={index}>{e}</option>
          )
          )
        }
        </select>
        <button className={style.buttonOrderHome} value='reset' onClick ={(e)=> handleReset(e)}>Reset</button>
      </div>
      <div className={style.boxPagination}>
                  <div>
                    {
                        currentPage === 1 ? ( <span></span> ) : ( <button className={style.divPrevButton} onClick={e => paginationButtonPrev(e)} >prev</button> )
                    }
                  </div>
                  
                  <div>
                    <Pagination 
                        currentPage={currentPage}
                        elementsPerPage={elementsPerPage}
                        totalElements={allRecipes.length}
                        onPageChange={handlePageChange}
                    />
                  </div>
                   <div >
                        {
                            Math.ceil(allRecipes.length /elementsPerPage) > currentPage ? ( <button className={style.divPrevButton} onClick={e => paginationButtonNext(e)} >next</button> ) : ( <span></span> )
                        }
                    </div>
      </div>
       <div className={style.cards}>
       {
    currentElements?.length >= 1 ?
     allRecipes.length === 0 ?
     (<h1>Recipe not found</h1>)

     : (currentElements.map((e, index )=> 
        (
          <Card 
          key={index}
          id = {e.id}
          name= {e.name}
          image={e.image}
          diets={e.diets}
          healthscore={e.healthscore}
          />
        )) ) : (
          <Loader/>
        )  
      }
      </div>
    </div> 
  )
}
