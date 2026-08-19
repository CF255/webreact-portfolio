import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNotesMedical } from "@fortawesome/free-solid-svg-icons";


const ActionButton = (props)=>{

    const auth = useAuth()
    const id = useParams().id

        if(id === auth.getUser()?.id){
      
            return(
        <div className="btnCreateNewNote">
            <h1>Mis notas</h1>
        <button title="Nueva nota" onClick={props.onClick} className="btnNewNote"> <FontAwesomeIcon  icon={faNotesMedical}/></button>
        </div>
            )
        }

        return(
            <h1 className="h1notes">Notas</h1>
        )

}


export default ActionButton