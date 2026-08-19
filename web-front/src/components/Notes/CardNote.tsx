import { faFileEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { useParams } from "react-router-dom";





const CardNote = (props) =>{

    const [visibleBtns, setVisibeBtns] = useState(false);

    useEffect(()=>{

        if(id === auth.getUser()?.id){
         setVisibeBtns(true)
        }
    },[])

    const auth = useAuth()
    const id = useParams().id


    return(
        <>
        <div className="cardNoteWrapper">


            <div className="cardBodyNote">
            <h2>{props.title}</h2>
            <p>{props.descripcion}</p>

            {!!visibleBtns && <div>
             <div>{props.favorite}</div> 
             </div>}
            </div>

            {!!visibleBtns && <div>  

                <div className="cardFooterNote">
                <a href="" className="btnEditarNote" title="Editar" onClick={(e) =>{
                    e.preventDefault()
                    props.onEdit()
                }}>   <FontAwesomeIcon  icon={faFileEdit}/></a>

                <a href="" className="btnEliminarNote" title="Eliminar" onClick={(e) =>{
                    e.preventDefault()
                    props.onRemove()
                }}> <FontAwesomeIcon  icon={faTrash}/></a>
            </div> 
                
                </div>}

        </div>
        </>
    )

}


export default CardNote