var Comment = require("../models/comment");
var Park = require("../models/park");

var middlewareObj = {};

middlewareObj.checkCommentOwnership = function(req, res, next) {
    // check if user is lonin or not
    if (req.isAuthenticated()) {
        // is the user the author of this park
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err) {
                req.flash("error", "Comment Not Found!");
                res.redirect("back");
            }
            else {
                if (foundComment.author.id.equals(req.user._id))
                    next();
                else {
                    req.flash("error", "Permission Denied!");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "Please Login First!");
        res.redirect("back");
    }
};

middlewareObj.checkParkOwnership = function(req, res, next) {
    // check if user is lonin or not
    if (req.isAuthenticated()) {
        // is the user the author of this park
        Park.findById(req.params.id, function(err, foundPark) {
            if (err) {
                req.flash("error", "Park Not Found!");
                res.redirect("back");
            }
            else {
                if (foundPark.author.id.equals(req.user._id))
                    next();
                else {
                    req.flash("error", "Permission Denied!");
                    res.redirect("back");
                }
            }
        });
    }
    else {
        req.flash("error", "Please Login First!");
        res.redirect("back");
    }
};

middlewareObj.isLogin = function(req, res, next) {
    if (req.isAuthenticated())
        return next();
    
    req.flash("error", "Please Login First!");
    res.redirect("/login");
};

module.exports = middlewareObj;