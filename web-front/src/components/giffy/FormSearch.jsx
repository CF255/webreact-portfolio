import React, { useState } from "react";
import {useLocation} from "wouter"

export default function Form () {

    const [keyword, setKeyword] = useState('')
    const [path, pushLocation] = useLocation()
    
    const handleSumit =  evt =>{        
        evt.preventDefault()
        pushLocation(`/search/${keyword}`)
    }



    const handleChange = evt =>{
        setKeyword(evt.target.value)
    
    }

    return(
        <>
       

<form className="buscador" onSubmit={handleSumit}>
                <input onChange={handleChange} type="text" value={keyword}></input>
                <button type="submit">Buscar</button>
            </form></>
    )
}