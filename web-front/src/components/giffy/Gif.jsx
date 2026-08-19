import React from "react";
import '../../../public/css/giffy/Gif.css'
import { Link } from "wouter";

 function Gif ({title, id, url}) {
return(
      <div className="Gif">
      <div className="Gif-buttons">
      </div>
      <Link to={`/giffy/gif/${id}`} className='Gif-link'>
        <h4>{title}</h4>
        <img loading='lazy' alt={title} src={url} />
      </Link>
    </div>
)
}


export default React.memo(Gif)