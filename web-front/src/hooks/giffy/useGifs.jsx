import { useContext, useEffect, useState } from "react"
import getGifs from "../../service/giffy/getGifs"
import GifsContext from '../../context/giffy/GifsContext'

const INITIAL_PAGE = 0

export function useGifs ({keyword} = {keyword: null}){

const [loading, setLoading] = useState(false)
const [page, setPage] = useState(INITIAL_PAGE)
const {gifs, setGifs} = useContext(GifsContext)

   
const keywordToUse = keyword || localStorage.getItem
('lastKeyword') || 'gato'

useEffect(function () {


  getGifs({ keyword: keywordToUse })
  .then(gifs => {
    setGifs(gifs)
    setLoading(false)
    localStorage.setItem('lastKeyword', keyword)
  })
}, [keyword, keywordToUse, setGifs])


  useEffect(function(){

    if(page === INITIAL_PAGE)return

    getGifs({keyword:keywordToUse, page})
    .then (nextGifs =>{
      setGifs(prevGifs => prevGifs.concat(nextGifs))
    })
  },[keywordToUse,page])

return{loading, gifs, setPage}
}