const express = require("express")
const router = express.Router()
const Booking = require("../models/booking")
const Room = require("../models/room")

router.post("/bookroom", async (req, res) => {
    //get parameters from URL
    const {
            room,
            userid,
            userName,
            email,
            address,
            phonenumber,            
            fromdate,
            todate,
            totalamount,
            totaldays, } = req.body

    try {

        //pass values to model 'means to the database'
        const newbooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            userName,
            email,
            address,
            phonenumber,
            fromdate,
            todate,
            totalamount,
            totaldays,
            transactionId: '1234'
        })


        const booking = await newbooking.save()

        const roomtemp = await Room.findOne({ _id: room._id })//fetch that booked room

        roomtemp.currentbookings.push({
            bookingid:  booking._id,
            fromdate:   fromdate,
            todate:     todate,
            userid:     userid,
            status:     booking.status
        })

        await roomtemp.save()

        res.send('Room Booked Successfully')

    } catch (error) {
        return res.status(400).json({ error })
    }
})



router.post("/getbookingsbyuserid", async (req, res) => {
    const userid = req.body.userid

    try {
        // Use the `sort` method to order the bookings by `createdAt` in descending order
        const bookings = await Booking.find({ userid: userid }).sort({ createdAt: -1 })
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })
    }
})




router.post("/cancelbooking", async (req, res) => {

    const { bookingid, roomid } = req.body

    try {
        //get booking and change status to cancel by finding booking id
        const bookingitem = await Booking.findOne({ _id: bookingid })
        bookingitem.status = 'cancelled'
        await bookingitem.save()

        //get room and delete the booking
        const room = await Room.findOne({ _id: roomid })
        const bookings = room.currentbookings

        //filter execept cancel booking id and save them to temp and save in current bookings
        const temp = bookings.filter(booking => booking.bookingid.toString() !== bookingid)
        room.currentbookings = temp
        await room.save()

        res.send('Your booking cancelled successfully')

    } catch (error) {
        return res.status(400).json({ error })
    }

})




//get all bookings from database
router.get("/getallbookings", async (req,res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 })
        res.send(bookings)
    } catch (error) {
        return res.status(400).json({ error })

    }
})

module.exports = router