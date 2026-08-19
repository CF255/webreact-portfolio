import { Link } from "react-router-dom";
import { User } from "../../types/types";
import '/public/css/perfilinformation.css'


export function UserList({users}:{users: User[]}){


    if(!users) return null

    console.log(users)

    const fullName = (user: User) => `${user.name} ${user.username}`

    return (

        <>
        {users.map((user)=>(
            <article className='articleperfil' key={user.id}>
             <header className='headerperfil sidedivperfil'>
          <Link className='aroutes'  to={`/perfil/${user.id}`} >
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