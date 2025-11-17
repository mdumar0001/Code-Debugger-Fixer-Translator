function asyncHandler(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default asyncHandler;
export { asyncHandler };
// Also provide CommonJS compatibility for files using require()
try { module.exports = asyncHandler; } catch (e) {}