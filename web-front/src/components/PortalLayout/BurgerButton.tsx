import { useState } from 'react'
import '../../../public/css/portallayout.css'

function BurgerButton(){
    const [clicked, setClicked] = useState(false)

    const handleclick= ()=>{

        setClicked(!clicked)
    }

    return(
      <>
       <div className={`circle ${clicked? 'active' : ''}`}>
       <div className={`navicon ${clicked? 'active' : 'inactive'}`}  onClick={handleclick} id="navicon">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
       </div>
        </>
    )

}

export default BurgerButton