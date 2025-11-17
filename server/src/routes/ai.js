// import express from "express";
// import {
//   debugCode,
//   translateCode,
//   suggestCode,
// } from "../controllers/aiController.js";
// import { authMiddleware } from "../middleware/auth.js";

// const router = express.Router();

// // Route for debugging code
// router.post("/debug", authMiddleware, debugCode);

// // Route for translating code
// router.post("/translate", authMiddleware, translateCode);

// // Route for suggesting code improvements
// router.post("/suggest", authMiddleware, suggestCode);

// export default router;
// import express from "express";
// import aiController from "../controllers/aiController.js";
// import { authMiddleware } from "../middleware/auth.js";

// const router = express.Router();

// router.post("/debug", authMiddleware, aiController.debug);
// router.post("/translate", authMiddleware, aiController.translate);

// export default router;
import express from "express";
import aiController from "../controllers/aiController.js";
// import authMiddleware from "../middleware/authUser.js"; // default import
import authUser from "../middleware/authUser.js";
const router = express.Router();

// router.post("/debug", authMiddleware, aiController.debug);
router.post("/debug", authUser, aiController.debug);
router.post("/translate", authUser, aiController.translate);
// router.post("/debug-code-enhanced", aiController.debugCode);

export default router;
