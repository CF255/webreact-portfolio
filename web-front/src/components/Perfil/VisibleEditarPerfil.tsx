import { useState } from "react";
import { useAuth } from "../../auth/AuthProvider";
import { ModalMessage } from "../ModalMessages/Modal";
import { API_URL } from "../../auth/constants";


export default function VisibleEditarPerfil (){

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorResponse] = useState("");
    const [missResponse, setMissResponse] = useState("");

    const auth = useAuth()

    
    async function handleGuardar() {
     
        console.log(name, username, password );
  
        if (!username || !password || !name) {
          setMissResponse('Complete todos los campos');
  
          setTimeout(() => {
            setMissResponse('')
            }, 2000);
  
  
          console.log('vacio')
        }else{
  
          try {
            const response = await fetch(`${API_URL}/perfil/${auth.getUser()?.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getAccessToken()}`,
               },
               body: JSON.stringify({ name, username, password })
            });

              if(response.ok){
                
                console.log('si')
              } else {
                auth.signout()
                console.log('response')
       
              }
  
          } catch (error) {
            console.log(error);
          }
  
        }
      
    
  
      }
  

    return(
        <>
         <ModalMessage
                  btnAbrirModal="Editar Perfil"
                  btnAbrirModalCss="btn-acciones-usuario"
                  >
                      <div className="modalTitulo">
              <h3> Editar perfil</h3>
            </div>
            <div className="modalContenidoEditarUsuario">

            <div className="modalmessage">
    {!!errorResponse && <div className="errormessage">{errorResponse}</div>}
    {!!missResponse && <div className="missmessage">{missResponse}</div>}
    </div> 

              <label >Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
              <label >Username</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
              <label >Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              

            </div>
            <div className="btnFinalModal">
                <button  onClick={handleGuardar}  className="btnGuardarModal">Guardar</button>
            </div> 

                  </ModalMessage>
        </>
    )
}