var mongoose = require('mongoose');
var Campground = require('./models/campgrounds');
var Comment = require('./models/comment');

var data= [
	{
		name: 'Clouds Rest',
		img: 'https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
		desc: 'Here you will find mountains which are covered by clouds'
	},
	{
		name: 'Salmon Creek',
		img: 'https://images.pexels.com/photos/2376997/pexels-photo-2376997.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
		desc: 'This is the most beautiful ampground that you would ever see in your life'
		
	},
	{
		name: 'Granite Hill',
		img: 'https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80',
		desc: 'This is the most beautiful ampground that you would ever see in your life'
		
	}
];

function seedDB(){
		//Remove Campgrounds
		Campground.remove({},function(err){
			if(err){
				console.log(err);
			}else{
				console.log("All campgrounds removed");
				// Create Campground
				data.forEach(function(seed){
					Campground.create(seed,function(err,campground){
				
					if(err){
						console.log(err);
					}else{
						console.log('added a campground');
						//create a comment
						Comment.create(
							{
								text:'This place is great but i wish there was a internet',
								author:'Homer'
							},function(err,comment){
								if(err){
									console.log(err);
								}else{
									campground.comments.push(comment);
									campground.save();
									console.log('created a new comment');
								}
								
							});
					}
			
				});
			});
			}
		});
		
			
};

module.exports = seedDB;