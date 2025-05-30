"use client";

import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import { ChevronUp,ChevronDown} from 'lucide-react';
import { useParams } from "next/navigation";


export default function Game() {
  const gameRef = useRef(null);
  const [touched,setTouched] = useState(false)
  const [evenOdd , setEvenodd] = useState(2)
  const [mymessage , setMymessage] = useState("")
  const [allmessages , setAllmessages] = useState([])
  const [xposition , setXposition] = useState(512)
  const [yposition , setYposition] = useState(384)
  

  const socket = useRef(null)
  

  

  let {id} = useParams()
  
  console.log("id is :" + id)
  

 useEffect(()=>{
    socket.current = new WebSocket("ws://localhost:9000")

    socket.current.onopen = ()=>{
      console.log("Socket has been connected")
      if(id){
        socket.current.send(JSON.stringify({type:"Join" , room : id}))
      }
    }

    socket.current.onmessage = ((incomingdata)=>{
      console.log("Try se bahar")
      try{
        let value = JSON.parse(incomingdata.data)
        console.log("message aa gya")
        console.log("Received data on frontend:", value)
        if(value.type === "Chat"){
          setAllmessages(prev =>[
            ...prev,
            value.newMsg
          ])
        }
        if(value.type === "Move"){
          console.log("New Value :" + value.positionChangeX)
          console.log("New Value :" + value.positionChangeY)
          setXposition(value.positionChangeX)
          setYposition(value.positionChangeY)
        }
      }


      catch(error){
        console.log("Something went wrong while getting the data")
      }
      
    })

    

    return () => {
      console.log("Closing WebSocket connection...");
      socket.current.close();
    };

 },[])


 



  useEffect(() => {
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: 2000,
        height: 1000,
        parent: "game-container",
        backgroundColor: "#f9a131",
        physics: {
          default: "arcade",
          arcade: { gravity: { y: 0 }, debug: false },
        },
        scene: {
          preload,
          create,
          update,
        },
      };

      gameRef.current = new Phaser.Game(config);
    }

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, []);


  // Movement code 
 

  const changePosition = (posValueX, posValueY) => {
    if (socket.current) {
      console.log("Sending position:", posValueX, posValueY);
      socket.current.send(JSON.stringify({
        type: "Move",
        room: id,
        positionChangeX: posValueX, 
        positionChangeY: posValueY
      }));
    }
  };
  
  // Expose changePosition to the Phaser game
  useEffect(() => {
    window.changePosition = changePosition;
    window.remotePosition = { x: xposition, y: yposition };
  }, [xposition,yposition]);
  

  function preload() {
    this.load.image("road", "/images/wooden.jpg");
    this.load.image("building", "/images/gatt.png");
    this.load.image("player", "/images/lasstcc.png");
    this.load.image("newHouse" , "/images/houseTwo.png")
    this.load.image("firstTable" , "/images/firstTable.png")
    this.load.image("sofa" , "/images/sofa.png")
    this.load.image("bed" , "/images/bed.png")
    this.load.image("plant" , "/images/plant.png")
    this.load.image("stool" , "/images/stool.png")
    this.load.image("set" , "/images/set.png")
    this.load.image("sofat" , "/images/bluesofa.png")
    this.load.image("laptop" , "/images/laptop.png")
    this.load.image("tabletwo" , "/images/table.png")
    this.load.image("lamp" , "/images/lamp.png")
    this.load.image("kushon" , "/images/kushon.png")
    this.load.image("centerDesk" , "/images/centerdesk.png")
    this.load.image("secondchar" , "/images/secondchar.png")

  }

  function create() {
    // Background road
    this.add.tileSprite(512, 384, 2000, 1000, "road");

    // Physics group for buildings
    this.buildings = this.physics.add.staticGroup();

    // // Add buildings
    const table = [
      { x: 200, y: 200 },      
    ];
    
    const sofa = [
      {x:80,y:250}
    ]

    const bed = [
      {x:800 , y:-10},
      {x:1000 , y:-10},
      {x:1200 , y:-10},
      {x:1400 , y:-10}
    ]

    const plant = [
      {x:1200,y:800},
      {x:1280,y:800},
      {x:1360,y:800},
      {x:1420,y:800}
    ]

    const stool = [
      {x:1200,y:400}, // don't touch
      {x:1270,y:450},
      {x:1250,y:350}, // don't touch
      {x:1320,y:390}
    ]

    const wall = [
      {x:600,y:-20},      
    ]

    const sofaTwo = [
      {x:900 , y:700}
    ]

    const laptop = [
      {x:800 , y:730}
    ]

    const tabletwo = [
      {x:700,y:300}
    ]


    const lamp = [
      {x:200,y:800},
      {x:280 ,y:800},
      {x:400 ,y:800},
      {x:480 ,y:800},
      {x:560 ,y:800}
    ]

    const lappoSecond = [
      {x:250 , y:800},
      {x:340 ,y:800},
      {x:440 ,y:800},
      {x:520 ,y:800}
    ]
    
    const centerDesk = [
      {x:400,y:500}
    ]

    const kushon = [
      {x:400,y:420},
      {x:300,y:500},
      {x:400,y:580},
      {x:500,y:500},
    ]

    table.forEach((value)=>{
      let table = this.buildings.create(value.x , value.y , "firstTable").setScale(1.3)
      table.refreshBody()
    })

    sofa.forEach((pos)=>{
      let sofa = this.buildings.create(pos.x , pos.y , "sofa").setScale(0.8)
      sofa.refreshBody()
    })

    bed.forEach((value)=>{
      let bed = this.buildings.create(value.x,value.y,"bed").setScale(0.8)
      bed.refreshBody()
    })

    plant.forEach((value)=>{
      let plant = this.buildings.create(value.x,value.y,"plant").setScale(2)
      plant.refreshBody()
    })


    stool.forEach((value)=>{
      let stool = this.buildings.create(value.x,value.y,"stool").setScale(1)
      stool.refreshBody()
    })

    wall.forEach((value)=>{
      let walll = this.buildings.create(value.x,value.y,"set").setScale(1.3)
      // walll.setAngle(-800);
      walll.refreshBody()
    })

    sofaTwo.forEach((value)=>{
      let wal = this.buildings.create(value.x,value.y,"sofat").setScale(1.1)
      // walll.setAngle(-800);
      wal.refreshBody()
    })

    laptop.forEach((value)=>{
      let laptop = this.buildings.create(value.x,value.y,"laptop").setScale(1.1)
      // walll.setAngle(-800);
      laptop.refreshBody()
    })

    tabletwo.forEach((value)=>{
      let findTable = this.buildings.create(value.x,value.y,"tabletwo").setScale(0.25)
      findTable.refreshBody()
    })

    lamp.forEach((value)=>{
      let lamp = this.buildings.create(value.x,value.y,"lamp").setScale(0.5)
      lamp.refreshBody()
    })

    lappoSecond.forEach((value)=>{
      let lamppo = this.buildings.create(value.x,value.y,"laptop").setScale(0.9)
      lamppo.refreshBody()
    })

    centerDesk.forEach((value)=>{
      let centerDesk = this.buildings.create(value.x,value.y,"centerDesk").setScale(0.9)
      centerDesk.refreshBody()
    })

    kushon.forEach((value)=>{
      let kushon = this.buildings.create(value.x,value.y,"kushon").setScale(0.6)
      kushon.refreshBody()
    })
    

    

    // Player
    console.log("Value of Xpos is : " +  xposition)


    this.player = this.physics.add
      .sprite(512, 384, "player")
      .setScale(0.2)
      .setCollideWorldBounds(true);

    this.secondplayer = this.physics.add
    .sprite(500,384 , "secondchar")
    .setScale(0.2)
    .setCollideWorldBounds(true)

    // Add collision between player and buildings
    this.physics.add.collider(this.player, this.buildings);
    this.physics.add.collider(this.secondplayer , this.buildings)

    // Camera follows the player
    this.cameras.main.startFollow(this.player);

    // Controls
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  function update() {
  
    const speed = 500;

    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
    } 
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
    }


    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
    } 


    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
    }

    this.secondplayer.setPosition(window.remotePosition.x, window.remotePosition.y);
    
   if(this.player.lastX !== this.player.x || this.player.lastY !== this.player.y) {
      console.log("Position changed! X:", this.player.x, "Y:", this.player.y);
      window.changePosition(this.player.x, this.player.y);
      this.player.lastX = this.player.x
      this.player.lastY = this.player.y
    }
    
  }


  const caller = ()=>{
    setEvenodd((prev)=>prev+1)
    if(evenOdd%2!=0){
      console.log("other " + evenOdd)
      return setTouched(false)
    }
    else{
      console.log("other " + evenOdd)
      return setTouched(true)
    }
    
  }


  // Message Logic 

  const messageLogicBody = ()=>{
    socket.current.send(JSON.stringify({type:"Chat" , newMsg:mymessage , room:id}))
    setMymessage("")
  }

  const sendMessage = (e) => {
    if (e.key === "Enter") {
      messageLogicBody();
    }
    if (e.key === " ") {
      setMymessage(prev => prev + " ");
    }
  };
  
  

  return(
  <>
  <div id="game-container" className="flex flex-col justify-center items-center" style={{ width: "100%", height: "100%" }} >
  <div className={`bg-slate-200 hover:cursor-pointer w-[300px] ${touched ? "h-[300px] transition-all duration-500 ease-in-out" : "h-[30px] flex justify-center items-center transition-all duration-500 ease-in-out"} rounded-lg fixed left-[5%] mt-[600px] flex flex-col items-center`}>
      
      {touched ? (
        <>
      
      <div className="flex space-x-4 justify-center items-center">
      <h1 className="font-bold text-violet-600 mt-2">Chat Box!!</h1>
      <ChevronDown className="mt-2" onClick={caller}></ChevronDown>
      </div>

      {allmessages.length>0?(
        <>
          <div className="w-full h-[70%] overflow-y-auto flex flex-col space-y-2 p-4">
            {allmessages.map((value,index)=>(
              <h1 key={index} className="font-bold"><span className="text-red-500">User</span> - {value}</h1>
            ))}
          </div>
        
        <>
         <div className="w-[80%]">
          <input value={mymessage} onKeyDown={sendMessage} onChange={(e)=>setMymessage(e.target.value)} className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-violet-600 border-blue-700 " placeholder="Enter Thoughts"></input>
          </div>
        </>
      </>
      ):(
        <>
        <h1 className="font-bold text-[20px]">No chat found........</h1>
        <div className="w-[80%]">
          <input value={mymessage} onKeyDown={sendMessage} onChange={(e)=>setMymessage(e.target.value)} className="w-full p-2 border-2 rounded-lg focus:ring-2 focus:ring-violet-600 border-blue-700 " placeholder="Enter Thoughts"></input>
          </div>
        </>
      )}
      
     </>

      ) : (
        <>
        <div className="flex space-x-3 items-center">
        <h1 className="font-bold text-violet-700">Click here for live chat</h1>
        <ChevronUp onClick={caller}></ChevronUp>
        </div>
        </>
      )}
     

  </div>
  </div>
  </>
  )

}
