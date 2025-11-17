import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// export async function register(req, res) {
//   try {
//     const username = req.body.username?.trim() || "";
//     const email = req.body.email?.trim().toLowerCase();
//     const password = req.body.password?.trim();

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email and password are required" });
//     }

//     const existing = await User.findOne({ email }).lean();
//     if (existing) {
//       return res
//         .status(409)
//         .json({ success: false, message: "Email already registered" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashed = await bcrypt.hash(password, salt);

//     const user = new User({ username, email, password: hashed });
//     await user.save();

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, {
//       expiresIn: JWT_EXPIRES_IN,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User created",
//       user: { id: user._id, username: user.username, email: user.email },
//       token,
//     });
//   } catch (err) {
//     console.error("Register error:", err);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// }
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Detail" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "enter a valid email" });
    }

    const existing = await User.findOne({ email }).lean();
    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: "Email already registered" });
    }

    //validating strong password
    if (password.length < 8) {
      return res.json({ success: false, message: "enter a strong password" });
    }
    //hashing user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = await User(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ user: false, message: "User does not exits" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// export async function login(req, res) {
//   try {
//     const email = req.body.email?.trim().toLowerCase();
//     const password = req.body.password?.trim();

//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Email and password are required" });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(401)
//         .json({ success: false, message: "user not found" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Invalid password  credentials" });
//     }

//     const token = jwt.sign({ id: user._id }, JWT_SECRET, {
//       expiresIn: JWT_EXPIRES_IN,
//     });

//     return res.json({
//       success: true,
//       message: "Logged in",
//       user: { id: user._id, username: user.username, email: user.email },
//       token,
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     return res
//       .status(500)
//       .json({ success: false, message: "Internal server error" });
//   }
// }

export async function me(req, res) {
  // req.user should be set by auth middleware
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated" });
  }
  const user = await User.findById(req.user.id).select("-password").lean();
  if (!user)
    return res.status(404).json({ success: false, message: "User not found" });
  return res.json({ success: true, user });
}
export { registerUser, loginUser };
