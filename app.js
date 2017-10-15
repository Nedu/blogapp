var express 			= require("express"),
	methodOverride 		= require("method-override"),
	expressSanitizer 	= require("express-sanitizer"),
	bodyParser 			= require("body-parser"),
	flash 				= require("connect-flash"),
	mongoose 			= require("mongoose"),
	passport 			= require("passport"),
	LocalStrategy 		= require("passport-local"),
	Post 				= require("./models/post"),
	Comment 			= require("./models/comment"),
	User 				= require("./models/user"),
	seedDB 				= require("./seeds"),
	app 				= express();	


var postRoutes 		= require("./routes/posts"),
	commentRoutes 	= require("./routes/comments"),
	indexRoutes 	= require("./routes/index")

mongoose.connect("mongodb://localhost/restful_blog_app", function(err) {
	if(err) {
		console.log("Not connected to the database" + err);
	} else {
		console.log("Successfully connected to the database");
	}
});

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", indexRoutes);
app.use("/posts/:id/comments", commentRoutes);
app.use("/posts", postRoutes);

// launch server
app.listen(process.env.PORT || 3000, function () {
	console.log("Server has started");
});