var mongoose = require("mongoose");
var Post = require("./models/post");
var Comment = require("./models/comment");

var data = [
	{
		title: "Cloud's Rest", 
		image: "https://unsplash.it/200/300",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis urna eget dolor ornare ullamcorper sed euismod lacus. Suspendisse et pretium mi, et ullamcorper eros. Curabitur eleifend mauris justo. Quisque viverra ultrices risus. Aliquam placerat ipsum sit amet gravida porttitor. Fusce posuere tellus vel ligula convallis efficitur. Nullam urna ligula, finibus sit amet ante a, lacinia porta felis. Proin iaculis blandit urna, ut porttitor neque convallis at. Donec maximus sollicitudin vehicula. Duis non tellus eu dolor facilisis mattis quis rutrum quam. Nam sit amet eros erat. Duis eget mauris id neque gravida posuere eu sed purus. Aenean at justo erat. Aliquam erat volutpat. "
	},
	{
		title: "Canyon Floor", 
		image: "https://unsplash.it/200/300",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis urna eget dolor ornare ullamcorper sed euismod lacus. Suspendisse et pretium mi, et ullamcorper eros. Curabitur eleifend mauris justo. Quisque viverra ultrices risus. Aliquam placerat ipsum sit amet gravida porttitor. Fusce posuere tellus vel ligula convallis efficitur. Nullam urna ligula, finibus sit amet ante a, lacinia porta felis. Proin iaculis blandit urna, ut porttitor neque convallis at. Donec maximus sollicitudin vehicula. Duis non tellus eu dolor facilisis mattis quis rutrum quam. Nam sit amet eros erat. Duis eget mauris id neque gravida posuere eu sed purus. Aenean at justo erat. Aliquam erat volutpat. "
	},
	{
		title: "Desert Mesa", 
		image: "https://unsplash.it/200/300",
		body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis urna eget dolor ornare ullamcorper sed euismod lacus. Suspendisse et pretium mi, et ullamcorper eros. Curabitur eleifend mauris justo. Quisque viverra ultrices risus. Aliquam placerat ipsum sit amet gravida porttitor. Fusce posuere tellus vel ligula convallis efficitur. Nullam urna ligula, finibus sit amet ante a, lacinia porta felis. Proin iaculis blandit urna, ut porttitor neque convallis at. Donec maximus sollicitudin vehicula. Duis non tellus eu dolor facilisis mattis quis rutrum quam. Nam sit amet eros erat. Duis eget mauris id neque gravida posuere eu sed purus. Aenean at justo erat. Aliquam erat volutpat. "
	}
]

function seedDB(){
	// Remove all posts
	Post.remove({}, function(err){
		if(err){
			console.log(err);
		}
		console.log("removed posts");
		// add a few blog posts
		data.forEach(function(seed) {
			Post.create(seed, function(err, post){
				if(err){
					console.log(err);
				} else {
					console.log("added a post");
					// create a comment
					Comment.create(
						{
							text: "This place is great, but I wish there was internet",
							author: "Homer"
						}, function(err, comment){
							if(err){
								console.log(err);
							} else{
								post.comments.push(comment);
								post.save();
								console.log("Created new comment");
							}
						});
				}
			});
		});
	});

	
	// add a few comment
}

module.exports = seedDB;