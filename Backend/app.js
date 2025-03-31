const express = require("express")
const app = express()
require("dotenv").config()
const http = require("http")
const server = http.createServer(app)
const PORT = process.env.PORT
const RTCcontroller = require("./Controller/WebRTCBackend")


app.use(express.json())


app.get("/" , (req,res)=>{
    return res.json({msg:"Welcome to the V1 of the metaverse application"})
})

server.listen(PORT , ()=>{
    console.log(`Your server is running on the PORT number ${PORT}`)
    RTCcontroller(server)
})