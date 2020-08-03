const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const homeStartingContent = "HOME PAGE Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. ";
const aboutContent = "ABOUT PAGE Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. ";
const contactContent = "CONTACT PAGE Turning away from the ledge, he started slowly down the mountain, deciding that he would, that very night, satisfy his curiosity about the man-house. In the meantime, he would go down into the canyon and get a cool drink, after which he would visit some berry patches just over the ridge, and explore among the foothills a bit before his nap-time, which always came just after the sun had walked past the middle of the sky. ";

const app = express();

var posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));



app.get("/", function(req,res){
  //console.log(posts.length);
    res.render("home",{homeStartingContent:homeStartingContent,posts:posts});
});

app.get("/about",function(req,res){

  res.render("about",{aboutContent:aboutContent});

});
app.get("/contact",function(req,res){

  res.render("contact",{contactContent:contactContent});

});
app.get("/compose", function(req,res){
  res.render("compose");
});

app.post("/compose", function(req,res){
  var postText=req.body.postText;
  
  var data={
    postTitle:req.body.postTitle,
    postText:req.body.postText
  }
posts.push(data);

res.redirect("/");
});


app.get("/posts/:postTitle",function(req,res){
 

  posts.forEach(function(post){
    console.log(post);
    var originalPostTitle=post.postTitle;
    var postBody=post.postText;

    var postTitle=_.lowerCase(post.postTitle);
    var reqPostTitle=_.lowerCase(req.params.postTitle);
    
  console.log(postTitle);
  console.log(reqPostTitle);


    if(postTitle===reqPostTitle){  
      res.render("post",{postTitle:originalPostTitle,postBody:postBody});
      
    }
    
    
  });
  // for(var i=0;i<posts.length;i++){

  //   if(posts[i].postTitle===req.params.postTitle){
  //     console.log("Match Found!");
  //   }
  //   else{

  //     console.log("no match");
  //   }
  // }
  
});
  









app.listen(3000, function() {
  console.log("Server started on port 3000");
});
