//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

// Load the full build.
var _lodash = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// let posts = [{
//   title: "Day 1",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet sit amet cursus sit amet dictum sit amet. Tincidunt ornare massa eget egestas purus viverra. Amet massa vitae tortor condimentum lacinia quis vel eros. Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Donec ultrices tincidunt arcu non. Ipsum dolor sit amet consectetur. Ut tellus elementum sagittis vitae et leo duis. Arcu ac tortor dignissim convallis aenean. Morbi non arcu risus quis varius quam quisque. Est velit egestas dui id ornare arcu."
// }, {
//   title: "Day 2",
//   content: "Nascetur ridiculus mus mauris vitae ultricies leo integer malesuada nunc. Netus et malesuada fames ac turpis egestas maecenas. Mauris commodo quis imperdiet massa tincidunt nunc. Vel risus commodo viverra maecenas accumsan. Ultrices in iaculis nunc sed augue lacus viverra. Feugiat nisl pretium fusce id velit ut. Nisl purus in mollis nunc sed id semper risus. Lorem ipsum dolor sit amet consectetur adipiscing. Tincidunt praesent semper feugiat nibh sed pulvinar. Cursus euismod quis viverra nibh cras pulvinar mattis. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Non nisi est sit amet facilisis magna etiam tempor."
// }];

//mongoose.connect("mongodb://localhost:27017/blogDB");
mongoose.connect("mongodb+srv://uid:pw@url/blogDB");

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema)

const post1 = new Post({
  title: "Your first Blog",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Laoreet sit amet cursus sit amet dictum sit amet. Tincidunt ornare massa eget egestas purus viverra. Amet massa vitae tortor condimentum lacinia quis vel eros. Non pulvinar neque laoreet suspendisse interdum consectetur libero id faucibus. Donec ultrices tincidunt arcu non. Ipsum dolor sit amet consectetur. Ut tellus elementum sagittis vitae et leo duis. Arcu ac tortor dignissim convallis aenean. Morbi non arcu risus quis varius quam quisque. Est velit egestas dui id ornare arcu."
})



app.get("/", function(req, res) {
  // res.render("home", {
  //   homeStartingContent: homeStartingContent,
  //   posts: posts
  // });

  Post.find({}, function(err, posts){
   res.render("home", {
     homeStartingContent: homeStartingContent,
     posts: posts
     });
 })


})

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
})

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
})

app.get("/compose", function(req, res) {
  res.render("compose");
})

app.post("/compose", function(req, res) {
  // let post = {
  //   title : req.body.blogTitle,
  //   content : req.body.blogInput
  // }
  // // posts.forEach((item, i) => {
  // //   if(_lodash.lowerCase(item.title) === _lodash.lowerCase(post.title)){
  // //     var error = "This title already exists! Please try another title";
  // //     res.render("compose");
  // //   }
  // // });
  //     posts.push(post);
  //     res.redirect("/");

  const post = new Post({
    title : req.body.blogTitle,
    content : req.body.blogInput
  });

  post.save(function(err){
    if(err){
      console.log(err);
    }
    else{
      res.redirect("/");
    }
  });
})

app.get("/posts/:postTitle", function(req, res) {
  let paramKey = req.params.postTitle;
  // let postToSend = {
  //   title: paramKey,
  //   content: "No content found for this topic. :("
  // };
  //
  // posts.forEach((post) => {
  //   if (_lodash.lowerCase(post.title) === _lodash.lowerCase(paramKey)) {
  //     postToSend = post;
  //   }
  // });
  // res.render("post", {
  //   postToSend: postToSend
  // });

  Post.findOne({title: paramKey }, function(err, post){
   if(err){
     console.log(err);
   }
   else{
     res.render("post", {
       post: post
     });
   }
 })

})

app.get("/posts", function(req, res) {
  res.redirect("/");
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started!");
})
