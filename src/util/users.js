const users = []

//adduser, removeUser, getUser, getUsersInRoom

const addUser = ({ id, username, room }) => {
    //Clean the data
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
    return { user }
}
  
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if(index !== -1) {
        const userDeleted = users.splice(index, 1)
        return userDeleted[0] 
    }
}

const getUser = (id) => {
    return users.find((user) => {
        return user.id === id
    })
}
    
const getUsersInRoom = (roomName) => {
    const usersResult = users.filter(user => user.room === roomName)
    return usersResult
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom    
}



