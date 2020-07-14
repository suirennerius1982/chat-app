const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('#message-form').addEventListener('submit', (e) => {
    e.preventDefault()
    const message = e.target.elements.message.value
    socket.emit('sendMessage', message, (error) => {
        if (error) {
            return console.log(error)
        }
        console.log('The message was delivered!')
    })
})

document.querySelector('#buttonGeo').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geo not disponible to this browser!!!')
    }

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (message) => {
            console.log(`Location shared ${message}`)
        })
    })
})