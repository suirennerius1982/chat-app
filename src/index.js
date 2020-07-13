const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

/* console.log(__dirname)
console.log(__filename) */

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

let count = 0

io.on('connection', (socket) => {
    console.log('New web socket connection...')
    socket.emit('countUpdate', count)

    socket.on('increment', () => {
        count++
        console.log(`send increment in ${count} to the client`)
        io.emit('countUpdate', count)
    })

})

server.listen(port, () => {
    console.log(`Server running in port ${port}`)
})