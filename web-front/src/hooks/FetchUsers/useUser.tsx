import { useState, useEffect } from "react";
import {User} from "../../types/types"
import { API_URL } from "../../auth/constants";
import { useAuth } from "../../auth/AuthProvider";



export function useUsers  () {

    const [users, setUsers] = useState<User[] | []>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const auth = useAuth()

    const fetchUsers = () =>{
        setIsLoading(true)
        setError("")
        fetch(`${API_URL}/perfil/users`,{
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.getAccessToken()}`,
            }
            }).then(res => res.json())
            .then((data: {users: User[]}) => setUsers(data.users))
            .catch(() => setError("No se pudieron cargar los usuarios"))
            .finally(() => setIsLoading(false))
    }


    useEffect(() =>{
      fetchUsers()
    }, [])

    return (
      {users, isLoading, error, refetchUsers: fetchUsers}
    )
}