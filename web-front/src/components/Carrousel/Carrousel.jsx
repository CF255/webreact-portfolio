import FlechaIz from '/img/left-lined.svg'
import FlechaDe from '/img/right-lined.svg'
import '/public/css/carrousel.css'
import { useCallback, useRef } from 'react';
import styled from 'styled-components'


function Carrousel (
   { children,
    controles = false,
    speedSlide="200",}

){

    const slidecard = useRef(null);

    const handlenext = useCallback(() => {
    
        if(slidecard.current.children.length > 0){
            
    
           
            const primerElemento = slidecard.current.children[0];
    
           
            slidecard.current.style.transition = `${speedSlide}ms ease-out all`;
    
            const sizeSlide = slidecard.current.children[0].offsetWidth;
    
            
            slidecard.current.style.transform = `translateX(-${sizeSlide}px)`;
    
            const transition = () => {
               
                slidecard.current.style.transition = 'none';
                slidecard.current.style.transform = `translateX(0)`;
    
               
                slidecard.current.appendChild(primerElemento);
    
                slidecard.current.removeEventListener('transitionend', transition);
            }
    
           
            slidecard.current.addEventListener('transitionend', transition);
    
        }
    }, [speedSlide]);
    
     const handleprevious = () => {
        
        if(slidecard.current.children.length > 0){
          
            const index = slidecard.current.children.length - 1;
            const lastElement = slidecard.current.children[index];
            slidecard.current.insertBefore(lastElement, slidecard.current.firstChild);
            
            slidecard.current.style.transition = 'none';
            const sizeSlide = slidecard.current.children[0].offsetWidth;
            slidecard.current.style.transform = `translateX(-${sizeSlide}px)`;
        
            setTimeout(() => {
                slidecard.current.style.transition = `${speedSlide}ms ease-out all`;
                slidecard.current.style.transform = `translateX(0)`;
            }, 30);
        }
    } 


  


return(
    <>
    
    
    <div className="wrapper">
        <ul className="carousel" ref={slidecard}>
      {children}
         </ul>

        { controles && < CardControler className="containercon">
           <button  onClick={handleprevious}  className='btncardcontrol btncardcontroliz' >
            <img src={FlechaIz} alt="" />
           </button>
           <button  onClick={handlenext}  className='btncardcontrol btncardcontrolde' >
            <img src={FlechaDe} alt="" />
           </button>
            </  CardControler>}
    </div>
   
    </>
)

}


const CardSlide =styled.div`
`

const CardTextSlide =styled.span`
`

const CardTextDescrip = styled.p`
`

const CardControler =styled.div`
`


export  {Carrousel, CardSlide, CardTextSlide, CardTextDescrip}