const express = require('express');
const Twitter = require('twitter-v2');
const { TwitterApi, TweetSearchAllV2Paginator, UserFollowersV2Paginator } = require('twitter-api-v2');
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
const v1Client = apponlyClient.v1;
/*const client = new Twitter({
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAOrcWQEAAAAAVd8xl8wTnoFPfyPZnbicfv5JuHM%3D0gXK89sM7HshxaRn8wHacElUPCBgXVEIPp8bQ8trCCIh4QLrlV'
});*/
const clientAuth = new TwitterApi({
  appKey : 'Z2BGIRuGWtFdfpwYJEJnZRfnp', 
  appSecret:'zHTAtEgWEYNk5dZqUkpLblZusuVpzjJoVoQGEhqoo5vkIhVqIj',
  accessToken: '1466281644944359429-Q0dwykuyh5H1B4GELC1XYBns2NT10e',
  accessSecret: 'LUzrURXkjwXIBgDyaMLv575G5j2hLPF4d10b7FM9iQ21u',
});
const v1ClientAuth=clientAuth.v1;
const v2ClientAuth=clientAuth.v2;
console.log("en page");
app.get('/auth',(req,res)=>{
    const clientAuth2 = new TwitterApi({
      appKey : req.appKey, 
      appSecret:req.appSecret,
    });
   clientAuth2.generateAuthLink('https://istdac.github.io/Infraweb/').then(link=>{
     res.json(link);
   }).catch(error =>{
     res.send(error);
   });

});
app.get('/callback', (req, res) => {
  // Extract state and code from query string
  const { state, code } = req.query;
  // Get the saved codeVerifier from session
  const { codeVerifier, state: sessionState } = req.session;

  if (!codeVerifier || !state || !sessionState || !code) {
    return res.status(400).send('You denied the app or your session expired!');
  }
  if (state !== sessionState) {
    return res.status(400).send('Stored tokens didnt match!');
  }

  // Obtain access token
  const client = new TwitterApi({ clientId: CLIENT_ID, clientSecret: CLIENT_SECRET });

  client.loginWithOAuth2({ code, codeVerifier, redirectUri: CALLBACK_URL })
    .then(async ({ client: loggedClient, accessToken, refreshToken, expiresIn }) => {
      // {loggedClient} is an authenticated client in behalf of some user
      // Store {accessToken} somewhere, it will be valid until {expiresIn} is hit.
      // If you want to refresh your token later, store {refreshToken} (it is present if 'offline.access' has been given as scope)

      // Example request
      const { data: userObject } = await loggedClient.v2.me();
    })
    .catch(() => res.status(403).send('Invalid verifier or access tokens!'));
});

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
        v2Client.userTimeline(req.query.id).then(twwwt =>{
          res.json(twwwt);
        }).catch(error =>{
          res.send(error)
        });
  });
  app.get('/mentions',(req,res)=>{
    v2Client.userMentionTimeline(req.query.id).then(tweets=>{
      res.json(tweets);
    }).catch(error =>{
      res.send(error)
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
  app.get('/likedby',(req,res)=>{
      v2Client.tweetLikedBy(req.query.id,{asPaginator:true}).then(users=>{
        res.json(users);
      }).catch(error =>{
        res.send(error)
      });
  });
  app.get('/rtby',(req,res)=>{
    v2Client.tweetRetweetedBy(req.query.id).then(users=>{
      res.json(users);
    }).catch(error =>{
      res.send(error)
    });
});
app.get('/userLikes',(req,res)=>{
  v2Client.userLikedTweets(req.query.id).then(likes=>{
    res.json(likes);
  }).catch(error =>{
    res.send(error)
  });
});
app.get('/followers',(req,res)=>{
  v2Client.followers(req.query.id,{asPaginator:true}).then(users=>{
    res.json(users);
  }).catch(error =>{
    res.send(error)
  });
});
app.get('/following',(req,res)=>{
  v2Client.following(req.query.id).then(users=>{
    console.log(json(users));
    res.json(users);
  }).catch(error =>{
    res.send(error)
  });
});
app.get('/myblocklist',(req,res)=>{
  v2Client.userBlockingUsers(req.query.id).then(users=>{
    res.json(users);
  }).catch(error =>{
    res.send(error)
  });
});
/*AUTH METHODS   */
app.post('/postTweet',(req,res)=>{
    v2ClientAuth.tweet(req.text).then(
      tweet=>{
        res.json(tweet);
      }
    ).catch(error=>{
      res.send(error)
    });
});
app.get('/reply',(req,res)=>{
  v1ClientAuth.reply(req.text,req.id).then(
    tweet=>{
      res.json(tweet);
    }
  ).catch(error=>{
    res.send(error)
  });
});
app.get('/deleteTweet',(req,res)=>{
  v1ClientAuth.deleteTweet(req.id).then(
    tweet=>{
      res.json(tweet);
    }
  ).catch(error=>{
    res.send(error)
  });
});
app.get('/like',(req,res)=>{
  v2ClientAuth.like(v2ClientAuth.id,req.id).then(
    tweet=>{
      res.json(tweet);
    }
  ).catch(error=>{
    res.send(error)
  });
});
app.get('/unlike',(req,res)=>{
  v2ClientAuth.unlike(v2ClientAuth.id,req.id).then(
    tweet=>{
      res.json(tweet);
    }
  ).catch(error=>{
    res.send(error)
  });
});
app.get('/homeTL',(req,res)=>{
  v2ClientAuth.homeTimeline({ exclude: 'replies' }).then(
    tweet=>{
      res.json(tweet);
    }
  ).catch(error=>{
    res.send(error)
  });
});
app.get('/homeTL',(req,res)=>{
  v2ClientAuth.homeTimeline({ exclude: 'replies' }).then(
    tweet=>{
      res.json(tweet);
    }
  ).catch(error=>{
    res.send(error)
  });
});
//---------------
app.get('/embed',(req,res)=>{
  console.log(req);
  v1Client.oembedTweet(req.id).then(
    tweet=>{
      res.send(tweet);
    }
  ).catch(error=>{
    res.send(error)
  });
});
