const express = require('express')
const https = require("https")
const socketIo = require("socket.io")
const index = require("./routes/index");
const fs = require("fs")

const options = {
	key: fs.readFileSync("/home/ec2-user/Thyme/key.pem"),
	cert: fs.readFileSync("/home/ec2-user/Thyme/cert.pem")
}

const port = process.env.PORT || 8000

const app = express()
app.use(index)

const server = https.createServer(options, app)
const io = socketIo(server)

io.on('connection', (socket) => {
    socket.on('new message', (message, author) => {
        io.emit('new message', (message, author))
    })
})

server.listen(port, () => {console.log("listening on port " + port)})
