var express = require("express");
var router = express.Router();
var Park = require("../models/park");
var middleware = require("../middleware");

// INDEX - show all parks
router.get("/", function(req, res) {
    // get all parks from DB
    Park.find({}, function(err, parks) {
        if (err) {
            req.flash("Park Not Found!");
            res.redirect("back");
        }
        else 
            res.render("parks/index", {parks: parks});
    });
});

// CREATE - add new park to DB
router.post("/", middleware.isLogin, function(req, res) {
    var name = req.body.name;
    var url = req.body.image;
    var desc = req.body.description;
    var price = req.body.price;
    var location = req.body.location;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newPark = {name: name, image: url, description: desc, author: author, price: price, location: location};
    // create a new campground and save to DB
    Park.create(newPark, function(err, park) {
        if (err) {
            req.flash("error", "Something went wrong!");
            console.log(err);
        }
        else {
            req.flash("success", "Successfully added park");
            res.redirect("/parks");
        }
    });
});

// new
router.get("/new", middleware.isLogin, function(req, res) {
    res.render("parks/new");
});

// SHOW - shows more informations about one park
router.get("/:id", function(req, res) {
    // find the park with the provided ID
    Park.findById(req.params.id).populate("comments").exec(function(err, foundPark) {
       if (err) {
            req.flash("Park Not Found!");
            res.redirect("back");
        }
        else
            res.render("parks/show", {park: foundPark}); // render show template
    });
});

// EDIT PARK ROUTE
router.get("/:id/edit", middleware.checkParkOwnership, function(req, res) {
    Park.findById(req.params.id, function(err, foundPark) {
        res.render("parks/edit", {park: foundPark});
    });
});

// UPDATE PARK ROUTE
router.put("/:id", middleware.checkParkOwnership, function(req, res) {
    Park.findByIdAndUpdate(req.params.id, req.body.park, function(err, updatedPark) {
        res.redirect("/parks/" + req.params.id);
    });
});

// DELETE PARK ROUTE
router.delete("/:id", middleware.checkParkOwnership, function(req, res) {
    Park.findByIdAndRemove(req.params.id, function(err) {
         res.redirect("/parks");
    });
});

module.exports = router;