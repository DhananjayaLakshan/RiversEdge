const express = require("express")
const cors = require("cors")
require("dotenv").config()

const app = express()


//set path to route
const dbConfig      = require('./db')
const roomsRoute    = require('./routs/roomsRoute')
const usersRoute    = require('./routs/userRoute')
const bookingRoute  = require('./routs/bookingsRoute')
const packageRoute  = require('./routs/packagesRoute')
const serviceRoute  = require('./routs/servicesRoute')


//receve para in body
app.use(express.json())
app.use(express.static("public"))

//create access to roomsRoute
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)
app.use('/api/bookings', bookingRoute)
app.use('/api/package', packageRoute)
app.use('/api/service', serviceRoute)

const port = process.env.PORT || 5000

app.listen(port, () => console.log( `Server running on ${port} using nodemon`))