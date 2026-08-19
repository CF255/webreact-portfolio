import { useState } from "react";



export function Panel({children} : {children:any}) {
    const [isActive, setIsActive] = useState(false);
    const tdClassName =  isActive 
    ? 'activetradmin ' 
    : 'desactivetradmin'

    const handleclick= () =>{
        setIsActive(!isActive)   
    }
    
    
    const trClassName =  isActive 
    ? 'tdcontaineradmin ' 
    : 'desactivetdadmin'


 

   
    return (
      <> 

        <td>
        <button className="btnprovider" onClick={handleclick}>capacidades</button>
        </td>

           <tr className={tdClassName}  /* className={` ${clicked? 'activetradmin ' : 'desactivetradmin'}`} */>
           <td className={trClassName} /* className={` ${clicked? ' tdcontaineradmin' : 'desactivetdadmin'}`} */colSpan={5}>
      
            {children}

  
           </td>
           
        </tr>
     
      </>
    );
  }

