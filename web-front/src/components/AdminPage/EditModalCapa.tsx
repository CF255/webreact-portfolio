import { useState } from "react"
import { useAuth } from "../../auth/AuthProvider"
import { API_URL } from "../../auth/constants"
import { Panel } from "./Panel"

const EditModalCapa = (props) =>{

    const auth = useAuth()

    async function editSlide(id:string, payload: unknown) {
   
        try {
            const response = await fetch(`${API_URL}/adminpage/capslideoptions/${id}`,{
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
        cardslide: props.cardslide.cardslide,
        tictac: props.cardslide.tictac,
        apipelis: props.cardslide.apipelis,
        giffy: props.cardslide.giffy,
        messages: props.cardslide.messages
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
            const id = props.cardslide.id
           await editSlide(id, form)
           props.onEdit()
        } catch (error) {
            console.error(error)
        }
    }

    return<>
     <Panel onAccept={handleGuardar}>

        <div className="capacidadesadmin">

        <div className="containercapacidades">

{/* <form onSubmit={  () =>handleOnSubmitbtn(user.id)}> */}
<div>



<div className="headercontainercapacidades">
<h1>Slide Card</h1>
<input type="checkbox" name="cardslide" id="cardslide" value={form.cardslide}  onChange={handleInputOnChange} />
</div>
<div className="capacidadoption">
<p>Tic Tac Toe</p>
<input type="checkbox" name="tictac" id="tictac" value={form.tictac} onChange={handleInputOnChange} />
</div>
<div className="capacidadoption">
<p>Api Pelis</p>
<input type="checkbox" name="apipelis" id="apipelis" value={form.apipelis} onChange={handleInputOnChange} />
</div>
<div className="capacidadoption">
<p>Giffy</p>
<input type="checkbox" name="giffy" id="giffy" value={form.giffy} onChange={handleInputOnChange} />
</div>
<div className="capacidadoption">
<p>Messages</p> 
<input type="checkbox" name="messages" id="messages" value={form.messages} onChange={handleInputOnChange}/>
</div>
<div className="capacidadactionbutton">
<button type="submit">guardar</button>
</div>
</div>
{/* </form>
 */}
</div>
</div>
</Panel>
    </>
}


export default EditModalCapa