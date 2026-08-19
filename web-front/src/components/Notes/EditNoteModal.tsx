import { useState } from "react"
import Modal from "./common/Modal"
import { API_URL } from "../../auth/constants"
import { useAuth } from "../../auth/AuthProvider"


const EditNoteModal = (props) =>{
    const auth = useAuth()

    async function editNote(id:string, payload: unknown) {
   
        try {
            const response = await fetch(`${API_URL}/notes/${id}`,{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                },
                body: JSON.stringify(payload)
            })


            const data = await response.json()
            return data 
    
        } catch (error) {
            console.error(error)
    
        }
    }
    

    const [form, setForm] = useState({
        title: props.note.title,
        description: props.note.description
    })

    function handleInputOnChange(e){
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value,
        })

    }

    async function handleGuardar(){
        try {
            const id = props.note.id
           await editNote(id, form)
           props.onEdit()
        } catch (error) {
            console.error(error)
        }
    }
    
    return(
        <>

     

        <Modal isOpen ={props.isOpen } onAccept={handleGuardar} onClose={props.onClose} title="Editar nota">
        
        <div className="formGroup">   
        <label className="FormLabel"  htmlFor="title">Titulo</label>
        <input className="FormInput"  type="text" name="title" id="title" value={form.title} onChange={handleInputOnChange}></input>
            </div>

            <div className="formGroup">
                <label className="FormLabel" htmlFor="description">Description</label>
                <textarea className="FormTextArea" name="description" id="description" value={form.description} rows={5} onChange={handleInputOnChange}></textarea>
            </div>
        </Modal>
        </>
    )
}


export default EditNoteModal