import { PortalLayout } from "../layout/PortalLayout";
import "../../public/css/notes.css"
import "../../public/css/home.css"
import NamePerfils from "../components/Perfil/NamePerfils";
import { useUsers } from "../hooks/FetchUsers/useUser";
import ActionButton from "../components/Notes/ActionButton";
import CreateNoteModal from "../components/Notes/CreateNoteModal";
import { NoteFriendsList } from "../components/Notes/NoterFriendsList";
import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import {  useParams } from "react-router-dom";
import { AuthResponse, User } from "../types/types";
import { API_URL } from "../auth/constants";
import CardNote from "../components/Notes/CardNote";
import EditNoteModal from "../components/Notes/EditNoteModal";
import ImagePerfils from "../components/Perfil/ImagePerfil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


export default function Notes(){
    const [createNotemodalOpen, setCreateNotemodalOpen] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(null)
    const [notes, setNotes] = useState<User[]>([])
    const [deleteResponse, setDeleteResponse] = useState("");
    const [ editeNoteResponse, setEditeNoteResponse] = useState("");
    const [ createNoteResponse, setCreateNoteResponse] = useState("");
    const [visiblestartactive] = useState(true);
    const [isLoadingNotes, setIsLoadingNotes] = useState(true);
    const [notesError, setNotesError] = useState("");

    const {users} = useUsers()
    const auth = useAuth()
    const id = useParams().id
    const n = notes.find(a => a.id === String(id))
    const note = n?.notes

    const fav = note?.find((fav)=> fav.favorite === true) || 'vacio'
    const visiblestartDesactive = fav === 'vacio'

useEffect(() =>{
    getnote()
}, [])


   async function addfav(id: string) {

    try {
        const response =await fetch(`${API_URL}/notes/fav/${id}`, {
            method: "PUT",
            headers: {
                "content-Type": "application/json",
                Authorization: `Bearer ${auth.getAccessToken()}`
            },
        })
        const data = await response.json()
        console.log(data)
        await getnote()
        return data
    } catch (error) {
        console.log(error)
    }
}

   async function handlestarDesactive (id: any){
    await addfav(id)
}

async function handlestarActive (id: any){
    await addfav(id)
}

   function istrue(favorite: any, id: any){

    if(favorite === true){
        
        return (
        <>
         <div className="cardHeaderNote">
         {!!visiblestartactive && <button onClick={() =>handlestarDesactive(id)} className="startActive" ><FontAwesomeIcon  icon={faStar}/></button>}             
        </div>
        </>)
    }else {
        return(
            <>
            <div className="cardHeaderNote">
              {!!visiblestartDesactive &&  <button onClick={() =>handlestarActive(id)}  className="startdesactive" ><FontAwesomeIcon  icon={faStar}/></button>}
              </div>
            </>
        )
    }
   }

    async function handleOnCreate(){
    setCreateNotemodalOpen(false)

    setCreateNoteResponse('Nueva nota')
        
    setTimeout(() => {
        setCreateNoteResponse('')
    }, 2000);

    await getnote()
    }
 
 async function getNotes(){

    try {

        const response = await fetch(`${API_URL}/perfil/users/info`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth.getAccessToken()}`
            }
        })

        if (!response.ok) {
            throw new Error("request failed")
        }

        return await response.json()

    } catch (error) {
        console.log(error)
        throw error
    }
  }


   async function getnote() {
    setIsLoadingNotes(true)
    setNotesError("")
    try {
        const notes = await getNotes()
        setNotes(notes)
    } catch (error) {
        setNotesError("No se pudieron cargar las notas")
    } finally {
        setIsLoadingNotes(false)
    }
  }

   async function handleonEdit(){
    setNoteToEdit(null)

    setEditeNoteResponse('Nota editada')
        
    setTimeout(() => {
        setEditeNoteResponse('')
    }, 2000);

   await getnote()
    }

    function handleOnEditNote(n:any){
      setNoteToEdit(n)
      
      
  }

  async function handleOnRemoveNote(id:string){
    try {
        await  deleteNote(id)
        await getnote()
    } catch (error) {
        console.error(error)
    }
}


async function deleteNote(id:string) {
  try {
      const response = await fetch(`${API_URL}/notes/${id}`,{
          method: 'DELETE',
          headers: {
              "Content-Type": "aplication/json",
              Authorization: `Bearer ${auth.getAccessToken()}`
          }
          
      })
      
      const json = (await response.json()) as AuthResponse

      if(response.ok){
        
        setDeleteResponse(json.body.sucess)

        setTimeout(() => {
            setDeleteResponse('')
          }, 2000);
      }

      return json

    
  } catch (error) {
      console.error(error)
  }
}

    return(
    
        
        <PortalLayout>
{!!deleteResponse && <div className="succesmensage">{deleteResponse}</div>}
{!!editeNoteResponse && <div className="succesmensage">{editeNoteResponse}</div>}
{!!createNoteResponse && <div className="succesmensage">{createNoteResponse}</div>}


        <section className="seccion-perfil-usuario">
            <div className="perfil-usuario-bodyNotes">

                <div className="Notes-usuario-portada">
                <div className="perfil-usuario-avatar">
                     <ImagePerfils users={users}/>
                </div>
                </div>

            <div className="Note-usuario-bio">
                
                <NamePerfils users={users}/>
                
             </div>


            <div className="perfil-usuario-amigos">
                  <div className="div-acciones-amigos">
                  <h2>Amigos</h2>
                 <a className="btnmostrartodo" href="#">Mostrar todo</a>
                  </div>
                      
                 <NoteFriendsList users={users}/>
                </div>

                <ActionButton onClick={() => setCreateNotemodalOpen(true)}/>

             {isLoadingNotes && <p className="dashboard-status">Cargando notas...</p>}
             {!!notesError && <p className="dashboard-status dashboard-status-error">{notesError}</p>}

             <div className="cardNoteGrid">
             {note?.map((n)=>(
             <CardNote
             key={n.id} 
             title={n.title} 
             descripcion={n.description}
             favorite={istrue(n.favorite, n.id)}
             onEdit={() => handleOnEditNote(n)}
             onRemove={() =>handleOnRemoveNote(n.id)}  
             />
      ))} 
            </div>  
            <CreateNoteModal 
            isOpen={createNotemodalOpen} 
            onClose={() => setCreateNotemodalOpen(false)}
            onCreate={handleOnCreate}
            />

            {noteToEdit != null &&
            <EditNoteModal 
            note={noteToEdit}
            isOpen
            onClose={() => setNoteToEdit(null)}
            onEdit={handleonEdit}
            />}

            </div>
        </section>
        </PortalLayout>
    )
}