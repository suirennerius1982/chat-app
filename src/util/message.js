const generateMessage = (username, message) => {
    return {
        message,
        createAt: new Date().getTime(),
        username
    }
}
 
const generateLocationMessage = (username ,url) => {
    return {
        url,
        createAt: new Date().getTime(),
        username
    }
}

module.exports = {
    generateMessage,
    generateLocationMessage
}