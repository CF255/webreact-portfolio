import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { API_URL } from "../auth/constants";
import { AuthResponse, AuthResponseError } from "../types/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faUser, faLock} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faGoogle, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../../public/css/login-signup.css"



export default function Login(){

    const [ username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorResponse, setErrorResponse] = useState("")
    const [missResponse, setMissResponse] = useState("");
  

    const auth = useAuth()
    const goTo = useNavigate()

    if(auth.isAuthenticated){
    return <Navigate to="/dashboard"/> 
       
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault()

        try {
            const response = await fetch(`${API_URL}/login`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            })

            if(response.ok){
                console.log("login succesfull")
                setErrorResponse("")
                const json = (await response.json()) as AuthResponse
                
                if(json.body.accessToken && json.body.refreshToken){
                    auth.saveUser(json)

                 
                
                        goTo(`/dashboard`)
                }

               
            }else{
                console.log("algo salio mal")
                const json = await response.json() as AuthResponseError;
                setErrorResponse(json.body.error)
                setMissResponse(json.body.miss)
                return

            }
        } catch (error) {
            console.log(error)
         
        }
    }


    

    const handleSign_up_btn = () =>{
        const container = document.querySelector(".container")

        container?.classList.add("sign-up-mode")
        
           setTimeout(() => {
            goTo("/signup")
        }, 1750);   
    }

    


    return(
        <>

         <div className="container">
            <div className="forms-container">
                <div className="signin-signup">
                <form onSubmit={handleSubmit} className="sign-in-form">
            <h1 className="title">Login</h1>
            
            <div className="modalmessage">
    {!!errorResponse && <div className="errormessage">{errorResponse}</div>}
    {!!missResponse && <div className="missmessage">{missResponse}</div>}
    </div> 

           <div className="input-field">
           <div className="input-field-i">
           <FontAwesomeIcon style={{color: '#acacac'}} icon={faUser}/>
           </div>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"></input>
           </div>

        
           <img src="../" alt="" />
           <div className="input-field">
           <div className="input-field-i">
           <FontAwesomeIcon style={{color: '#acacac'}} icon={faLock}/>
           </div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            </div>
        
            <input type="submit" value="Login" className="btn solid"/>

            <p className="social-text">Sign in with social platforms</p>
            <div className="social-media">
            <a href="#" className="social-icon"><FontAwesomeIcon style={{height: '1.5rem', width: '1.5rem'}} icon={faFacebook}/></a>
            <a href="#" className="social-icon"><FontAwesomeIcon style={{height: '1.5rem', width: '1.5rem'}} icon={faGoogle} /></a>
            <a href="#" className="social-icon"><FontAwesomeIcon style={{height: '1.5rem', width: '1.5rem'}} icon={faInstagram}/></a>
            <a href="#" className="social-icon"><FontAwesomeIcon style={{height: '1.5rem', width: '1.5rem'}} icon={faGithub}/></a>
            </div>
                  </form>
                
                </div>
            </div>


            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>new here?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        <button onClick={handleSign_up_btn} className="btn trasparent">Sign up</button>

                      
                    </div>
                    <img src="../../public/img/mobile.svg" className="image" alt="" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        <button  className="btn trasparent" >Sign in</button>

                       
                    </div>
                    <img src="../../public/img/switch.svg" className="image" alt="" />
                </div>
            </div>
         </div>
       </>
        
    )
}