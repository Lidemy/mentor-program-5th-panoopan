/* eslint-disable */

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'Articles', // 要添加外鍵的 table
      'userName', // 外鍵欄位名稱
      {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'Users', // 引用的 table
          key: 'username', // 引用的欄位
        },
        onUpdate: 'CASCADE', // 外鍵約束
        onDelete: 'RESTRICT', // 這邊如果用 SET NULL 會與上面 allowNull: false 衝突，所以用 RESTRICT
      }
    );
  },

  down: async (queryInterface, Sequelize) => {

  }
};
