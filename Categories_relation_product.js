/**
 * Categories_relation_product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'MySqlConnection',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK : false,

  attributes: {

    vn_productcategories_vn_productvn_productcategories_ida : {
      model:'Categories',
    },

    vn_productcategories_vn_productvn_product_idb : {
      model:'Products',
    },

  },

  tableName : 'vn_productcategories_vn_product_c'
};

