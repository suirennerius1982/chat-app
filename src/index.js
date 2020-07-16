const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { getMessage } = require('./util/message')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

io.on('connection', (socket) => {
    socket.emit('message', getMessage('Welcome!!!'))
    socket.broadcast.emit('message', getMessage('A new user has joined...'))
    
    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback(getMessage('Profany is not allowed!'))
        }
        io.emit('message', getMessage(message))
        //calback('Delivered confirmation server')
        callback()
    })

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', `https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
        callback('The server shared the location to other users!')
    })

    socket.on('disconnect', () => {
        io.emit('message', getMessage('A user has left....'))
    })
})

server.listen(port, () => {
    console.log(`Server running in port ${port}`)
})