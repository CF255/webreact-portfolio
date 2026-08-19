import React from "react";
import ListOfGifs from "../../components/giffy/ListOfGifs";
import { useGifs } from "../../hooks/giffy/useGifs";
import TrendingSearches from "../../components/giffy/TrendingSearches";
import FormSearch from "../../components/giffy/FormSearch";



 function Home(){
    
   const {loading, gifs} = useGifs()

    
    return(
        <>
        <FormSearch/>
        
        <div className="h33">
       <h3>Random</h3>
       </div>
       
       <div className="App-wrapper">
            <div className="containergif ">
            <ListOfGifs gifs = {gifs}/>
            </div>
            </div>

            <div className="sidediv">
        <h2>Tendencia</h2>
       <TrendingSearches />
        </div> 


 


        </>
    )
}

export default Home