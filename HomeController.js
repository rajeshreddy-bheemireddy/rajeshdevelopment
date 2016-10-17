/**
 * HomeController
 *
 * @description :: Server-side logic for managing home page and display content in home page.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	homepageload: function (req,res,next) {

	/****Call to service to get menu and categoreis of menu ****/
		MenuService.getMenuData(function(err, menu_categories){		
			MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){
				//Call Model to get homepage products
				Products_homepage.find({deleted:0}).where({sitemenu_id: {'!': null}}).exec(function(err,homepageproducts){
					/**** Append variables to view ****/
					res.view('home/index' ,{'menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories,'homepageproducts':homepageproducts});

				});

			});
		});
	},
	/**** Function to call products based on selected category in home page ****/
	homepage_category_products: function(req,res,next){
		var data = req.param('category_id');
		//find subcategories ids using category id
		Categories.find({deleted:0}).where({parent_category:data}).exec(function(err,categoriesids){
			var subcatids = [];
			var count = 0;
			categoriesids.forEach(function(category, index){
				if(count < 8){
					subcatids.push(category.id);
				}
				count++;
			});
			/*** Get products of selected category ***/
			Categories.find({deleted:0}).where({id:subcatids}).populate('productlist',{where:{deleted:0},limit:1}).exec(function(err,subproducts){
				return res.json(subproducts);
			});
		});
		
	},
	
};

