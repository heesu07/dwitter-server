import SQ from 'sequelize';
import { sequelize } from '../db/database.js';

const Datatypes = SQ.DataTypes;

export const User = sequelize.define('user', {
  id: {
    type: Datatypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Datatypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: Datatypes.STRING(128),
    allowNull: false,
  },
  name: {
    type: Datatypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: Datatypes.STRING(128),
    allowNull: false,
  },
  url: {
    type: Datatypes.TEXT,
  },
}, {
  timestamps: false
})

export async function findByUsername(username) {
  return User.findOne({ where: { username } })
}

export async function findById(id) {
  return User.findByPk(id)
}

export async function createUser(user) { // return user.id
  return User.create(user)
    .then(data => {
      return data.getDataValue.id;
    });
}
