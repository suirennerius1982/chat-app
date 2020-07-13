const socket = io()

socket.on('countUpdate', (count) => {
    console.log(`The counter is ${count}`)
})

document.querySelector('#buttonCountUp').addEventListener('click', () => {
    console.log('send incremente to be process in the server...')
    socket.emit('increment')
})