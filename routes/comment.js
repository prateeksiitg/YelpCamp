var express 	= require('express'),
	router  	= express.Router(),
	Campground	= require('../models/campgrounds'),
	Comment		= require('../models/comment'),
	middleware	= require('../middleware');

//=============================
	//Comment Routes
//=============================

router.get('/campgrounds/:id/comment/new',middleware.isloggedIn,function(req,res){
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			res.render('comments/new',{campground:campground});
		}
	});
	
});

router.post('/campgrounds/:id/comment',middleware.isloggedIn,function(req,res){
	
	Campground.findById(req.params.id,function(err,campground){
		if(err){
			console.log(err);
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err){
					console.log(err);
				}else{
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					comment.save();
					//push comment to the campground
					campground.comments.push(comment);
					campground.save();
					req.flash('success','Comment Successfully Posted');
					res.redirect('/campgrounds/'+req.params.id);
				}
			});
		}
	});
		
});

router.get('/campgrounds/:id/comment/:comment_id/edit',middleware.checkCommentOwnership,function(req,res){
	Comment.findById(req.params.comment_id,function(err,foundComment){
		if(err){
			res.redirect('back');
		}else{
			res.render('comments/edit',{campground_id : req.params.id, comment:foundComment});
		}
	});
	
});

router.put('/campgrounds/:id/comment/:comment_id',middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
		if(err){
			res.redirect('back');
		}else{
			res.redirect('/campgrounds/'+ req.params.id);
		}
	});
});

router.delete('/campgrounds/:id/comment/:comment_id',middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			res.redirect('back');
		}else{
			req.flash('success','Comment Deleted');
			res.redirect('/campgrounds/'+req.params.id);
		}
	});
});


module.exports = router;
