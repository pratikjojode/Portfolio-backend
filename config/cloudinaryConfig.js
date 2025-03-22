const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
require("dotenv").config(); // Load environment variables

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ✅ Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Images", // Cloudinary folder where images will be stored
    format: async () => "jpeg", // Default format
    public_id: (req, file) =>
      `${Date.now()}-${file.originalname.split(".")[0]}`, // Unique file name
  },
});

// ✅ Multer Upload Middleware
const upload = multer({ storage });

module.exports = { cloudinary, upload };
