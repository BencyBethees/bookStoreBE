//importing express for router  1
const express = require("express");
const authController = require("./controllers/authController");
const jwtMiddleware = require("./middlewares/jwtMiddleware");

//creating new router from express  2
const router = new express.Router();
const bookController = require("./controllers/bookController");
const multerConfig = require("./middlewares/multerMiddleware");
const userController = require("./controllers/userController");
const jwtAdminMiddleware = require("./middlewares/jwtAdminMiddleware");
const jobController = require("./controllers/jobController");
const resumeMulterConfig = require("./middlewares/resumeMulterMiddleware");
const applicationController = require("./controllers/applicationController");
const purchaseController = require("./controllers/purchaseController");

router.post("/registerUser", authController.registerUser);
router.post("/loginUser", authController.loginUser);
router.post("/googleLogin", authController.googleLogAPI);
router.post(
  "/addBook",
  jwtMiddleware,
  multerConfig.array("uploadedImages"),
  bookController.AddBookController
);
router.get("/getBook", jwtMiddleware, bookController.GetBookController);
router.get("/getLimitedBooks", bookController.GetLimitedBook);
router.get("/getSingleBook/:id", jwtMiddleware, bookController.GetSingleBook);
router.get("/userDetails", jwtMiddleware, userController.getUserDetails);
router.patch(
  "/:id/updateProfile",
  jwtMiddleware,
  multerConfig.single("proPic"),
  userController.updateProfile
);
router.get("/getAllUsers", jwtAdminMiddleware, userController.getAllUsers);
router.post("/addJob", jwtAdminMiddleware, jobController.addJob);
router.get("/getAllJobs", jobController.getJobs);
router.delete("/:id/deleteJob", jwtAdminMiddleware, jobController.deleteJob);
router.post(
  "/applyJob",
  resumeMulterConfig.single("resume"),
  applicationController.applyJob
);
router.get(
  "/getAllApplications",
  jwtAdminMiddleware,
  applicationController.getAllApplications
);
router.post("/buyBook", jwtMiddleware, purchaseController.buyBook);
//3
// router.get("/getInfo", dummyController.getDetails);

//default exporting  5
module.exports = router;
