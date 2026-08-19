
import FlechaIz from '/img/left-lined.svg'
import FlechaDe from '/img/right-lined.svg'
import { useRef, useEffect, useCallback, useState} from 'react'
import styled from 'styled-components'
import '/public/css/slideshow.css'


const SlideShow = ({
    children  ,
    controles = false,
    autoplay = false,
    speedSlide="800",
    intervalo="10000"
}) => {
const slideshow = useRef(null);


const handlenext = useCallback(() => {
    
    if(slideshow.current.children.length > 0){
        
       
        const primerElemento = slideshow.current.children[0];

       
        slideshow.current.style.transition = `${speedSlide}ms ease-out all`;

        const sizeSlide = slideshow.current.children[0].offsetWidth;

        
        slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;

        const transition = () => {
           
            slideshow.current.style.transition = 'none';
            slideshow.current.style.transform = `translateX(0)`;

           
            slideshow.current.appendChild(primerElemento);

            slideshow.current.removeEventListener('transitionend', transition);
        }

       
        slideshow.current.addEventListener('transitionend', transition);

    }
}, [speedSlide]);

 const handleprevious = () => {
    
    if(slideshow.current.children.length > 0){
      
        const index = slideshow.current.children.length - 1;
        const lastElement = slideshow.current.children[index];
        slideshow.current.insertBefore(lastElement, slideshow.current.firstChild);
        
        slideshow.current.style.transition = 'none';
        const sizeSlide = slideshow.current.children[0].offsetWidth;
        slideshow.current.style.transform = `translateX(-${sizeSlide}px)`;
    
        setTimeout(() => {
            slideshow.current.style.transition = `${speedSlide}ms ease-out all`;
            slideshow.current.style.transform = `translateX(0)`;
        }, 30);
    }
} 
/* 
 useEffect(() => {

    var intervalos

    if(autoplay){
         intervalos = setInterval(() => {
            handlenext();
            
        }, intervalo);


        slideshow.current.addEventListener('mouseenter', () => {
            clearInterval(intervalos);
        });

       
        slideshow.current.addEventListener('mouseleave', () => {
            intervalos = setInterval(() => {
                handlenext();
                
            }, intervalo); 
            
        });
    }
}, [autoplay, intervalo, handlenext]);
  */

    return(
        <>
         
        <div className='maincontainer' >
        <p className="ptitulo">SlideShow</p>
            <div className="slideshow" ref={slideshow}>
            {children}
            </div>


         {controles && <Controles className="containercontroles">
           <button onClick={handleprevious} className='btncontrol btncontroliz' >
            <img src={FlechaIz} alt="" />
           </button>
           <button onClick={handlenext} className='btncontrol btncontrolde' >
            <img src={FlechaDe} alt="" />
           </button>
            </Controles>} 

        </div>
        </>
    )
}


const Slide =styled.div`
`

const TextSlide =styled.div`
`

const Controles =styled.div`
`


export  {SlideShow, Slide, TextSlide }