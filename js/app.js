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
                        '<br/>Seguidor:"'+v.id+ '" Nombre: '+v.name
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
                $.each(res.data,function(i,v){
                console.log('Id'+i+' text '+v.text);
                     $('#resarea').append(
                        '<br/>Usuario:"'+v.id+ '" Nombre: '+v.name
                    ); 
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
    $('#btnTrends').on('click',function(){
       // let name = $('#IDTweet').val();
       // console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/userTrends',
            data :{
                
            },
            success: function(res){
               console.log('res userTrends:');
                console.log(res);
                $('#resarea').empty();
                $.each(res.data,function(i,v){
                   // console.log('Id'+i+' text '+v.text);
                    $('#resarea').html(
                        v.country + "tendencia de "+v.name
                    );
                });
            }
        });
    });//get userMentions
    $('#btnChatInput').on('click',function(){
        let op = $('#ChatbotInput').val();
        let txt = $('#ChatbotInput option:selected').text();
        console.log(txt)
        console.log($('#ChatbotInput').val());
        $('#historialChat').append('<li class="mar-btm"> <div class="media-body pad-hor speech-right"> <div class="speech"> <p>'+txt+'</p> </div> </div></li>');
        switch($('#ChatbotInput').val()){
            case "1":
                console.log('en sw1')
                $('#historialChat').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>Esta aplicación le provee una manera sencilla de poder obtener varios datos de twitter y sus usuarios</p></div></div></li>');
                break;
            case "2":
                $('#historialChat').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>Para analizar un tweet debe de ingresar o el ID del tweet o el enlace del tweet y seleccionar el botón "Analizar"</p></div></div></li>');
                break;
            case "3":
                $('#historialChat').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>Puede revisar qué usuarios le han dado like a un tweet ingresando el ID o enlace del tweet y seleccionar el botón "Likedby"</p></div></div></li>');
                break;
            case "4":
                $('#historialChat').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>Puede revisar qué usuarios han retwitteado un tweet ingresando el ID o enlace del tweet y seleccionar el botón "Retweetedby"</p></div></div></li>');
                break;
            case "5":
                $('#historialChat').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>Para buscar a un usuario, ingrese su nombre de usuario (su @) y seleccionar el botón "Buscar Usuario"</p></div></div></li>');
                break;
            case "6":
                $('#historialChat').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>Para revisar todos los tweets de un usuario, ingrese su ID de usuario y seleccionar el botón "Línea de Tiempo de Usuario"</p></div></div></li>');
                break;
            case "7":
                $('#historialChat').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>Para revisar los likes de un usuario, ingrese su ID de usuario y seleccionar el botón "Likes de Usuario"</p></div></div></li>');
                break;
            case "8":
                $('#historialChat').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>Para revisar las veces que se ha mencionado a un usuario, ingrese su ID de usuario y seleccionar el botón "Menciones de Usuario"</p></div></div></li>');
                break;
            case "9":
                $('#historialChat').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>Para revisar los usuarios que un usuario sigue, ingrese su ID de usuario y seleccionar el botón "Lista Siguiendo"</p></div></div></li>');
                break;
            case "10":
                $('#historialChat').append('<li class="mar-btm"><div class="media-body pad-hor"><div class="speech"><p>Para revisar los seguidores de un usuario, ingrese su ID de usuario y seleccionar el botón "Seguidores Usuario"</p></div></div></li>');
                break;
            default:
                console.log('def')
                break;
        }//switch
    });
});
function separateId(str) {
    let id = str.split('/');
    id = id[id.length-1].split('?')[0];
    return id;
}