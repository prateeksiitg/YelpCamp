var Campground = require('../models/campgrounds'),
	Comment    = require('../models/comment');



// All the middleware will come here

middlewareObj ={};

middlewareObj.isloggedIn = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash('error','You need to login first');
	res.redirect('/login');
}

middlewareObj.checkCampgroundOwnership = function(req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
			if(err){
				req.flash('error','Campground not found');
				res.redirect('back');
			}else{
					//does the user own the campground
					if(foundCampground.author.id.equals(req.user._id)){
						next();		
					}else{
						req.flash('error','You donnot have permission');
						res.redirect('back');
					}
			}
				
		});
	}else{
		req.flash('error','You need to be logged in');
		res.redirect('back');
	}
}
middlewareObj.checkCommentOwnership = function(req,res,next){
		if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err){
				res.redirect('back');
			}else{
					//does the user own the campground
					if(foundComment.author.id.equals(req.user._id)){
						next();		
					}else{
						res.redirect('back');
					}
			}
				
		});
	}else{
		req.flash('error','You need to be logged in');
		res.redirect('back');
	}
}
module.exports = middlewareObj;