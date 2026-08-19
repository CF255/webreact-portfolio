import React, { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import { API_URL } from "../auth/constants";
import '../../public/css/portallayout.css'
import BurgerButton from  '../components/PortalLayout/BurgerButton'
import PerfilInformation from "../components/PortalLayout/PerfilInformation";




 function PortalLayout({children}: {children: React.ReactNode}){

    const [clicked, setClicked] = useState(false)
    const auth = useAuth()

     async function handleSignOut( e: React.MouseEvent<HTMLAnchorElement> ){
        e.preventDefault(); 
        
    
       try {
           const response = await fetch(`${API_URL}/signout`,{
               method: "DELETE",
               headers: {
                   "Content-Type": "aaplication/json",
                   Authorization: `Bearer ${auth.getRefreshToken()}`
               }
           })
    
           if(response.ok){
               auth.signout()
           }
       } catch (error) {
           
       }
      
    }
    

   


    const handleaMenu = () =>{
        setClicked(!clicked)
    }


    const AdminPage = () =>{
        if(auth.getUser()?.username === "admin"){
            return(
                <li className="liPortalLayaout">
                        <Link className="aroutes" to={`/adminPage/${auth.getUser()?.id }`}>Admin Page</Link>
                    </li>
            )
        }
    }



   

    return(
        <>
        <div className="headerfixed">
        <header className="navcontainer">

            

            <Link to={`/dashboard`}>
            <img className="logo" src="/img/logo.png" alt="" />
            </Link>
            <nav className="navPortalLayaout">
                <ul className={`links ${clicked? 'active' : ''}`}>
                    <li className="liPortalLayaout">
                        <Link className="aroutes" to="/dasboard">...</Link>
                    </li>                    
                    <li className="liPortalLayaout ">
                        <Link className="aroutes"  to={`/perfil/notes/${auth.getUser()?.id }`}>Notas</Link>
                    </li>
                    <AdminPage/>
                    <li className="liPortalLayaout liperfil">
                    <PerfilInformation />
                    </li>
                    <li className="liPortalLayaout">
                        <a className="btnsignout"  onClick={handleSignOut}>sign out</a>
                    </li>


                </ul>

              

                <div className="burgerbtn" onClick={handleaMenu}>
                <BurgerButton/>
                </div>
        
            </nav>

           
          
        </header>
        </div>


        <div>
        <div className={`initial ${clicked? 'active' : ''}`}></div>
        <div className={`circulo1 ${clicked? 'active' : ''}`}></div>
        <div  className={`circulo2 ${clicked? 'active' : ''}`}></div>
        <div  className={`circulo3 ${clicked? 'active' : ''}`}></div>
       </div>    
                   

    <main>
    {children}
    </main>
        </>


    )
}


export {PortalLayout}