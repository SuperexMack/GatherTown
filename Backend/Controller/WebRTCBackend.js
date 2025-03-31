const {WebSocketServer} = require("ws")



    const mainFunction = (server)=>{
        const wss = new WebSocketServer({server})
        wss.on("connection" , function connection(ws){
            ws.on("message" , function getData(data){
                console.log("Everything is fine")
                console.log(JSON.parse(data))
            })
        })
    }



module.exports = mainFunction
