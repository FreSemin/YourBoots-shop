const multer = require("multer");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValidType = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");

    if (isValidType) {
      error = null;
    }

    cb(error, `${process.env.CATALOG_IMAGES_PATH}images`);
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

module.exports = multer({ storage: fileStorage }).single("img");
