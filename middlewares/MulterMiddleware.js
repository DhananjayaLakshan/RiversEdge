const multer = require("multer")
const {v4: uuidv4} = require("uuid")
const fs = require('fs');
const path = require("path")


// Configure multer storage and file name
const storage = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, "./public/uploads")
    },
    filename: function(req, file, cb){
        cb(null, `${uuidv4()}_${path.extname(file.originalname)}`)
    }
})

// Validate file types
const fileFilter = (req, file, cb) => {
    const allowedFileTypes =  ["image/jpeg", "image/jpg", "image/png"]

    if(allowedFileTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const uploadFields = [
    'imageUrl1',
    'imageUrl2',
    'imageUrl3',
    // Add more fields as needed
  ];

// Create middleware for single file upload
const uploadSingle = multer({ storage, fileFilter }).single("imageUrl");

// Create middleware for multiple file upload
const uploadMultiple = multer({ storage, fileFilter }).fields(uploadFields)

module.exports = {
    uploadSingle,
    uploadMultiple
};