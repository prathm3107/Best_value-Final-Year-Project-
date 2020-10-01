const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.listen(3000, function(){
  console.log("Server started on port 3000");
});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.get("/index.html", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var search_query = req.body.searchquery;

  console.log(search_query);
});

app.get("/signup.html", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/signup", function(req, res){
  var mail = req.body.eMail;
  var first_name = req.body.fName;
  var last_name = req.body.lName;

  var data = {
    members: [
      {
        email_address: mail,
        status: "subscribed",
        merge_fields: {
          FNAME: first_name,
          LNAME: last_name
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var url = "https://us17.api.mailchimp.com/3.0/lists/f0bc044178";
  var options = {
    method: "POST",
    auth: "prathm3107:93f614911f60e90218982840ab5717d9-us17"
  }
  const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    } else{
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req, res){
  res.redirect("/signup");
});

app.post("/success", function(req, res){
  res.redirect("/");
});
