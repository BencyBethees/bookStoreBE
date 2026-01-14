const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, CallBack) => {
    CallBack(null, "./uploads");
  },
  filename: (req, file, CallBack) => {
    let date = Date.now();
    CallBack(null, `Bookstore-${date}-${file.originalname}`);
  },
});
const fileFilter = (req, file, CallBack) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    CallBack(null, true);
  } else {
    CallBack(null, false);
  }
};
const multerConfig = multer({ storage, fileFilter });

module.exports = multerConfig;
