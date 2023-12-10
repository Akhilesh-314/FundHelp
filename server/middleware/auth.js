import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('req autho', token);
    if (token) {
      jwt.verify(token, 'men secret', async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          req.user = null;
          next();
        } else {
          try {
            const user = await User.findById(decodedToken.userId);
            console.log(user);
            req.user = { userId: user._id }; // Attach the decoded user ID to req.user
            next();
          } catch (error) {
            console.log('user not found')
            console.error(error);
            req.user = null;
            next();
          }
        }
      });
    } else {
      req.user = null;
      next();
    }
  };

  export default authenticateToken;
