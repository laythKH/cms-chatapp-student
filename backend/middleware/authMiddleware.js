import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { UnAuthenticatedError } from "../errors/index.js";

const protect = async (req, res, next) => {
   let token;

   if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
   ) {
      try {
         token = req.headers.authorization.split(" ")[1];

         // console.log('========================================');
         // console.log(token);
         // console.log('========================================');

         // decodes token id
         const decoded = jwt.verify(token, process.env.JWT_SECRET)
         // console.log(decoded);
         req.user = await User.findById(decoded.id).select("-password")
         // console.log(req.user);
         next()
      } catch (error) {
         res.status(401)
         throw new UnAuthenticatedError("Not authorized, token failed")
      }
   }

   if (!token) {
      res.status(401)
      throw new UnAuthenticatedError('Not authorized, Not Token')
   }
}

export { protect }