const express = require('express')
const path = require('path')

const app = express()

const port = process.env.PORT || 3000

console.log(__dirname)
console.log(__filename)

const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))

app.listen(port, () => {
    console.log(`Server running in por ${port}`)
})