import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { Chats } from "../../types/types";



const Chat = ({socket, username, room, imagePerfil}:{imagePerfil:any,socket:any, username:any, room:any}) =>{

    const [currentMessage, setCurrentMessage] = useState('')
    const [messagesList, setMessageList] = useState<Chats[] | []>([])

    const sendMessage = async () =>{
        if(username && currentMessage){
            const info = {
                message: currentMessage,
                room,
                author: username,
                time: new Date(Date.now()).getHours() + ":"
                 + new Date(Date.now()).getMinutes() 
            }

            await socket.emit("send_message", info)
            setMessageList((list)=>[...list, info])
            console.log(info.author +":" + info.message)
            setCurrentMessage('')
        }
    }

    useEffect(()=>{
        const messageHandle = (data: any) =>{
                setMessageList((list)=>[...list, data])
        }
        socket.on("receive_message", messageHandle)

        return () => socket.off("receive_message", messageHandle)
    },[socket])

    return(
        <>
        <div className="mainContainerChat">

            
            <section className="chat-header">

                <header className='headerperfilchat'>

                <div className='containerperfiltextchat'>
                    <strong style={{ opacity: username === "null" ? 0 : 1}} className='stnombreperfilchat'>{`${username}`}</strong>
                </div>

                <img className='imgperfilchat' src={`${imagePerfil}`}></img>
             
                
               </header>

            </section>   
          
             <section className="chatMessages">
                
                {
                    messagesList.map((item, i)=>{
                        return (
                        <span key={i}>
                        <div className="textmessagecontainer" style={{ alignItems: username===item.author ? 'end' : 'start', marginTop: username===item.author ? 5 : 10}} >

                            <div className="oneMessage" style={{textAlign: username===item.author ? 'right' : 'left', backgroundColor: username===item.author ? "#2f91e1" : '#f0f0f0'}}>
                            <p>{item.message}</p>
                            {/* <p>{item.author} </p> */}
                            <h4>{item.time}</h4>  
                            </div>

                        </div>
                        </span>
                        )
                    })
                }
            </section> 
           
            <section className="chatFooter">
                <input className="inputFooterChat" value={currentMessage} type="text" placeholder="Mensaje..."
                     onChange={e => setCurrentMessage(e.target.value)} 
                     onKeyPress={(e)=>{if( e.key === "Enter") {sendMessage()}}}  />
                     
                <button className="buttonFooterChat" onClick={sendMessage}><FontAwesomeIcon  icon={faPaperPlane}/></button>
            </section>
        </div>
        </>
    )
}

export default Chat