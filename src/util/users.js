const users = []

//adduser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    //Clean the data
    console.log(users)
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //Validate data
    if(!username || !room) {
        return {
            error: 'User name and romm are requerided!'
        }
    }

    //Check for existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    //Validate username
    if(existingUser) {
        return {
            error: 'This user name is in use!'
        }
    }

    //Store user
    const user = { id, username, room }
    users.push(user)
    console.log(users) 
    return { user }
}

const removeUser = (id) => {
    console.log(users)
    const index = users.findIndex((user) => user.id === id)
    console.log(index) 
    if(index !== -1) {
        console.log(users)
        const userDeleted = users.splice(index, 1)
        console.log(userDeleted)
        console.log(users) 
        return userDeleted[0] 
    }
}

const getUser = (id) => {
    return users.find((user) => {
        return user.id === id
    })
}

const getUsersInRoom = (roomName) => {
    return users.filter(user => user.room === roomName)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom    
}



