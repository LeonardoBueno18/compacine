
const Session = require('../models/Session');

exports.create = async (data) => {
  const session = new Session(data);
  await session.save();
  return session;
};

exports.findAll = async () => {
  return await Session.find();
};

exports.findById = async (id) => {
  return await Session.findById(id);
};

exports.findMany = async (ids) => {
  return await Session.find({ _id: { $in: ids } });
};