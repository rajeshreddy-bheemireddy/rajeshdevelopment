/**
 * Site_menu_relation_categories.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

/***  Connection name  ***/
  connection: 'MySqlConnection',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  /*** Required attributes ***/
  attributes: {

    vn_site_menu_vn_productcategories_1vn_site_menu_ida : {
      model:'Site_menu',
    },

    vn_site_menu_vn_productcategories_1vn_productcategories_idb : {
      model:'Categories',
    },
    
  },

 /*** Table name of mysql database to corresponding model ***/
  tableName :'vn_site_menu_vn_productcategories_1_c'
};
