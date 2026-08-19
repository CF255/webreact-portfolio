import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faUser, faLock, faUserNinja, faImage} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faGithub, faGoogle, faInstagram } from "@fortawesome/free-brands-svg-icons";
import "../../public/css/login-signup.css"

export default function Signup() {

  const [preview, setPreview] = useState<File | null>(null)
  const [errorResponse, setErrorResponse] = useState("");
  const [missResponse, setMissResponse] = useState("");
  const [sucessResponse, setSucessResponse] = useState("");
  const defaulValue ={
    name: '',
    username: '',
    password: '',
    image: null as File | null
  }
  const [form, setForm] = useState(defaulValue)

  const auth = useAuth();
  const goTo = useNavigate();


  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();


    const formData = new FormData()

    for(const [key, value] of Object.entries(form)){
      formData.append(key, value!)
    }
   

    try {
      const response = await fetch("http://localhost:3100/api/signup", {
        method: "POST",
        body: formData
      })

      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setForm(defaulValue)

        
        setSucessResponse(json.body.sucess)
        setTimeout(() => {
          goTo("/login");
        }, 2000);
       
      } else {
        const json = (await response.json()) as AuthResponseError;
      
        setErrorResponse(json.body.error);
        setMissResponse(json.body.miss);

        setTimeout(() => {
        setErrorResponse('');
        setMissResponse('');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  }  

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    
    

    if(e.target.name === 'image'){
      const file = e.target.files ? e.target.files[0] : null
setForm ({...form, [e.target.name]: file})
    }else{

      setForm ({...form, [e.target.name]: e.target.value})
    }
  

    if(!e.target.files) return;
    setPreview(e.target.files[0])
  
   
  
  }

 

const handleSign_in_btn = () =>{
  const container = document.querySelector(".container")
  container?.classList.remove("sign-up-mode") 

    setTimeout(() => {
        goTo("/login")
    }, 1750);
}


if (auth.isAuthenticated) {
  return <Navigate to="/dashboard" />;
}


  return (

    <div className="container sign-up-mode">
    <div className="forms-container">
        <div className="signin-signup">
        <form  onSubmit={handleSubmit}  className="sign-up-form">
    <h1 className="title">Sign Up</h1>

     <div className="modalmessage">
    {!!errorResponse && <div className="errormessage">{errorResponse}</div>}
    {!!missResponse && <div className="missmessage">{missResponse}</div>}
    {!!sucessResponse && <div className="sucessmessage">{sucessResponse}</div>}
    </div> 

    

    <div className="imagen-signup">
        <img  src={preview === null ? "../../public/img/logoperfil.png" :URL.createObjectURL(preview)} alt=""  />
    </div>

  <div className="input-field">
   <div className="input-field-i"> 
   <FontAwesomeIcon style={{color: '#acacac'}} icon={faImage}/>
   </div>

   <div className="file-select" id="src-file1" >
  <input type="file" name="image" accept="image/png, image/jpeg" onChange={handlechange}  aria-label="Archivo"></input>
</div>
  
    </div>


   <div className="input-field">
   <div className="input-field-i">
   <FontAwesomeIcon style={{color: '#acacac'}} icon={faUser}/>
   </div>
    <input type="text" required value={form.name} name="name"  onChange={handlechange} placeholder="Name"></input>
   </div>

   <div className="input-field">
   <div className="input-field-i">
   <FontAwesomeIcon style={{color: '#acacac'}} icon={faUserNinja}/>
   </div>
    <input type="text" required value={form.username} name="username" onChange={handlechange} placeholder="Username"/>
    </div>

    <div className="input-field">
   <div className="input-field-i">
   <FontAwesomeIcon style={{color: '#acacac'}} icon={faLock}/>
   </div>
   
    <input type="password" required value={form.password} name="password" onChange={handlechange} placeholder="Password"/>
    </div>

    <input type="submit" value="Sign Up" className="btn solid"/>

    <p className="social-text">Sign up with social platforms</p>
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
                        <button className="btn trasparent">Sign up</button>
                       
                    </div>
                    <img src="/img/mobile.svg" className="image" alt="" />
                </div>

                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us?</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                        <button  className="btn trasparent" onClick={handleSign_in_btn}>Sign in</button>

                        
                    </div>
                    <img src="/img/switch.svg" className="image" alt="" />
                </div>
            </div>
 </div>
 
  );
}
