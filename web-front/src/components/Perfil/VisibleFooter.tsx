import { useParams } from "react-router-dom"
import { useAuth } from "../../auth/AuthProvider"
import { ModalMessage } from "../ModalMessages/Modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWarning } from "@fortawesome/free-solid-svg-icons"
import { API_URL } from "../../auth/constants"


export default function VisibleFooter  () {

    const auth = useAuth()
    const id = useParams().id

    

    async function handleEliminarCuenta (){

        try {
          const response = await fetch(`${API_URL}/perfil/delete/${auth.getUser()?.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "aplication/json",
              Authorization: `Bearer ${auth.getAccessToken()}`,
          }
          });
  
          if(response.ok){
            auth.signout()
        }
           
        } catch (error) {
          
          console.log(error);
        }
  
      }
  
  

  if(id === auth.getUser()?.id){

    return(
      <div className="perfil-usuario-footer">
             

      {/* Modal Eliminar Cuenta */}
     <ModalMessage
     btnAbrirModal = "Eliminar Cuenta"
     btnAbrirModalCss='btnEliminarModal'
     >
 <div className="modalTitulo">
   <h3><FontAwesomeIcon style={{color: "b56c0d"}} icon={faWarning}/> Advertencia</h3>
 </div>
 <div className="modalContenido">
   <span>Este paso es definitivo. Todos tus datos, enlaces, publicaciones, etc serán borrados y no podrán ser restaurados. Tampoco tendrás acceso a dicha cuenta nuevamente.
   </span>
 </div>
  <div className="btnFinalModal">
     <button  onClick={handleEliminarCuenta}  className="btnEliminarModal">Aceptar</button>
 </div>  
   </ModalMessage>
     {/* Fin Modal Eliminar Cuenta */}

     </div>
    )
   
  }
}
