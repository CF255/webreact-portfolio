import { PortalLayout } from "../layout/PortalLayout"
import "/public/css/admin.css"
import "/public/css/capacidades.css"
import { useAuth } from "../auth/AuthProvider"
import { useCapSlider } from "../hooks/FetchUsers/useCapSlider"
import { API_URL } from "../auth/constants"
import { Panel } from "../components/AdminPage/Panel"
import { useState } from "react"




function AdminPage (){

    const auth = useAuth()
    const {users} = useCapSlider() 
    const [modalOpen, setModalOpen] = useState(false)

/*     const id = users.find(a => a.id)
    console.log(id)
    const card = id?.cardslide.find((car)=> car.id)
    console.log(card)
    const trueorfalse = card?.cardslide
    console.log(trueorfalse) */

    async function changeSlideOtion(id: string) {
        
        try {
            const response =await fetch(`${API_URL}/adminpage/capslideoptions/${id}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                },
            })
            const data = await response.json()
            console.log(data)
            
            return data
        } catch (error) {
            console.log(error)
        }
    } 

    async function changeTicTacOption(id: string) {
        
        try {
            const response =await fetch(`${API_URL}/adminpage/tictacoptions/${id}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                },
            })
            const data = await response.json()
            console.log(data)
            
            return data
        } catch (error) {
            console.log(error)
        }
    } 


    async function changeApiPeliOption(id: string) {
        
        try {
            const response =await fetch(`${API_URL}/adminpage/apipelisoptions/${id}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                },
            })
            const data = await response.json()
            console.log(data)
            
            return data
        } catch (error) {
            console.log(error)
        }
    } 


    async function changeGiffyOption(id: string) {
        
        try {
            const response =await fetch(`${API_URL}/adminpage/giffyoptions/${id}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                },
            })
            const data = await response.json()
            console.log(data)
            
            return data
        } catch (error) {
            console.log(error)
        }
    } 


    async function changeMessageOption(id: string) {
        
        try {
            const response =await fetch(`${API_URL}/adminpage/messagesoptions/${id}`, {
                method: "PUT",
                headers: {
                    "content-Type": "application/json",
                    Authorization: `Bearer ${auth.getAccessToken()}`
                },
            })
            const data = await response.json()
            console.log(data)
            
            return data
        } catch (error) {
            console.log(error)
        }
    } 



    const handleslidecard = (id:string)=>{

        const u = users.find(a => a.id === String(id))
        const card = u?.cardslide.find((car)=> car.id)
        const cardId = card?.id
 
         changeSlideOtion(cardId)
    }

    const handleTicTac = (id:any) =>{
        const u = users.find(a => a.id === String(id))
        const card = u?.cardslide.find((car)=> car.id)
        const cardId = card?.id

         changeTicTacOption(cardId)
    }

    const handleApiPelis = (id:string) =>{
        const u = users.find(a => a.id === String(id))
        const card = u?.cardslide.find((car)=> car.id)
        const cardId = card?.id
 
         changeApiPeliOption(cardId)
    }

    const handleGiffy = (id:string) =>{
        const u = users.find(a => a.id === String(id))
        const card = u?.cardslide.find((car)=> car.id)
        const cardId = card?.id

         changeGiffyOption(cardId)
    }

    const handleMessages = (id:string) =>{
        const u = users.find(a => a.id === String(id))
        const card = u?.cardslide.find((car)=> car.id) 
        const cardId = card?.id

         changeMessageOption(cardId)
    }


    return(
        <PortalLayout>
             
        
        <div className="mainContainerAdminPage">
            
            <div className="tableContainerAdminPage">
            <table className="tableAdminPage">
                <thead>
                    <tr>
                        <th>Id user</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Password</th>
                    </tr>
                </thead>
                
                <tbody>
    
          {users?.map((user)=>(
            <>
             <tr key={user.id}>
                        <td data-lable="User Id">{user.id}</td>
                        <td data-lable="Name">{user.name}</td>
                        <td data-lable="Username">{user.username}</td>
                        <td data-lable="Password">password</td>
                       
                    </tr>

                    

                    <Panel >

                    <div className="capacidadesadmin">

                    <div className="containercapacidades">

                    <div className="headercontainercapacidades">
                    <h1>Slide Card</h1>
                    <input type="checkbox"   onClick={  () =>{
                        handleslidecard(user.id)
                    }}/>
                    </div>


                
                    <div className="capacidadoption">
                    <p>Tic Tac Toe</p>
                    
                    
                    <input type="checkbox" /* checked={ user.cardslide?.tictac ? true : false} */ onClick={() => handleTicTac(user.id)} />
                   
                    </div>
                    <div className="capacidadoption">
                    <p>Api Pelis</p>
                    <input type="checkbox" onClick={() => handleApiPelis(user.id)} />
                    </div>
                    <div className="capacidadoption">
                    <p>Giffy</p>
                    <input type="checkbox" onClick={() => handleGiffy(user.id)} />
                    </div>
                    <div className="capacidadoption">
                    <p>Messages</p>
                    <input type="checkbox" onClick={() => handleMessages(user.id)}/>
                    </div>
                    <div className="capacidadactionbutton">
                    </div>

                    </div>
                    </div>
                    </Panel>
                
            </>

          ))} 

                   
                </tbody>
            </table>
            </div>

        </div>
        

        </PortalLayout>
    )

}


export default AdminPage