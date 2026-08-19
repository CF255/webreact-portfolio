import { faCamera } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useParams } from "react-router-dom"
import { useAuth } from "../../auth/AuthProvider"


export default function VisibleimgPortada(){


    
    const auth = useAuth()
    const id = useParams().id

    if(id === auth.getUser()?.id){
      return(
        <>
         <button className="boton-portada"><FontAwesomeIcon style={{color: '#fff'}} icon={faCamera}/></button>
        
        </>
      )
    }
    
}