const { ErrorConstructor } = require("../helpers/errors");

const roleMiddleware = async (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    next(new ErrorConstructor(403, "Do not have access"));
  }
    next()
};

module.exports = {
  roleMiddleware,
};
