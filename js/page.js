const express = require('express');
const Twitter = require('twitter-v2');
const { TwitterApi } = require('twitter-api-v2');
const tweetJsonToHtml = require('tweet-json-to-html');
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);
//console.log("port:"+port);
//app.listen(3100, () => console.log('Server running'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
const apponlyClient = new TwitterApi('AAAAAAAAAAAAAAAAAAAAAOrcWQEAAAAAVd8xl8wTnoFPfyPZnbicfv5JuHM%3D0gXK89sM7HshxaRn8wHacElUPCBgXVEIPp8bQ8trCCIh4QLrlV');
const v2Client = apponlyClient.v2;
const client = new Twitter({
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAOrcWQEAAAAAVd8xl8wTnoFPfyPZnbicfv5JuHM%3D0gXK89sM7HshxaRn8wHacElUPCBgXVEIPp8bQ8trCCIh4QLrlV'
});

const clientAuth = new TwitterApi({clientId : 'Z2BGIRuGWtFdfpwYJEJnZRfnp', clientSecret:'zHTAtEgWEYNk5dZqUkpLblZusuVpzjJoVoQGEhqoo5vkIhVqIj'});

console.log("en page");

app.get('/Singletweet', (req,res) => {
/*   //console.log(req);
    client
      .get('tweets', {ids: req.query.id})
      .then(tweet => {   
        res.json(tweet);
      })
      .catch(error => {
        res.send(error);
      }); */
      v2Client.singleTweet(req.query.id).then(twwwt =>{
        res.json(twwwt);
      }).catch(error =>{
        res.send(error)
      });
});
/* app.get('/tweets',(req,res)=>{
    v2Client.tweet(req.query.text);
}); */
app.get('/userTL', (req,res) => {
  /*   //console.log(req);
      client
        .get('tweets', {ids: req.query.id})
        .then(tweet => {   
          res.json(tweet);
        })
        .catch(error => {
          res.send(error);
        }); */
        /* v2Client.userTimeline(req.query.id).then(twwwt =>{
          res.json(twwwt);
        }).catch(error =>{
          res.send(error)
        }); */
        v2Client.userByUsername(req.query.id).then(user=>{
          let TL = v2Client.userTimeline(user.id);
          res.json(TL);
        }).catch(error =>{
          res.send(error);
        });
  });
  app.get('/userSearch',(req,res) =>{
      v2Client.userByUsername(req.query.username).then(user =>{
        let html  = tweetJsonToHtml(res.json(user))
        res.send(html);
      }).catch(error =>{
        res.send(error);
      });
  });