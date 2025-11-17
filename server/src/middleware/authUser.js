// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import User from "../models/User.js";

// dotenv.config();

// const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";

// export default async function authMiddleware(req, res, next) {
//   try {
//     const auth = req.headers.authorization || req.headers.Authorization;
//     if (!auth || !auth.startsWith("Bearer ")) {
//       req.user = null;
//       return next();
//     }
//     const token = auth.split(" ")[1];
//     if (!token) {
//       req.user = null;
//       return next();
//     }
//     const payload = jwt.verify(token, JWT_SECRET);
//     if (!payload?.id) {
//       req.user = null;
//       return next();
//     }
//     req.user = { id: payload.id };
//     // optionally attach basic user data
//     const user = await User.findById(payload.id).select("-password").lean();
//     if (user) req.user = { id: user._id, username: user.username, email: user.email };
//     return next();
//   } catch (err) {
//     // on token error, clear user but continue (routes can enforce auth)
//     req.user = null;
//     return next();
//   }
// }
import jwt from "jsonwebtoken";

//User authentication middleware
const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // req.user = token_decode.id;
    req.user = { id: token_decode.id };
    // req.body.userId = token_decode.id; //we are adding user id while login we can see

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
