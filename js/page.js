const express = require('express');
const Twitter = require('twitter-v2');
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
console.log("port:"+port);
//app.listen(3100, () => console.log('Server running'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
const client = new Twitter({
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAOrcWQEAAAAAVd8xl8wTnoFPfyPZnbicfv5JuHM%3D0gXK89sM7HshxaRn8wHacElUPCBgXVEIPp8bQ8trCCIh4QLrlV'
});
console.log("en page");

app.get('/tweets', (req,res) => {
  //console.log(req);
    client
      .get('tweets', {ids: req.query.id})
      .then(tweet => {   
        res.json(tweet);
      })
      .catch(error => {
        res.send(error);
      });
});
