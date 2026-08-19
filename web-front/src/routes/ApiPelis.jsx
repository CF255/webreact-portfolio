import { useEffect, useState, useCallback } from 'react'
import { Movies } from '../components/apipelis/Movies'
import { useMovies } from '../hooks/apipelis/useMovies'
import { useSearch } from '../hooks/apipelis/useSearch'
import debounce from 'debounce'
import { PortalLayout } from "../layout/PortalLayout";
import '/public/css/apipelis.css'



function App() {
  const [sort, setSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
 const {movies,loading, getMovies} = useMovies({search, sort})

const debounceGetMovies = useCallback ( 
  debounce(search =>{
  console.log('search', search)
  getMovies({search})
},300)
,[getMovies]
)

const handledSubmit = (event) =>{
  event.preventDefault()
  getMovies({search})
}

const handledSort = () =>{
  setSort(!sort)
}

const handledchanged = (event) =>{
 const newSearch = event.target.value
  updateSearch(newSearch)
  debounceGetMovies(newSearch)
}

useEffect(() =>{
console.log('new movie')
},[getMovies])

  return (
   <PortalLayout>

<div className='pageapipelis'>
<div className="h1apipelis">
<h1>Movies</h1>
</div>
<div className='headerapipelis'>

    <form action="" className='formapipelis' onSubmit={handledSubmit}>
      
      <div>
      <input className='inputapipelis' onChange={handledchanged} value={search} name="search"  placeholder='Pelicula'></input>
      <button className='btnapipelis' type='submit'>Buscar</button>
      
      </div>
      
      <div className='checkboxapipelis'>
      <span>Ordenar por año</span>
      <input  type='checkbox' onChange={handledSort} checked={sort}></input>
      </div>
      
        </form>
      
  </div>
 
 <div className="mensajeapipelis">
 {error && <p style={{color:'red'}}>{error}</p>}
 </div>

  <main className='mainapipelis'>
    {
      loading ? <p>Cargando...</p> 
      :<Movies movies={movies}/>
    }
   
  </main>
</div>
   </PortalLayout>
  )
}

export default App
