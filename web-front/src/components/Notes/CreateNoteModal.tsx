import { useState } from "react"
import Modal from "./common/Modal"
import { useAuth } from "../../auth/AuthProvider"
import { API_URL } from "../../auth/constants"


function CreateNoteModal (props) {
   
    const defaultvalue ={
        title: '',
        description: '',
    }

    const [form, setForm] = useState(defaultvalue)

    const [ vacioNoteResponse, setVacioNoteResponse] = useState("");
    const auth = useAuth()

    async function createNote(payload: unknown) {

        
        try {
            const response =await fetch(`${API_URL}/notes`, {
                method: "POST",
                headers: {
                    "content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                },
                body: JSON.stringify(payload)
            })
            const data = await response.json()
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
        }
    
        
    } 
    
    

    
    function handleInputOnChange(e){
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value,
        })

    }

    async function handleGuardar(){
        if(!form.title || !form.description){
            setVacioNoteResponse('Completa todos los campos')
        
            setTimeout(() => {
                setVacioNoteResponse('')
            }, 2000);
        }else{

            
        try {
        await createNote(form)
            props.onCreate()
            form.title = ''
            form.description =''
        } catch (error) {
            console.error(error)
        }
    }

    }

    return(
        <>
        {!!vacioNoteResponse && <div className="missMensaje">{vacioNoteResponse}</div>}


        <Modal isOpen={props.isOpen} onAccept={handleGuardar} onClose={props.onClose}
        title="Nueva nota">
           

            <div className="formGroup">
                <label className="FormLabel" htmlFor="title">Título</label>
                <input className="FormInput" type="text" name="title" id="title" onChange={handleInputOnChange}></input>
            </div>

            <div className="formGroup">
                <label className="FormLabel" htmlFor="description">Descripción</label>
                <textarea className="FormTextArea" name="description" id="description" rows={5} onChange={handleInputOnChange}></textarea>
            </div>
        </Modal>
        </>
        
    )
}

export default CreateNoteModal