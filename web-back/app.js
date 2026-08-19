import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"
import  SignUp from "./routes/signup.js"
import Login from "./routes/login.js"
import SignOut from "./routes/signout.js"
import RefreshToken from "./routes/refreshToken.js"
import AuthenticateToken from "./auth/authenticate.js"
import Perfil from "./routes/perfil.js"
import Notes from "./routes/notes.js"
import AdminPage from "./routes/admin.js"
import { Server } from "socket.io"
import { createServer } from "node:http"

dotenv.config()

const app = express()
const port = process.env.PORT || 3100 


app.use(cors())
app.use(express.json())

const server = createServer(app)
const io = new Server(server,{
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    },
    connectionStateRecovery:{}
})

io.on('connection', (socket) =>{
    console.log(`usuario actual: ${socket.id}`)

    socket.on("join_room",(data)=>{
        socket.join(data)
        console.log(`usuario con id: ${socket.id} se unio a la sala ${data}`)
    })

    socket.on("send_message",(data)=>{
       socket.to(data.room).emit("receive_message", data)
    })

    socket.on("disconnect", ()=>{
        console.log("Usuario desconectado", socket.id)
    })
})

async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
    console.log("connected to mongoDB")
}

main().catch(console.error)

app.use("/api/signup", SignUp)  
app.use("/api/login", Login)
app.use("/api/signout", SignOut)
app.use("/api/refresh-token", RefreshToken)
app.use("/api/perfil", AuthenticateToken, Perfil) 
app.use("/api/notes", AuthenticateToken, Notes) 
app.use("/api/adminpage", /*  AuthenticateToken, */ AdminPage)


app.get("/", (req, res)=>{
    res.send('hello')
})

server.listen(port,()=>{
    console.log(`server is running on port: ${port}`)
})
