/**
 * Categories.js
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

	  	name: {
	  		type:'string',
	  		required: true,
	  	},
	  	parent_category: {
	  		type:'string',
	  		required: true,
	  	},

	  	productlist:{
        collection: 'Products',
        through: 'categories_relation_product',
    	},
	  	
  	},

  /*** Table name of mysql database to corresponding model ***/
  tableName :'vn_productcategories'
};
