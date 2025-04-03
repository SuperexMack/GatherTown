"use client"

import randomstring from "randomstring";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {

 const socket = useRef(null)
 const [newRoom , setNewRoom] = useState("")
 const router = useRouter()


 useEffect(()=>{
    socket.current = new WebSocket("ws://localhost:9000")

    socket.current.onopen = ()=>{
      console.log("Socket has been connected")
    }

    socket.current.onmessage = ((incomingdata)=>{
      try{
        let value = JSON.parse(incomingdata.data)
        if(value.location) setTimeout(()=> router.push(`gamefield/${value.location}`), 2000)
      }


      catch(error){
        console.log("Something went wrong while getting the data")
      }
      
    })

 },[])
 
  const generateKey = ()=>{
    let createRandom = randomstring.generate({
      charset:"alphabetic",
      length:8
    })
    return createRandom
  } 

  // Using the below code a new room will be created

  const createRoom = ()=>{
    let keyName = generateKey()
    console.log("Secret key is " + keyName)
    socket.current.send(JSON.stringify({room:keyName, RoomName : newRoom , type:"Create"}))
    alert("Req sent")
  }

  const joinRoom = ()=>{
    socket.current.send(JSON.stringify({room:newRoom , type:"Join"}))
    alert("Req sent")
  }

 

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center">

        <div className="w-[400px] h-auto p-6 bg-slate-100 shadow-2xl shadow-slate-400 rounded-lg flex flex-col items-center space-y-8">
          <h1 className="mt-4 font-bold text-[25px]">Room Details</h1>
          <input className="w-[80%] border-2 rounded-lg border-yellow-400 p-2" placeholder="John Doe"></input>
          <input onChange={(e)=>setNewRoom(e.target.value)} className="w-[80%] border-2 rounded-lg border-yellow-400 p-2" placeholder="Room Name"></input>
          
          <button onClick={createRoom} className="w-[80%]  bg-blue-600 p-2 rounded-lg font-bold text-white">Create Room</button>
          <button onClick={joinRoom} className="w-[80%]  bg-blue-600 p-2 rounded-lg font-bold text-white">Join Room</button>

        </div>

      </div>
    </>
  );
}
