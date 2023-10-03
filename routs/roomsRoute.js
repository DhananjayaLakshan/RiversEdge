const express = require("express")// export express
const router = express.Router() //create router package
const uploadMiddleware = require("../middlewares/MulterMiddleware")
const Room = require('../models/room')//set path to roomsModel


//API end point
//async use becouse need to using try catch block

router.post("/addroom", uploadMiddleware.uploadSingle, async (req, res) => {

    try {

        //console.log(req.files)

        //Extract data from the request body
        const { name, rentperday, maxcount, description, type } = req.body
        const imageUrl = req.file.filename

        if(!name || !rentperday || !maxcount || !description || !type){
            return res.status(400).json({ error: 'Missing required fields.' })
        }

        const newRoom = new Room({
            name,
            rentperday,
            maxcount,
            description,
            type,
            imageUrl,
        })

        //Save the new room to the database
        await newRoom.save()

        res.status(201).json({ message: 'New Room Added Successfully' })
    } catch (error) {
        console.error(error)
        res.status(400).json({ error: 'Bad Request', message: error.message })
    }

})

router.get("/getallrooms", async (req, res) => {

    try {

        const rooms = await Room.find({}).sort({ createdAt: -1 })//it brings all rooms in mongoDB
        res.send(rooms)//if it success send rooms object

    } catch (error) {
        
        return res.status(400).json({ message: error })
    }

})


router.post("/getroombyid", async (req, res) => {

    const roomid = req.body.roomid

    try {
        const room = await Room.findOne({ _id: roomid })//it brings all rooms in mongoDB
        res.send(room)//if it success send rooms object
        
    } catch (error) {
        return res.status(400).json({ message: error })
    }

})





router.delete("/deleteRoom/:id", async (req, res) => {

    const roomid = req.params.id // Use req.params to access the roomID from the URL

    try {
        const room = await Room.findOneAndDelete({ _id: roomid })

        if (room) {
            res.send('Room details are deleted')
        } else {
            res.status(404).json({ error: 'Room not found' })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal server error' })
    }
})



router.put("/updateRoom/:id", uploadMiddleware.uploadSingle, async (req,res) => {

    try {
        const roomId = req.params.id
        const { name, type, rentperday, maxcount, description } = req.body
        const imageUrl = req.file ? req.file.filename : undefined // Check if a new image is provided
        

        // Construct the update object with provided data
        const updateData = {
                name, 
                type, 
                rentperday, 
                maxcount, 
                description,
        }

        // If a new image is provided, include it in the update data
        if (imageUrl) {
            updateData.imageUrl = imageUrl
        }

        // Use a database library (e.g., Mongoose) to update the room in the database
        const updatedRoom = await Room.findByIdAndUpdate(
            roomId,
            updateData,
            { new: true } // This ensures that the updated room is returned
        )

    if (!updatedRoom) {
            return res.status(404).json({ error: 'Room not found.' })
        }

        res.json(updatedRoom)
        
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Failed to update Room.' })
    }
})

module.exports = router
