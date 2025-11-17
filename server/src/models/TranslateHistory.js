import mongoose from "mongoose";

const TranslateHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, // assumes you have users
  title: { type: String, default: "" },
  // language: { type: String, default: "JavaScript" },
  Sourcelanguage: { type: String, required: true },
  Targetlanguage: { type: String, required: true },
  code: { type: String, required: true },
  // generic fields for different AI outputs:
  // reviewText: { type: String, default: "" }, // human-readable AI review (markdown)
  //   debuggedCode: {
  //     // optional structured debug output
  //     explanation: { type: String, default: "" },
  //     identifiedErrors: { type: [String], default: [] },
  //     suggestedFix: { type: String, default: "" },
  //   },convertedCode
  convertedCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// historySchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });
// module.exports = mongoose.model("Review", historySchema);
const TranslateHistory = mongoose.model(
  "TranslateHistory",
  TranslateHistorySchema
);

export default TranslateHistory;
