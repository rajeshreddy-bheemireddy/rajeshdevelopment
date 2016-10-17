/**
 * Site_menu.js
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

	  	/*** Categories of menu items ****/
	  	categories:{
	        collection: 'Categories',
	        through: 'site_menu_relation_categories',
	    },
  	},

  /*** Table name of mysql database to corresponding model ***/
  tableName :'vn_site_menu'
};

