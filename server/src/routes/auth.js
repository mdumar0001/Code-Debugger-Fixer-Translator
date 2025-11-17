// import express from "express";
// import * as authController from "../controllers/authController.js";
// import asyncHandler from "../utils/asyncHandler.js";

// const router = express.Router();

// // support multiple export styles: named exports, default export object, or single default function
// const registerHandler =
//   authController.register ??
//   authController.default?.register ??
//   authController.default ??
//   (req, res) => res.status(501).json({ success: false, message: "register not implemented" });

// const loginHandler =
//   authController.login ??
//   authController.default?.login ??
//   authController.default ??
//   (req, res) => res.status(501).json({ success: false, message: "login not implemented" });

// const meHandler =
//   authController.me ??
//   authController.default?.me ??
//   (req, res) => res.status(501).json({ success: false, message: "me not implemented" });

// // Route for user registration
// router.post("/register", asyncHandler(registerHandler));

// // Route for user login
// router.post("/login", asyncHandler(loginHandler));

// // Route for getting current user
// router.get("/me", asyncHandler(meHandler));

// export default router;
// const registerHandler =
//   authController.register ||
//   (authController.default && authController.default.register) ||
//   authController.default ||
//   ((req, res) =>
//     res
//       .status(501)
//       .json({ success: false, message: "register not implemented" }));

// const loginHandler =
//   authController.login ||
//   (authController.default && authController.default.login) ||
//   authController.default ||
//   ((req, res) =>
//     res.status(501).json({ success: false, message: "login not implemented" }));

// const meHandler =
//   authController.me ||
//   (authController.default && authController.default.me) ||
//   authController.default ||
//   ((req, res) =>
//     res.status(501).json({ success: false, message: "me not implemented" }));

// export default router;
import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
// import * as authController from "../controllers/authController.js";
// import asyncHandler from "../utils/asyncHandler.js";

const router = express.Router();

// Routes using named exports directly
router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get("/me", asyncHandler(authController.me));

export default router;
