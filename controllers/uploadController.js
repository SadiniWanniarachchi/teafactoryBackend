const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();


const uploadFile = async (req, res) => {
    try {
        // upload file to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: `Teafactory/${req.file.filename}`,
            folder: "Teafactory",
            use_filename: true,
            unique_filename: false,
        });

        res.status(200).json(result);

        fs.unlinkSync(req.file.path); // remove file from server
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

module.exports = { uploadFile };