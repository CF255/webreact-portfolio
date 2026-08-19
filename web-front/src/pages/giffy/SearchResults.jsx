import React, {useCallback,useEffect, useRef} from 'react'
import ListOfGifs from '../../components/giffy/ListOfGifs'
import { useGifs } from '../../hooks/giffy/useGifs'
import TrendingSearches from "../../components/giffy/TrendingSearches";
import FormSearch from "../../components/giffy/FormSearch";
import useNearScreen from '../../hooks/giffy/useNearScreen';
import debounce from 'debounce';

export default function SearchResults({params}){
  
    const {keyword} = params 
    const {loading, gifs, setPage} = useGifs({keyword})
    const externalReft = useRef()
    const {isNearScreen} = useNearScreen({externalReft: loading ? null : externalReft,
   
   once:false
    })

const debounceHandleNextPage = useCallback(debounce(
  () => setPage(prevPage => prevPage + 1), 200
),[])



useEffect(function(){
  console.log(isNearScreen)
  if(isNearScreen) debounceHandleNextPage()
},[debounceHandleNextPage, isNearScreen])

  return <>

<FormSearch/>

<div className="h33">
 <h3>{keyword}</h3>
       </div>

  <div className="containergif">
   
            <ListOfGifs gifs = {gifs}/>
            <div id = 'visor' ref={externalReft}></div>
            </div>



<div className="sidediv">
        <h2>Tendencia</h2>
       <TrendingSearches />
        </div> 
  </>
} 