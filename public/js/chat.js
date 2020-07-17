const socket = io()

//elements
const $formMessage = document.querySelector('#message-form')
const $buttonSendMessage = $formMessage.querySelector('#buttonSendMenssage')
const $inputMessage = $formMessage.querySelector('#message')
const $buttonGeo = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

//templates 
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML
//Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
 
socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        message: message.message,
        createAt: moment(message.createAt).format('hh:mm:a'),
        username: message.username
    })
    $messages.insertAdjacentHTML('beforeend', html)
})
 
socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationTemplate, {
        url: message.url,
        createAt: moment(message.createAt).format('hh:mm:a'),
        username: message.username
    })
    $messages.insertAdjacentHTML('beforeend', html)
})
 
socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    console.log(html) 
    document.querySelector("#sidebar").innerHTML = html
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
        }, (url) => {
            $buttonGeo.removeAttribute('disabled')
            console.log(`Location shared ${url}`)
        })
    })
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        location.href= '/'
    }
})
 