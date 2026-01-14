const jwt = require("jsonwebtoken");

//token is passed from client to server authorizstion key in request headers

//bearer token ey-

//we user bearer token here,so we need to remove the bearer keyword and seperate fokens from it
//since it is already

const jwtMiddleware = (req, res, next) => {
  //token is passed from cilent to server via request headers in authorization key in request method
  let token = req.headers.authorization.split(' ')[1];

  try {
    if (token) {
      let decodedData = jwt.verify(token, process.env.jwtsecretKey);

      if (decodedData) {
        req.user = decodedData.email;

        next();
      } else {
        res.status(401).json({ message: " invalid token, please login" });
      }
    } else {
      res.status(401).json({ message: "token is required ,please login" });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message:
        "something went wrong while validateing the token, please try login again",
    });
  }
};
module.exports = jwtMiddleware;
