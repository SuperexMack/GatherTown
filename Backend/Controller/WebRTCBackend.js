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
                console.log("The chat name is : " + alldata.newMsg)
                console.log("Positon x is " + alldata.positionChangeX)
                
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
                   ws.send(JSON.stringify({location : alldata.room}))
                   ws.room = alldata.room
                }
                else if(alldata.type === "Chat"){
                    if(rooms[alldata.room]){
                        console.log("aa gya call")
                        rooms[alldata.room].forEach((msg)=>{
                            msg.send(JSON.stringify({type : "Chat" , newMsg : alldata.newMsg , room : alldata.room}))
                        })
                    }
                }

                else if(alldata.type === "Move") {
                    if(rooms[alldata.room]) {
                      console.log("Movement update received:", alldata.positionChangeX, alldata.positionChangeY);
                      rooms[alldata.room].forEach((client) => {
                          console.log("Move ka done")
                          if(client != ws){
                          client.send(JSON.stringify({
                            type: "Move", 
                            room: alldata.room, 
                            positionChangeX: alldata.positionChangeX, 
                            positionChangeY: alldata.positionChangeY
                          }));
                        }
                      });
                    }
                  }
            })
        })
    }



module.exports = mainFunction
