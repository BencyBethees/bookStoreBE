const appilcationModel = require("../models/applicationModel"); //1

exports.applyJob = async (req, res) => {
  try {
    let { fullName, phoneNumber, email, jobId, jobRole } = req.body;
    let resume = req.file.filename;

    let existingApplication = await appilcationModel.findOne({ email, jobId });

    if (existingApplication) {
      //409 for conflict
      res.status(409).json({ message: "Already applied to the job role" });
    } else {
      //logic to apply
      let newApplication = new appilcationModel({
        fullName,
        phoneNumber,
        email,
        jobId,
        jobRole,
        resume,
      });

      await newApplication.save();
      res.status(201).json({ message: "Successfullt Applied", newApplication });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong in the server side" });
  }
};

exports.getAllApplications = async (req, res) => {
  try {
    let allApplications = await appilcationModel.find();
    res.status(200).json(allApplications);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong in the server side" });
  }
};
