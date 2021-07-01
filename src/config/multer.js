const multer = require('multer');
const path = require('path');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, process.env.IMAGES_DIR);
  },
  filename(req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, `${file.fieldname}-${uniqueSuffix}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: parseInt(process.env.IMAGES_MAXSIZE, 10),
  },
  fileFilter(req, file, cb) {
    if (!path.extname(file.originalname).match(/\.(jpg|png|jpeg|JPG|PNG|JPEG)$/)) {
      return cb(new ApiError(httpStatus.BAD_REQUEST, 'File format is not allowed'));
    }
    cb(null, true);
  },
});

module.exports = upload;
