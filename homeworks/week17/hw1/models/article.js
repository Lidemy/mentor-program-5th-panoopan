/* eslint-disable */

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User, {
        foreignKey: 'userName'
      })
    }
  };
  Article.init({
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    is_deleted: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};