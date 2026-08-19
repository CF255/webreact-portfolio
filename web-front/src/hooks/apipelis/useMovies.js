import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../../service/apipelis/Movies'

export function useMovies({search, sort}) {
 const [movies, setMovies] = useState([])
 const [loading, setLoading] = useState(false)
 const [ error, setError] = useState(null)
 const previusSearch =useRef({search})

    const getMovies = useCallback(async({search}) =>{
      if(search === previusSearch.current) return
     try{
      setLoading(true)
      setError(null)
      previusSearch.current = search
      const newMovies = await searchMovies({search})
      setMovies(newMovies)
     }catch{
      setError(e.messague)
     }finally{
      setLoading(false)
     }
  },[])

  
    const sortedMovies = useMemo(() => { 
      return sort
    ? [...movies].sort((a,b) => b.year.localeCompare(a.year))
    : movies 
    },[sort, movies])
    return {movies: sortedMovies, getMovies, loading}
  }
  