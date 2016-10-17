/**
 * Products_homepage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'MySqlConnection',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {

    name : {
        type: 'text',
        required:true,
    },

    description : {
        type: 'text',
    },

    product_image:{
      type:'text',
    },

    cost:{
       type:'float',
    },

    price:{
       type:'float',
    },
     sitemenu_id:{
       type:'string',  
    },

  },

  tableName : 'vn_product'
};

