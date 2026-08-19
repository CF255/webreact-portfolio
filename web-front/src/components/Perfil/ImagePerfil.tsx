
import {  useParams } from "react-router-dom";
import { User } from "../../types/types";
import '/public/css/perfilinformation.css'


export default function ImagePerfils({users}:{users: User[]}){

          const id = useParams().id
          const user = users.find(a => a.id === String(id))


    return(
      <>
     <img src={user?.image} alt={user?.name} /> 
      </>
    )

}


