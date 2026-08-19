import {SlideShow, Slide, TextSlide} from "../components/SlideShow/SlideShow";


import '../../public/css/home.css'
import '../../public/css/slideshow.css'
import img2 from '/img/img2.jpg'
import messageiconmini from '/img/messagesiconmini.png'
import imgminilogoapipelis from '/img/minilogoapipelis.jpg'
import {Carrousel,CardSlide, CardTextSlide} from "../components/Carrousel/Carrousel";
import '../../public/css/carrousel.css'
import imgminilogotresenraya from '/img/imgtresenraya.jpg'
import imglogotresenraya from '/img/tresenraya.png'
import imgapipelis from '/img/logoapipelis.jpg'
import imglogogiphy from '/img/imglogogiphy.jpg'
import imgminilogogiphi from '/img/imgminilogogiphy.jpg'
import { Link, useParams } from "react-router-dom";
import { PortalLayout } from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { useCapSlider } from "../hooks/FetchUsers/useCapSlider";




export default function Dashboard(){

const auth = useAuth()

        const {users} = useCapSlider() 
        const id = auth.getUser()?.id

        const u = users.find(a => a.id === String(id))
        const card = u?.cardslide.find((car)=> car.id)

         const cardId = card?.cardslide
         const visitictac = card?.tictac
         const visiapipelis = card?.apipelis
         const visigiffy = card?.giffy
         const visimessages = card?.messages
     


    return(
        
       <>


        <PortalLayout>
             <main>

                {/* slideshow */}

                
                <SlideShow controles={true} autoplay={true}>
                <Slide className="slide">
                <Link to={"/tresenraya"}>
                    <img src={imglogotresenraya} alt="" />
                    </Link>
                <TextSlide className='textslide'>
                    <p>Tic Tac Toe</p>
                </TextSlide>
            </Slide>
            <Slide className="slide">
               <Link to={"/apipelis"}>
                    <img src={imgapipelis} alt="" />
                    </Link>
                <TextSlide className='textslide'>
                    <p>Movies Api</p>
                </TextSlide>
            </Slide>
            <Slide className="slide">
            <Link  to={"/giffy"}>
                    <img src={imglogogiphy} alt="" />
                    </Link>
                <TextSlide className='textslide'>
                    <p>Giphy Api</p>
                </TextSlide>
            </Slide>
            <Slide className="slide">
                <a href="#">
                    <img src={img2} alt="" />
                </a>
                <TextSlide className='textslide'>
                    <p>prueba</p>
                </TextSlide>
            </Slide>
                </SlideShow>
            {/* fin slideshow */}

          
    

                {/* carrousel card */}

                {!!cardId && <>

                <p className="ptitulo">Card slide</p>

                <Carrousel controles={true}>

                {!! visitictac && <>
                <CardSlide className="card">
                <div className="img"><img src={imgminilogotresenraya} alt="img"  /></div>
                <CardTextSlide>Tic Tac Toe</CardTextSlide>
                <Link to={'/tresenraya'}>
                <button className='btnentrar'>entrar</button>
                </Link>
            </CardSlide>
             </>}

                    {!!visiapipelis && <>
            <CardSlide className="card">
                <div className="img"><img src={imgminilogoapipelis} alt="img" /></div>
                <CardTextSlide>Api Pelis</CardTextSlide>
                
                <Link to={'/apipelis'}>
                <button className='btnentrar'>entrar</button>
                </Link>
            </CardSlide>
            </>}
  
            {!!visigiffy && <>
            <CardSlide className="card">
                <div className="img"><img src={imgminilogogiphi} alt="img" /></div>
                <CardTextSlide>Giffy</CardTextSlide>
                <Link  to={'/giffy'}>
                <button className='btnentrar'>entrar</button>
                </Link>
            </CardSlide>
            </>}


                {!!visimessages && <>
            <CardSlide className="card">
                <div className="img"><img src={messageiconmini} alt="img" /></div>
                <CardTextSlide>Messages</CardTextSlide>
               
                <Link  to={`/messages/${auth.getUser()?.id}`}>
                <button className='btnentrar'>entrar</button>
                </Link>
            </CardSlide>
            </>}
            
            <CardSlide className="card">
                <div className="img"><img src={img2} alt="img" /></div>
                <CardTextSlide>nombre</CardTextSlide>
                
                <Link to={'/dashboard'}>
                <button className='btnentrar'>entrar</button>
                </Link>
            </CardSlide>
            <CardSlide className="card">
                <div className="img"><img src={img2} alt="img"  /></div>
                <CardTextSlide>nombre</CardTextSlide>
                
                <Link to={'/dashboard'}>
                <button className='btnentrar'>entrar</button>
                </Link>
            </CardSlide>
                </Carrousel>

                </>}
                {/* fin carrousel card */}
                

             </main>
        </PortalLayout>


        </>
    )
   
}


