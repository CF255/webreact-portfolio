import { useState,useEffect , useRef} from 'react'


export function useSearch (){
    const [search, updateSearch] = useState('')
    const [error, setError] = useState(null)
    const isFirstInput = useRef(true)
  
  
    useEffect(()=>{
   
      if(isFirstInput.current){
        isFirstInput.current = search === ''
        return
      }
  
  if(search === ''){
    setError('Indique la pelicula a buscar')
    return
  }
  
  if(search.length < 3 ){
    setError('no menos de 3 caracteres')
    return
  }
  
  setError(null)
    },[search])
  
    return{search, updateSearch, error}
  }