/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	 //*****  Singup new user details method ******//
	signupuser: function (req,res,next) {
	          MenuService.getMenuData(function(err, menu_categories){

				MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){

	           res.view('home/singup',{'message':'','menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories});
		   });
	    });
	  
	 },
	  

	  //*****  Login user details method ******//
	loginuser: function (req,res,next) {

		/****Call to service to get menu and categoreis of menu ****/
		MenuService.getMenuData(function(err, menu_categories){

			MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){


				/**** Append variables to view ****/
				res.view('home/login' ,{'menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories,'user':''});

			});
		});
		
	  },

	  //****** Save new user details ******//
	signupuserdetails: function (req,res,next) {
  
		// var request=sails.controllers.request;
		var data = req.allParams();
		//console.log(data);
		  /***** Call external api to save new user data ****/
		ApiResponseService.apicall(req, res, "http://localhost/ecommerce_site/api/public/signup", "POST", data, function(response){
			
			var resdata = JSON.parse(response);

			 if(resdata.data=='true'){
			 	return res.redirect('/login');
			 } else{
				return res.redirect('/signup');
			 }
			
		  });		
	  },

	  //****** Login user ******//
	loginuserdetails: function(req, res, next) {
		 /**  get parameters of username and password **/
		  var data = req.allParams();
		  
			/****Call to service to get menu and categoreis of menu ****/
				MenuService.getMenuData(function(err, menu_categories){

					MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){
						//Call Model to get homepage products
						Products_homepage.find({deleted:0}).where({sitemenu_id: {'!': null}}).exec(function(err,homepageproducts){

						/***** Call external api to check user login ****/
						  ApiResponseService.apicall(req, res, "http://localhost/ecommerce_site/api/public/signin/login", "POST", data, function(response){
							
							 var resdata = JSON.parse(response);	
							//console.log(resdata.data);					
								if(resdata.data=='False'){
								  		res.view('home/login',{'menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories,'user':'Incorrect details'});
								
									}else{
									  //On sucessful login assign user to session*///
								  		req.session.currentuser = resdata.data;
								 		 res.view('home/index',{'menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories,'homepageproducts':homepageproducts,'user':resdata.data});
									}
						  });
		  
		 				 });
						
					});
				});
		

		},
		changepass:function(req,res,next){
		//res.ok(req.allParams());
		var data = req.allParams();
		MenuService.getMenuData(function(err, menu_categories){

					MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){
		ApiResponseService.apicall(req,res,"http://localhost/ecommerce_site/api/public/signin/updatepwd/c45256fa-bee7-99c9-b10a-574833339e4a","POST",data,function(responsedata){
         //console.log(responsedata);
			res.view('home/passwordchange',{'menudata':'','menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories});
	
		       });
		    });
						
     	});
	},

	createaddress:function(req,res,next){
		  /*** call external api and create user adress**/
		  var data = req.allParams();
		  MenuService.getMenuData(function(err, menu_categories){

					MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){
	    ApiResponseService.apicall(req, res, "http://localhost/ecommerce_site/api/public/addressrest", "POST",data,  function(response){
			//console.log(response);
          return res.redirect('/viewuseraddress');
      });
	       });
		    });
				
	},

	viewaddress:function(req,res,next){
		 /*** fetching user address using call external api with session userid**/
		 var userid = req.param('id');
		 MenuService.getMenuData(function(err, menu_categories){

					MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){
		 ApiResponseService.apicall(req, res, "http://localhost/ecommerce_site/api/public/addressapi/useraddress/818b8615-cdc6-f68b-2d8f-574c2413463d","GET",'userid', function(response){
       //console.log(response);
       res.view('home/address',{'alladdress':JSON.parse(response),'menudata':'','menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories});
      }); 
	       });
		    });
				
	}, 

	deleteuseraddress:function(req,res,next){
		MenuService.getMenuData(function(err, menu_categories){

					MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){
		/*** delete useraddress using call external api**///
		 var addressid = req.param('id');
		 ApiResponseService.apicall(req, res, "http://localhost/ecommerce_site/api/public/addressrapi/deleteadd/"+addressid,"PUT",addressid, function(response){
		   return res.redirect('/viewuseraddress');
     // res.view('homepage/address',{'alladdress':response,'menudata':''});
	  
      }); 
	       });
		    });
				
	},
	
	getaddress:function(req,res,next){
		MenuService.getMenuData(function(err, menu_categories){

					MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){
		//console.log("deedreqdfq");
		 /*** fetching user address using call external api with session userid**/
		 var addressid = req.param('id');
		 //console.log("http://localhost/ecommerce_site/api/public/addressrest/"+addressid);
		 ApiResponseService.apicall(req, res, "http://localhost/ecommerce_site/api/public/addressrest/"+addressid,"GET",'addressid', function(responsed){
			
	   
	    //res.view('homepage/address',{'alladdress':JSON.parse(responsed),'menudata':''});
       res.view('home/editaddress',{'addressdata':JSON.parse(responsed),'menudata':'','menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories});
      });
	       });
		    });
				
	}, 
	
	
	
	viewallorders:function(req,res,next){
		MenuService.getMenuData(function(err, menu_categories){

					MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){
		///**** showing all orders using call external api ****////
		 //var userid = req.param('id');
		// console.log(userid);
		 ApiResponseService.apicall(req, res, "http://localhost/ecommerce_site/api/public/order/recent/179bb1f6-12f3-4f10-80f8-572c77663074","GET",'oo', function(response){
		//console.log(response);
		res.view('home/orders',{'vieworder':JSON.parse(response),'menudata':'','menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories});
	    }); 
		     });
		    });
				
	},
	viewrecentorders:function(req,res,next){
		///*** showing the recent 6 months orders using call external api ***////
		MenuService.getMenuData(function(err, menu_categories){

					MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){
		ApiResponseService.apicall(req,res,"http://localhost/ecommerce_site/api/public/order/recent/179bb1f6-12f3-4f10-80f8-572c77663074","GET",'xx',function(responsedata,message){
         //console.log(responsedata);
			res.view('home/orders',{'vieworder':JSON.parse(responsedata),'menudata':'','message':'oops ! no orders are avilable','menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories});
			
		});
		     });
		    });
				
	},
	allorderdetails:function(req,res,next){
		MenuService.getMenuData(function(err, menu_categories){

					MenuCategoryService.getAllSubCategories(function(err, menu_sub_categories){
		////**** showing all order details based on correseponding userid  using external api***//////
		ApiResponseService.apicall(req,res,"http://localhost/ecommerce_site/api/public/order/user/9cd61ef0-4a56-43df-6910-5743060eac80","GET",'',function(userdata){
		ApiResponseService.apicall(req,res,"http://localhost/ecommerce_site/api/public/order/orderdetails/9cd61ef0-4a56-43df-6910-5743060eac80","GET",'',function(ordersdata){
			ApiResponseService.apicall(req,res,"http://localhost/ecommerce_site/api/public/order/orderaddress/9cd61ef0-4a56-43df-6910-5743060eac80","GET",'',function(ordersadddata){
             //console.log(ordersdata);
			res.view('home/orderdetails',{'userdata': JSON.parse(userdata),'orderdata': JSON.parse(ordersdata),'orderadddata': JSON.parse(ordersadddata),'menudata':'','menu_categories':menu_categories,'menu_sub_categories':menu_sub_categories});
			});
			});
		});
		     });
		    });
				
		
		
	},

	
};


		  
		  
		  
		  
		  
		  
		  
		  
		
