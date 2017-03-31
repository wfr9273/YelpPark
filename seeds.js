var mongoose = require("mongoose");
var Park = require("./models/park");
var Comment = require("./models/comment");

var data = [
    {
        name: "Death Valley National Park",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSnLTO68rx4GL_p4fzYJeQXnmZfES89oR-SVeprD9iWeS9x6lnT",
        description: "In this below-sea-level basin, steady drought and record summer heat make Death Valley a land of extremes. Yet, each extreme has a striking contrast. Towering peaks are frosted with winter snow. Rare rainstorms bring vast fields of wildflowers. Lush oases harbor tiny fish and refuge for wildlife and humans. Despite its morbid name, a great diversity of life survives in Death Valley.",
        location: "Death Valley National Park"
    },
    {
        name: "Yosemite National Park",
        image: "https://www.nps.gov/featurecontent/yose/anniversary/wp-content/themes/anniversary2014/library/images/yose1smallSummer.jpg",
        description: "Not just a great valley, but a shrine to human foresight, the strength of granite, the power of glaciers, the persistence of life, and the tranquility of the High Sierra. First protected in 1864, Yosemite National Park is best known for its waterfalls, but within its nearly 1,200 square miles, you can find deep valleys, grand meadows, ancient giant sequoias, a vast wilderness area, and much more.",
        location: "Yosemite National Park"
    },
    {
        name: "Channel Islands National Park",
        image: "https://www.nps.gov/chis/learn/photosmultimedia/images/960-IMG_1754_1.jpg",
        description: "Channel Islands National Park encompasses five remarkable islands and their ocean environment, preserving and protecting a wealth of natural and cultural resources. Isolation over thousands of years has created unique animals, plants, and archeological resources found nowhere else on Earth and helped preserve a place where visitors can experience coastal southern California as it once was.",
        location: "Channel Islands National Park"
    }
];

function seedDB() {
    // remove all parks
    Park.remove({}, function(err) {
        if (err)
            console.log(err);
        // else {
        //     console.log("Remove parks!");
        //     // add a few parks
        //     data.forEach(function(seed) {
        //         Park.create(seed, function(err, park) {
        //             if (err)
        //                 console.log(err);
        //             else {
        //                 console.log("Create a park.");
        //                 // create a comment
        //                 Comment.create(
        //                     {
        //                         text: "This place is great!",
        //                         author: "Homer"
        //                     }, function(err, comment) {
        //                         if (err)
        //                             console.log(err);
        //                         else {
        //                             park.comments.push(comment);
        //                             park.save();
        //                             console.log("Created new comments");
        //                         }
        //                 });
        //             }
        //         });
        //     });
        // }
    });
    
    // add a few comments
}
module.exports = seedDB;
