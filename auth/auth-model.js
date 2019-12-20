const db = require('../database/dbConfig');
const jwt = require('jsonwebtoken');

module.exports = {
  all,
  create,
  findBy,
  signToken
};

function all() {
  return db('users')
};

function create(user) {
  return db('users').insert(user)
};

function findBy(filter) {
  return db('users').where(filter)
};

function signToken(user) {
  const payload = {
    subject: user.id
  };
  const secret = process.env.JWT_SECRET || "senorita potatito del peru";
  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secret, options)
}