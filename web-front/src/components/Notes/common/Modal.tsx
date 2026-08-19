import "/public/css/modalnotes.css"


const Modal = (props) =>{

    if(!props.isOpen) return null;

    return(
    <>
     <div className="overlay" onClick={props.onClose}></div>
     <div className="modalNotesGrapper">
        {props.title && <h3 className="titleModalNote">{props.title}</h3>}
        {props.children}

        <div className="FormGroupBTN">
                <button className="btnOpcionsNotes" onClick={props.onAccept}>Aceptar</button>
                <button className="btnOpcionsNotes cancelarModalNotes" onClick={props.onClose}>Cancelar</button>
    </div>

    </div>

   
        
    </>
       
    )
}


export default Modal