'use strict';

const db = require('../');
const Sequelize = require('sequelize');

const Student = db.define('student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  image: {
    type: Sequelize.STRING
  }
});

module.exports = Student;
