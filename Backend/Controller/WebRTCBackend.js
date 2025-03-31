const {WebSocketServer} = require("ws")


let rooms = {};

    const mainFunction = (server)=>{
        const wss = new WebSocketServer({server})
        wss.on("connection" , function connection(ws){
            ws.on("message" , function getData(data){
                let alldata = JSON.parse(data)
                console.log("Everything is fine")
                console.log("Room key is " + alldata.room)
                console.log("Room Name is " + alldata.RoomName)
                console.log("Type of service is " + alldata.type)
                
                if(alldata.type === "Create"){
                   rooms[alldata.room] = []
                   rooms[alldata.room].push(ws);
                   ws.room = alldata.room
                   ws.send(JSON.stringify({location : alldata.room}))
                   console.log("Room created " + JSON.stringify(rooms[alldata.room]))
                }
                else if(alldata.type === "Join"){
                   rooms[alldata.room] = rooms[alldata.room] || []
                   rooms[alldata.room].push(ws);
                   ws.room = alldata.room
                }
                else if(alldata.type === "Chat"){
                    if(rooms[alldata.room]){
                        rooms[alldata.room].forEach((msg)=>{
                            msg.send(JSON.stringify({type : "Chat" , newMsg : alldata.mymsg , toRoom : alldata.room}))
                        })
                    }
                }
            })
        })
    }



module.exports = mainFunction
