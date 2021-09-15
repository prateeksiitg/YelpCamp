var express       = require('express'),
    app           = express(),
    request       = require('request'),
    bodyParser    = require('body-parser'),
    mongoose      = require('mongoose'),
	flash		  = require('connect-flash'),	
    passport      = require('passport'),
    LocalStrategy = require('passport-local'),
	methodOverride= require('method-override'),
    Campground    = require('./models/campgrounds'),
    seedDB        = require('./seeds'),
	User          = require('./models/user'),
    Comment       = require('./models/comment');

//Routes importing
var campgroundRoutes = require('./routes/campground'),
	commentRoutes    = require('./routes/comment'),
	indexRoutes      = require('./routes/index'); 

//seedDB();
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect('mongodb+srv://krish:kanha123@cluster0-svhr0.mongodb.net/test?retryWrites=true&w=majority');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.use(methodOverride("_method"));
app.use(flash());
app.set('view engine','ejs');

//Passport Configuration
app.use(require('express-session')({
		secret: 'I am a cute boy',
		resave: false,
		saveUninitialized: false
	}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next();
});


app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);


//Server running command
app.listen(process.env.PORT,process.env.IP,function(){
	console.log("YelpCamp on its way!!!");
});