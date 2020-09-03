const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    // We can add some addtional information to request.  This info
    // will be used to add creator info to posts.
    req.userData = {email: decodedToken.email, userId: decodedToken.userId}
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
