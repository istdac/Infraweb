$(document).ready(function () {
    console.log("dom ready")
    $('#btnTwiTXT').on('click', function() {
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
                $('#chartdiv').empty();
                console.log("res:");
                console.log(res.data);
                $('#resarea').html('Texto: ' +res.data.text);
            }
        })
    });//getTweet
    $('#btnAnalizar').on('click', function() {
        let idStr = $('#IDTweet').val();
        // let data = T.analize(ID);
        // console.log(data)
        let ID = separateId(idStr);
        console.log(ID);
        $.ajax({
            type: 'get',
            url: 'https://infrawebdacf.herokuapp.com/analizarUno',
            data: {
                id : ID
            },
            success: function(res) {
                //console.log("res:");
                //console.log(res);
                $('#resarea').empty();
                $('#resarea').append('El sentimiento del tweet siene una puntuación de '+res.score+'<br>con una puntuación relativa de '+res.comparative+'<br>gracias a palabras como<br>');
                let glabels = [];
                let gdata = [];
                 //Empty div chart for update
                 $('#chartdiv').empty();
                 $('#chartdiv').html('<canvas id="myChart" style="width:100%;max-width:700px align-items-center"></canvas>');
                const ctx = document.getElementById('myChart').getContext('2d');
                let backgroundColors= [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(201, 203, 207, 0.7)'
                  ]
                let borderColors= [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ]
                let calc = res.calculation;
                for(let i=0;i<calc.length;i++){
                    let key = Object.keys(calc[i])[0];
                    //console.log(key);
                    //console.log(calc[i][key])
                    $('#resarea').append(key + " con puntuación de "+calc[i][key]+'<br>');
                    glabels.push(key);
                    gdata.push(calc[i][key]);
                }
                //Datos chart
               console.log('labels'+glabels);
               console.log('data'+gdata);
               let config = {
                    type:'bar',
                    data:{
                        labels:glabels,
                        datasets:[
                            {
                            label:'Calificación de palabra',
                            data:gdata,
                            backgroundColor:backgroundColors,
                            borderColor:borderColors,
                            borderWidth:1
                            },
                        ]
                    },
                    options: {
                        scales: {
                        y: {
                            beginAtZero: true
                        }
                        }
                    },
                } 
               
               const myChart = new Chart(ctx,config);//chart
               
            }//success
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
                $('#chartdiv').empty();
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
                $('#chartdiv').empty();
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
                $('#chartdiv').empty();
                $.each(res._realData.data,function(i,v){
                   // console.log('Id'+i+' text '+v.text);
                    $('#resarea').append(
                        '<br/>ID Tweet:"'+v.id+ '" Text: '+v.text
                    );
                });
            }
        });
    });//get user TL
    $('#btnUserTLAnalize').on('click',function(){
        let name = $('#UserID').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/analizarUserTL',
            data :{
                id:name
            },
            success: function(res){
                console.log('res userTLan:');
                console.log(res);
                // console.log(Object.keys(res[2]))
                // console.log('valores: '+res[2]['calculation'][0][Object.keys(res[2]['calculation'][0])])
                // console.log('llaves: ' + Object.keys(res[2]['calculation'][0]))
                let gkeys = [];
                let gvalues=[];
                for(let i=0;i<res.length;i++){
                    console.log('Analisis ' + i)
                    for(let j = 0; j < res[i]['calculation'].length; j++) {
                        let valueArray = res[i]['calculation'][j];
                        let keys = Object.keys(valueArray);
                        let values = []

                        for(let k=0; k < keys.length; k++) {
                            values.push(valueArray[keys[k]])

                            console.log(keys[k] + ': ' + values[k])
                            gkeys.push(keys[k])
                            gvalues.push(values[k])
                        }
                    }
                }
                $('#resarea').empty();
                $('#chartdiv').empty();
                $('#chartdiv').html('<canvas id="myChart" style="width:100%;max-width:700px align-items-center"></canvas>');
                const ctx = document.getElementById('myChart').getContext('2d');
                let backgroundColors= [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(201, 203, 207, 0.7)'
                  ]
                let borderColors= [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                  ]
                  console.log('keys'+gkeys)
                  console.log('values'+gvalues)
                let config = {
                    type:'bar',
                    data:{
                        labels:gkeys,
                        datasets:[
                            {
                            label:'Calificación de palabra',
                            data:gvalues,
                            backgroundColor:backgroundColors,
                            borderColor:borderColors,
                            borderWidth:1
                            },
                        ]
                    },
                    options: {
                        scales: {
                        y: {
                            beginAtZero: true
                        }
                        }
                    },
                } 
               
               const myChart = new Chart(ctx,config);//chart
            }
        });
    });
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
                $('#chartdiv').empty();
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
                $('#chartdiv').empty();
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
                
                console.log(res._realData.data); */console.log(res);
                $('#resarea').empty();
                $('#chartdiv').empty();
                $.each(res._realData.data,function(i,v){
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
        name=separateId(name);
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
                $('#chartdiv').empty();
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
        name=separateId(name);
        $.ajax({
            type: 'get',
            url : 'https://infrawebdacf.herokuapp.com/rtby',
            data :{
                id:name
            },
            success: function(res){
                console.log('res retweetedby:');
                console.log(res);
                $('#chartdiv').empty();
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
                $('#chartdiv').empty();
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
                $('#chartdiv').empty();
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
        name=separateId(name);
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
                $('#chartdiv').empty();
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
                $('#chartdiv').empty();
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