
import { Link } from 'react-router-dom'
import '/img/logoperfil.png'
import { useAuth } from '../../auth/AuthProvider'
import '/public/css/perfilinformation.css'


function PerfilInformation(){

   
    const auth = useAuth()
    
    return(

        <>
        <article className='articleperfil'>
            <header className='headerperfil'>
                <Link className='aroutes'  to={`/perfil/${auth.getUser()?.id }`} >
                <img className='imgperfil' src={auth.getUser()?.image}></img>
                </Link>

                <div className='containerperfiltext'>
                    <strong className='stnombreperfil'>{auth.getUser()?.name || ""}</strong>
                    <span className='spusernameperfil'>@{auth.getUser()?.username ?? ""}</span>
                </div>
            </header>
        </article>
        </>
    )
}


export default PerfilInformation