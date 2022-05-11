const branchService = require('../Services/Branch');

const getAll = async () => {
  const branches = await branchService.get({}, {}, {});
  return branches;
};

module.exports = {
  getAll,
};
