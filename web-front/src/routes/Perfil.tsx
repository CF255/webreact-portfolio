import { PortalLayout } from "../layout/PortalLayout";
import "../../public/css/perfil.css"
import "../../public/css/login-signup.css"
import NamePerfils from "../components/Perfil/NamePerfils";
import { useUsers } from "../hooks/FetchUsers/useUser";
import { UserList } from "../components/Perfil/UserList";
import ImagePerfils from "../components/Perfil/ImagePerfil";
import VisibleFooter from "../components/Perfil/VisibleFooter";
import VisibleEditarPerfil from "../components/Perfil/VisibleEditarPerfil";
import VisibleImagenPerfil from "../components/Perfil/VisibleImagenPerfi";
import VisibleimgPortada from "../components/Perfil/VisibleimgPortada";
import { Link, useParams } from "react-router-dom";
import DescriptionIndi from "../components/Perfil/DescriptionIndi";


export default function Perfil(){
    
   const {users} = useUsers() 

   const id = useParams().id
  const user = users.find(a => a.id === String(id))


    return(

      <PortalLayout>

        <section className="seccion-perfil-usuario">
            <div className="perfil-usuario-header">
                <div className="perfil-usuario-portada">
                <div className="perfil-usuario-avatar">
                     <ImagePerfils users={users}/>
                    
                    <VisibleImagenPerfil/>
                </div>
                  <VisibleimgPortada/>
                </div>
            </div>

            <div className="perfil-usuario-body">
                <div className="perfil-usuario-bio">
                
                   <NamePerfils users={users}/>
                     <DescriptionIndi/>

                    <div className="perfil-usuario-acciones">
                    
                  <button className="btn-acciones-usuario">accion1</button>
                  <button className="btn-acciones-usuario">accion2</button>
                  <button className="btn-acciones-usuario">
                  <Link className="btn-acciones-usuario" style={{ textDecoration: "none"}} to={`/perfil/notes/${user?.id}`}>Notas</Link>

                  </button>
 
                  {/* modal editar perfil */}
                 <VisibleEditarPerfil/>
                  {/* modal editar perfil */}

                </div>
                   
                </div>

                <div className="perfil-usuario-amigos">
                  <div className="div-acciones-amigos">
                  <h2>Amigos</h2>
                 <a className="btnmostrartodo" href="#">Mostrar todo</a>
                  </div>
               
                 <UserList users={users}/>
                 
                </div>
                
               
                <VisibleFooter/> 
        
                
            </div>
        </section>

      
        
      </PortalLayout>
        
    )
  }