const generateMessage = (message) => {
    return {
        message,
        createAt: new Date().getTime()
    }
}

const generateLocationMessage = (url) => {
    return {
        url,
        createAt: new Date().getTime()
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}