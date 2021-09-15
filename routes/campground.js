var express 	= require('express'),
	router  	= express.Router(),
	Campground  = require('../models/campgrounds'),
	middleware	= require('../middleware');



//Campgounds routes

router.get('/campgrounds',function(req,res){
	
	Campground.find({},function(err,allCampgrounds){
		if(err){
			console.log('Oh my God you are crap');
		}else{
			res.render("campgrounds/campgrounds",{campGrounds:allCampgrounds, currentUser: req.user});	
		}	
	});
		
});

//Create Route
router.post('/campgrounds',middleware.isloggedIn,function(req,res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCamp = {
		name: name,
		img: image,
		desc: desc,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	};
	 
	Campground.create(newCamp,function(err,newCampground){
		if(err){
			console.log(err);
		}else{
			res.redirect('/campgrounds');
		}
	});	
});


//New Route
router.get('/campgrounds/new',middleware.isloggedIn,function(req,res){
	res.render('campgrounds/new');
});

// Show Route
router.get('/campgrounds/:id',function(req,res){
	Campground.findById(req.params.id).populate('comments').exec(function(err,foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render('campgrounds/show',{campground:foundCampground});
		}
	});	
});

//Edit Campground route
router.get('/campgrounds/:id/edit',middleware.checkCampgroundOwnership,function(req,res){
	
		Campground.findById(req.params.id,function(err,foundCampground){
			res.render('campgrounds/edit',{campground:foundCampground});
		});
	
});

//Update Campground route
router.put('/campgrounds/:id',middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCamp){
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.redirect('/campgrounds/'+req.params.id);
		}
	});
});

//Destroy a campground
router.delete('/campgrounds/:id',middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect('/campgrounds');
		}else{
			res.redirect('/campgrounds');
		}
	});
});




module.exports = router;