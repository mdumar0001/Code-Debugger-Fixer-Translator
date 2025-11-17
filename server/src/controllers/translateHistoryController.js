// import History from "../models/History.js";
import TranslateHistory from "../models/TranslateHistory.js";
const getPasHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const docs = await TranslateHistory.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    // return minimal fields for sidebar
    const list = docs.map((d) => ({
      id: d._id,
      title: d.title || d.code.slice(0, 40),
      code: d.code,
      // reviewText: d.reviewText,
      convertedCode: d.convertedCode,
      createdAt: d.createdAt,
    }));
    // return res.json(list);
    console.log("TranslateHistory List:", list.length);
    return res.json({ success: "true", list });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
const deleteHistoryItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    await TranslateHistory.deleteOne({ _id: id, userId });
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
export { getPasHistory, deleteHistoryItem };
