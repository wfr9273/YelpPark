var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    flash           = require("connect-flash");

var Park            = require("./models/park"),
    Comment         = require("./models/comment"),
    User            = require("./models/user");

// require routes
var commentRoutes = require("./routes/comments"),
    parkRoutes    = require("./routes/parks"),
    authRoutes    = require("./routes/index");
    
//var seedDB = require("./seeds");
//seedDB();

mongoose.connect(process.env.DATABASEURL);
//mongoose.connect("mongodb://wfrYelpPark:199273@ds139438.mlab.com:39438/yelppark");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use("/parks", parkRoutes);
app.use("/parks/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Yelp Park has started...");
});