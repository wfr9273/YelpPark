var express = require("express");
var router = express.Router({mergeParams: true});
var Park = require("../models/park");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// Comments New
router.get("/new", middleware.isLogin, function(req, res) {
    Park.findById(req.params.id, function(err, park) {
        if (err)
            console.log(err);
        else
            res.render("comments/new", {park: park});
    });
});

// Comments Create
router.post("/", middleware.isLogin, function(req, res) {
    Park.findById(req.params.id, function(err, park) {
        if (err) {
            req.flash("error", "Park Not Found!");
            res.redirect("/parks");
        }
        else {
            Comment.create(req.body.comment, function(err, comment) {
                if (err) {
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                }
                else {
                    // add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // save comment
                    park.comments.push(comment);
                    park.save();
                    req.flash("success", "Successfully added comment!");
                    res.redirect("/parks/" + park._id);
                }
            });
        }
    });
});


// Edit comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if (err) {
            req.flash("error", "Comment Not Found!");
            res.redirect("back");
        }
        else
            res.render("comments/edit", {parkId: req.params.id, comment: foundComment});
    });
});

// update comment
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updateComment) {
        if (err) {
            req.flash("error", "Comment Not Found!");
            res.redirect("back");
        }
        else {
            req.flash("success", "Successfully updated comment!");
            res.redirect("/parks/" + req.params.id);
        }
    });
});

// comment destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            req.flash("error", "Comment Not Found!");
            res.redirect("back");
        }
        else {
            req.flash("success", "Successfully deleted comment!");
            res.redirect("/parks/" + req.params.id);
        }
    });
});

module.exports = router;