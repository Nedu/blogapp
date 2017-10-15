var express = require("express");
var router = express.Router();
var Post = require("../models/post");
var middleware = require("../middleware");

// INDEX ROUTE
router.get("/", function(req, res){
	Post.find({}, function (err, allPosts) {
		if(err){
			console.log(err);
		} else {
			res.render("posts/index", {posts: allPosts});
		}
	});
});

// NEW ROUTE
router.get("/new", middleware.isLoggedIn, function(req, res){
	res.render("posts/new");
});

// CREATE ROUTE
router.post("/", middleware.isLoggedIn, function(req, res){
	req.body.post.body = req.sanitize(req.body.post.body);
	Post.create(req.body.post, function(err, newPost){
		if(err){
			res.render("posts/new");
		} else {
			res.redirect("/posts");
		}
	});
});

//SHOW ROUTE
router.get("/:id", function(req, res){
	Post.findById(req.params.id).populate("comments").exec(function(err, foundPost){
		if(err){
			res.redirect("/posts");
		} else {

			if(!foundPost){
				req.flash("error", "Post not found.");
				return res.redirect("back"); 
			}
			
			res.render("posts/show", {post: foundPost});
		}
	});
});

// EDIT ROUTE
router.get("/:id/edit", middleware.checkPostOwnership, function(req, res){
	Post.findById(req.params.id, function(err, foundPost){
		if(err){
			res.redirect("/posts");
		} else {
			res.render("posts/edit", {post: foundPost});
		}
	});
});

// UPDATE ROUTE
router.put("/:id", middleware.checkPostOwnership, function(req, res){
	req.body.post.body = req.sanitize(req.body.post.body);
	Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost){
		if(err){
			res.redirect("/posts");
		} else {
			res.redirect("/posts/" + req.params.id);
		}
	});
});

// DELETE ROUTE
router.delete("/:id", middleware.checkPostOwnership, function(req, res){
	Post.findByIdAndRemove(req.params.id, function(err){
		if(err){
			res.redirect("/posts");
		} else {
			res.redirect("/posts");
		}
	});
});

module.exports = router;