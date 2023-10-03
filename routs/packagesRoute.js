const express = require("express")
const router = express.Router()
const Packages = require("../models/package")
const uploadMiddleware = require("../middlewares/MulterMiddleware")



router.post("/addPackage", uploadMiddleware.uploadSingle, async (req, res) => {

    try {
        // Extract data from the request body
        
        const { name, price, description } = req.body;
        const imageUrl = req.file.filename

        // Create a new package with the extracted data
        const newPackage = new Packages({
            name,
            price,
            description,
            imageUrl,
        })

        await newPackage.save()

        res.send('New Package Added Successfully')

    } catch (error) {
        return res.status(400).json({ error })
    }

})

router.get("/getAllPackages", async (req, res) => {
    try {
        const packages = await Packages.find()
        res.send(packages)
    } catch (error) {
        return res.status(400).json({ error })

    }
})

router.delete("/deletePackages/:packageID", async (req, res) => {

    const packageId = req.params.packageID; // Use req.params to access the roomID from the URL

    try {
        const package = await Packages.findOneAndDelete({ _id: packageId });

        if (package) {
            res.send('Package details are deleted');
        } else {
            res.status(404).json({ error: 'Package not found' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post("/getPackageById", async (req, res) => {

    const packagesID = req.body.packagesID

    console.log(packagesID)

    try {
        const pkg = await Packages.findOne({ _id: packagesID })//it brings all rooms in mongoDB
        res.send(pkg)//if it success send rooms object

    } catch (error) {
        return res.status(400).json({ message: error })
    }

})

router.put("/updatePackage/:packageID", uploadMiddleware.uploadSingle, async (req, res) => {
    try {
        const packageID = req.params.packageID;
        const { name, description, price } = req.body;
        const imageUrl = req.file ? req.file.filename : undefined; // Check if a new image is provided

        // Check if required fields are missing
        if (!name || !description || !price) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        // Construct the update object with provided data
        const updateData = {
            name,
            description,
            price,
        };

        // If a new image is provided, include it in the update data
        if (imageUrl) {
            updateData.imageUrl = imageUrl;
        }

        // Use a database library (e.g., Mongoose) to update the package in the database
        const updatedPackage = await Packages.findByIdAndUpdate(
            packageID,
            updateData,
            { new: true } // This ensures that the updated package is returned
        );

        if (!updatedPackage) {
            return res.status(404).json({ error: 'Package not found.' });
        }

        res.json(updatedPackage);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update package.' });
    }
});




module.exports = router
