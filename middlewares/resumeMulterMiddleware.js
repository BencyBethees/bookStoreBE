//import multet 1
const multer = require("multer");

//disc storage 2
//storage 2.0
//filename 2.1
const storage = multer.diskStorage({
  destination: (req, file, CallBack) => {
    CallBack(null, "./uploads");
  },
  filename: (req, file, CallBack) => {
    let date = Date.now();
    CallBack(null, `Bookstore-resume-${date}-${file.originalname}`);
  },
});

//filefilter 3
const filefilter = (req, file, CallBack) => {
  if (file.mimetype == "application/pdf") {
    CallBack(null, true);
  } else {
    CallBack(null, false);
  }
};

const resumeMulterConfig = multer({ storage, filefilter });

module.exports = resumeMulterConfig;
