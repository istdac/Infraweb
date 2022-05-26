$(document).ready(function () {
    console.log("dom ready")
    $('#btnan').on('click', function() {
        let idStr = $('#IDTweet').val();
        // let data = T.analize(ID);
        // console.log(data)
        let ID = separateId(idStr);
        console.log(ID);
        $.ajax({
            type: 'get',
            url: 'https://infrawebdacf.herokuapp.com/Singletweet',
            data: {
                id : ID
            },
            success: function(res) {
                console.log("res:");
                console.log(res.data);
                $('#resarea').html('Texto: ' +res.data.text);
                
            }
        })
    });//getTweet
    $('#btnUserSearch').on('click',function(){
        let name = $('#UserID').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/userSearch',
            data :{
                username:name
            },
            success: function(res){
                console.log('res usernameSearch:');
                console.log(res);
                $('#resarea').html('Usuario: '+ res.data.id+
                '<br/> Nombre: '+res.data.name+
                '<br/> Nombre de usuario: '+res.data.username);
            }
        });
    });//function buscar usuario
    $('#btnPostTweet').on('click',function(){
        let content = $('#postTwee').val();
        $.ajax({
            type:'post',
            url: 'https://localhost:3100/postTweet',
            data:{
                text : content
            },
            success:function(res){
                console.log("res post tweet:");
                console.log(res);
                $('#resultados').text(
                    'Tweet creado con id:'+res.data.id + 'texto: '+ res.data.text
                );
            }
        });
    });//function post tweet
    $('#btnUserTL').on('click',function(){
        let name = $('#UserID').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/userTL',
            data :{
                id:name
            },
            success: function(res){
               /*  console.log('res userTL:');
                console.log(res);
                console.log(res._realData.data); */
                $('#resarea').empty();
                $.each(res._realData.data,function(i,v){
                   // console.log('Id'+i+' text '+v.text);
                    $('#resarea').append(
                        '<br/>ID Tweet:"'+v.id+ '" Text: '+v.text
                    );
                });
            }
        });
    });//get user TL
    $('#btnUserLikes').on('click',function(){
        let name = $('#UserID').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/userLikes',
            data :{
                id:name
            },
            success: function(res){
               /*  console.log('res userTL:');
                console.log(res);
                console.log(res._realData.data); */
                $('#resarea').empty();
                $.each(res._realData.data,function(i,v){
                   // console.log('Id'+i+' text '+v.text);
                    $('#resarea').append(
                        '<br/>ID Tweet:"'+v.id+ '" Text: '+v.text
                    );
                });
            }
        });
    });//get userLikes
    $('#btnUserFollowers').on('click',function(){
        let name = $('#UserID').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/followers',
            data :{
                id:name
            },
            success: function(res){
               /*  console.log('res userTL:');
                console.log(res);
                console.log(res._realData.data); */
                $('#resarea').empty();
                $.each(res._realData.data,function(i,v){
                   // console.log('Id'+i+' text '+v.text);
                    $('#resarea').append(
                        '<br/>Seguidor:"'+v.id+ '" Nombre: '
                    );
                });
            }
        });
    });//get userFollowers
    $('#btnUserFollowing').on('click',function(){
        let name = $('#UserID').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/following',
            data :{
                id:name
            },
            success: function(res){
               /*  console.log('res userTL:');
                console.log(res);
                console.log(res._realData.data); */
                $('#resarea').empty();
                $.each(res._realData.data,function(i,v){
                console.log('Id'+i+' text '+v.text);
                    /* $('#resarea').append(
                        '<br/>Usuarios:"'+v.id+ '" Nombre: '
                    ); */
                });
            }
        });
    });//get userFollowing   
    $('#btnTweetLikedBy').on('click',function(){
        let name = $('#IDTweet').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/likedby',
            data :{
                id:name
            },
            success: function(res){
                console.log('reslikedby:');
                console.log(res);
                $('#resarea').empty();
                $.each(res._realData.data,function(i,v){
                   // console.log('Id'+i+' text '+v.text);
                    $('#resarea').append(
                        '<br/>Usuario:"'+v.id+ '" Nombre: '+v.name +' Username: '+v.username
                    );
                });
            }
        });
    });//get tweetlikedby 
    $('#btnTweetRTBy').on('click',function(){
        let name = $('#IDTweet').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/rtby',
            data :{
                id:name
            },
            success: function(res){
                console.log('res retweetedby:');
                console.log(res);
                
                $('#resarea').empty();
                $.each(res.data,function(i,v){
                   // console.log('Id'+i+' text '+v.text);
                    $('#resarea').append(
                        '<br/>Usuario:"'+v.id+ '" Nombre: '+v.name +' Username: '+v.username
                    );
                });
            }
        });
    });//get tweetlikedby 
    $('#btnUserMentions').on('click',function(){
        let name = $('#UserID').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/mentions',
            data :{
                id:name
            },
            success: function(res){
               /*  console.log('res userTL:');
                console.log(res);
                console.log(res._realData.data); */
                $('#resarea').empty();
                $.each(res._realData.data,function(i,v){
                   // console.log('Id'+i+' text '+v.text);
                    $('#resarea').append(
                        '<br/>Tweet:"'+v.id+ '" Texto: '+v.text
                    );
                });
            }
        });
    });//get userMentions
    $('#btnUserBlockList').on('click',function(){
        let name = $('#UserID').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/myblocklist',
            data :{
                id:name
            },
            success: function(res){
               /*  console.log('res userTL:');
                console.log(res);
                console.log(res._realData.data); */
                $('#resarea').empty();
                $.each(res._realData.data,function(i,v){
                   // console.log('Id'+i+' text '+v.text);
                    $('#resarea').append(
                        '<br/>Nombre:"'+v.id+ '" Texto: '+v.text
                    );
                });
            }
        });
    });//get userMentions
    $('#btnEmbed').on('click',function(){
        let name = $('#IDTweet').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/embed',
            data :{
                id:name
            },
            success: function(res){
               console.log('res embed:');
                console.log(res);
                $('#resarea').empty();
                $.each(res.data,function(i,v){
                   // console.log('Id'+i+' text '+v.text);
                    $('#resarea').html(
                        v.html
                    );
                });
            }
        });
    });//get userMentions
});
function separateId(str) {
    let id = str.split('/');
    id = id[id.length-1].split('?')[0];
    return id;
}