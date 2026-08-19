import "/public/css/modal.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faX} from "@fortawesome/free-solid-svg-icons";
import { Children, useState } from "react";
import styled from 'styled-components'
import { useParams } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";


function ModalMessage  ({btnAbrirModal,btnAbrirModalCss ,children}){
    const [modal, setModal] = useState('')

    const handleCerrarModal = () =>{
        setModal(!modal)
    }

    const id = useParams().id
    const auth = useAuth()


    const Visible = () =>{
        if(id === auth.getUser()?.id){
  
          return(
            <button onClick={handleCerrarModal} className={` ${btnAbrirModalCss} ${modal? 'activemodal' : ''}`}>{btnAbrirModal}</button> 

          )
        }
      }
  

      

    return(


        <>
        <Visible/>

           
          <div className={`modalContainer ${modal? 'activemodal' : ''}`}>
          <div className="modalMessage">
            <div className="btnModalCerrar">
                <a onClick={handleCerrarModal}><FontAwesomeIcon icon={faX}/></a>
            </div>
           {children} 
          </div>
        </div>
        </>
    )
}


export {ModalMessage}