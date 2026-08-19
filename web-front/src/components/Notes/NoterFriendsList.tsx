import { Link } from "react-router-dom";
import { User } from "../../types/types";
import '/public/css/perfilinformation.css'


export function NoteFriendsList({users}:{users: User[]}){


    if(!users) return null

    const fullName = (user: User) => `${user.name} ${user.username}`

    return (

        <>
        {users.map((user)=>(
            <article className='articleperfil' key={user.id}>
             <header className='headerperfil sidedivperfil'>
          <Link className='aroutes'  to={`/perfil/notes/${user.id}`} >
          <img className='imgperfil' src={user.image} alt={fullName(user)}></img>
          </Link>


          <div className='containerperfiltext'>
              <strong className='stnombreperfil'>{user.name}</strong>
              <span className='spusernameperfil'>@{user.username}</span>
          </div>
          
               </header>
              </article>

          ))} 

        </>

    )
}