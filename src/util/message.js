const getMessage = (message) => {
    return {
        message: message,
        createAt: new Date().getTime()
    }
}

module.exports = {
    getMessage
}