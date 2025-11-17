// import mongoose from "mongoose";

// const historySchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   code: {
//     type: String,
//     required: true,
//   },
//   action: {
//     type: String,
//     enum: ["debug", "translate"],
//     required: true,
//   },
//   result: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const History = mongoose.model("History", historySchema);

// export default History;
import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // assumes you have users
  title: { type: String, default: "" },
  // language: { type: String, default: "JavaScript" },
  language: { type: String, required: true },
  code: { type: String, required: true },
  // generic fields for different AI outputs:
  // reviewText: { type: String, default: "" }, // human-readable AI review (markdown)
  debuggedCode: {
    // optional structured debug output
    explanation: { type: String, default: "" },
    identifiedErrors: { type: [String], default: [] },
    suggestedFix: { type: String, default: "" },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// historySchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });
// module.exports = mongoose.model("Review", historySchema);
const History = mongoose.model("History", historySchema);

export default History;
