const socket = io()

//elements
const $formMessage = document.querySelector('#message-form')
const $buttonSendMessage = $formMessage.querySelector('#buttonSendMenssage')
const $inputMessage = $formMessage.querySelector('#message')
const $buttonGeo = document.querySelector('#buttonGeo')
const $messages = document.querySelector('#messages')

//templates
const messageTemplate = document.querySelector('#message-template').innerHTML

socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message
    })
    $messages.insertAdjacentHTML('beforeend', html)
})

$formMessage.addEventListener('submit', (e) => {
    e.preventDefault()
    $buttonSendMessage.setAttribute('disabled', 'disabled')
    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, (error) => {
        $buttonSendMessage.removeAttribute('disabled')
        $inputMessage.value = ''
        $inputMessage.focus()

        if (error) {
            return console.log(error)
        }
        console.log('The message was delivered!')
    })
})

$buttonGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geo not disponible to this browser!!!')
    }

    $buttonGeo.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, (message) => {
            $buttonGeo.removeAttribute('disabled')
            console.log(`Location shared ${message}`)
        })
    })
})