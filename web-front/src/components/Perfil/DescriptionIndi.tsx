
import {  useParams } from "react-router-dom";
import { User } from "../../types/types";
import '/public/css/perfilinformation.css'
import { API_URL } from "../../auth/constants";
import { useAuth } from "../../auth/AuthProvider";
import { useEffect, useState } from "react";



export default function DescriptionIndi(){
    const [notes, setNotes] = useState<User[]>([])

    const auth = useAuth()
    const id = useParams().id
  const n = notes.find(a => a.id === String(id))
   const note = n?.notes  

   useEffect(() =>{
    getnote()
}, [])

  

    const fav = note?.find((fav)=> fav.favorite === true)


    async function getNotes(){

        try {
            
            const response = await fetch(`${API_URL}/perfil/users/info`,{
                method: "GET",
                headers: {
                    "Content-Type": "aplication/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                }
            })
            const data = await response.json()
            return data
            
        } catch (error) {
            console.log(error)
      
        }
      } 
      
      
       async function getnote() {
        const notes = await getNotes()
        setNotes(notes)
      } 

      return(
        <>
         <h1 className="h1NotesIndi">{fav?.title}</h1>
        <p className="pNotesIndi">{fav?.description}</p>
        </>
      )

}

