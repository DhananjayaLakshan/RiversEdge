const express = require("express")
const router = express.Router()
const Services = require("../models/services")
const uploadMiddleware = require("../middlewares/MulterMiddleware")

router.post("/addService", uploadMiddleware.uploadSingle, async (req, res) => {

    try {
        const {title, description} = req.body
        const imageUrl = req.file.filename

        const newService = new Services({
            title,
            description,
            imageUrl,
        })
        await newService.save()

        res.send('New Service Added Successfully')

    } catch (error) {
        return res.status(400).json({ error })
    }

})

router.get("/getAllServices", async (req,res) => {

    try {

        const service = await Services.find()
        res.send(service)

    } catch (error) {

        return res.status(400).json({ error })
        
    }
})

router.delete("/deleteService/:servicesID", async (req, res) => {

    const servicesID = req.params.servicesID; // Use req.params to access the roomID from the URL

    try {
        const service = await Services.findOneAndDelete({ _id: servicesID });

        if (service) {
            res.send('Service details are deleted');
        } else {
            res.status(404).json({ error: 'Service not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/getServiceById", async (req, res) => {

    const servicesID = req.body.servicesID

    console.log(servicesID)

    try {
        const service = await Services.findOne({ _id: servicesID })//it brings all rooms in mongoDB
        res.send(service)//if it success send rooms object
        
    } catch (error) {
        return res.status(400).json({ message: error })
    }

})

router.put("/updateServices/:servicesID", uploadMiddleware.uploadSingle, async (req,res) => {

    try {
        const servicesID = req.params.servicesID
        const {title, description} = req.body
        const imageUrl = req.file.filename

        if(!title || !description){
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        const updateData = {
            title,
            description,
        }

        if (imageUrl) {
            updateData.imageUrl = imageUrl;
        }

        // Use a database library (e.g., Mongoose) to update the room in the database
        const updateService = await Services.findByIdAndUpdate(
            servicesID,
            updateData,
            { new: true } // This ensures that the updated room is returned
        )

    
        if (!updateService) {
            return res.status(404).json({ error: 'Package not found.' });
        }

        res.json(updateService);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update package.' });
    }
})

module.exports = router