
import { Suspense } from "react";
import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import "/public/css/loading.css"

export default function ProtectedRoute(){
    const auth = useAuth()

    if (!auth.isAuthenticated) {
        return <Navigate to={"/login"}/>
    }

    return (
        <Suspense fallback={<div className="loading"><img className="logo" src="/img/logo.png" alt="" /></div>}>
            <Outlet/>
        </Suspense>
    )
}

