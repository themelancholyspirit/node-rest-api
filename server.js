const express = require('express')
const app = express()
const port = 5000

let data = require('./data')

app.use(express.json())

app.get('/getUsers', (req, res) => {
    res.status(200).json(data)
})

app.get('/getUsers/:id', (req, res) => {
    const userID = Number(req.params.id);
    
    const user = data.find((user) => user.id === userID)

    if (user) return res.status(200).json(user)

    return res.status(404).json({msg: `no user with id ${userID} was found`})

})

app.put('/getUsers/:id', (req, res) => {

    const userID = Number(req.params.id)
    const userBody = req.body

    console.log(userBody)

    if (userID < 1 || userID > data.length) return res.status(404).json({msg: `no user with id ${userID} was found`})

    data = data.map((user) => {
        if (user.id === userID) return {...user, ...userBody}
        return user
    })

    res.status(200).json({msg: `user with id ${userID} has been updated successfully`})

})

app.post('/getUsers/', (req, res) => {
    const newUser = req.body

    data = [...data, newUser]

    res.status(200).json(newUser)
})

app.delete('/getUsers/:id', (req, res) => {
    const userID = Number(req.params.id)
    const initialLength = data.length

    data = data.filter((user) => user.id !== userID)

    if (data.length == initialLength) return res.status(404).json({msg: `no user with id ${userID} was found`})

    return res.status(200).json({msg: 'user was deleted successfully'})

})


app.listen(port, () => console.log(`server listening on port ${port}`))