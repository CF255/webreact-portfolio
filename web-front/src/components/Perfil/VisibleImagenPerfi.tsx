import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";


export default function  VisibleImagenPerfil () {


    const auth = useAuth()
    const id = useParams().id

    if(id === auth.getUser()?.id){
      return(
        <>
      
         <button className="boton-avatar"><FontAwesomeIcon style={{color: '#000'}} icon={faPen}/> </button>
        
        </>
      )
    }
    
     
   }