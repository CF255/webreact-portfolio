import {  useParams } from "react-router-dom";
import { User } from "../../types/types";
import '/public/css/perfilinformation.css'




export default function NamePerfils({users}:{users: User[]}){

          const id = useParams().id
          const user = users.find(a => a.id === String(id))

    return(
      <>
       <h3 className="titulousuario">{user?.name}</h3>
      </>
    )

}


