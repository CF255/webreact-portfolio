import React from 'react'
import '/public/css/giffy/giffy.css' 
import SearchResults from '../pages/giffy/SearchResults'
import Home from '../pages/giffy/Home'
import { Route } from 'wouter'
import Detail from '../pages/giffy/Detail'
import { GifsContextProvider } from "../context/giffy/GifsContext";
import { Link } from "wouter";
import Error from "../pages/giffy/Error"
import { PortalLayout } from "../layout/PortalLayout";





 export default function Giffy() {

  return (

<PortalLayout>

  <div className="bodygiffy">

    <div className="topgiffy">







 <div className="logo">
  <Link style={{textDecoration: "none"}} to='/giffy'><h1>GIFS</h1></Link>
 </div>
  

     <section className="App-content">
     
     <GifsContextProvider>
          
                <Route component={Home} path="/giffy" />
                <Route
                  component={SearchResults}
                  path="/search/:keyword"
                />
                <Route component={Detail} path="/giffy/gif/:id" />
                <Route component={Error} path="/giffy/:rest*" />
            
            </GifsContextProvider>

     </section> 
     </div>
  </div>
     
     </PortalLayout>
  
  )
}
