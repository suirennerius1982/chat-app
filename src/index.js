const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter = require('bad-words')
const { generateMessage, generateLocationMessage } = require('./util/message')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./util/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
  
io.on('connection', (socket) => {

    socket.on('join', (options, callback) => {
        const { user, error } = addUser({id: socket.id, ...options})

        if (error) {
            return callback(error)
        }


        socket.join(user.room)
        socket.emit('message', generateMessage('System Admin', 'Welcome!!!'))
        socket.broadcast.to(user.room).emit('message', generateMessage('System Admin', `${user.username} has joined!`))
        callback()

        //socket.emit, io.emit (particular user), socket.broadcast.emit
        //io.to.emit, socket.broadcast.to.emit
    })

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter()
        if (filter.isProfane(message)) {
            return callback(generateMessage('Profany is not allowed!'))
        }
        const user = getUser(socket.id)
        io.to(user.room).emit('message', generateMessage(user.username, message))
        //calback('Delivered confirmation server')
        callback()
    })
 
    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)
        io.to(user.room).emit('locationMessage', generateLocationMessage(user.username, `https://google.com/maps?q=${coords.latitude},${coords.longitude}`))
        callback('The server shared the location to other users!')
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage('System Admin', `${user.username} has left!`)) 
        }
    })
})

server.listen(port, () => {
    console.log(`Server running in port ${port}`)
})