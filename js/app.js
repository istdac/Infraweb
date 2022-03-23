$(document).ready(function () {
    console.log("dom ready")
    
    $('#btnan').on('click', function() {
        let idStr = $('#pubtxt').val();
        // let data = T.analize(ID);
        // console.log(data)
        let ID = separateId(idStr);
        console.log(ID);
        $.ajax({
            type: 'get',
            url: 'http://localhost:3100/Singletweet',
            data: {
                id : ID
            },
            success: function(res) {
                console.log("res:");
                console.log(res.data);
                $('#resultados').text(res.data.text);
                
            }
        })
    });//getTweet
    $('#btnUserSearch').on('click',function(){
        let name = $('#userNameSearch').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'http://localhost:3100/userSearch',
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
            type:'get',
            url: 'http://localhost:3100/tweets',
            data:{
                text : content
            },
            success:function(res){
                console.log("res post tweet:");
                console.log(res.data);
                $('#resultados').text(
                    'Tweet creado con id:'+res.data[0]
                );
            }
        });
    });//function post tweet
    $('#btnUserTL').on('click',function(){
        let name = $('#userTimeL').val();
        console.log('name:'+name);
        $.ajax({
            type: 'get',
            url : 'http://localhost:3100/userTL',
            data :{
                id:name
            },
            success: function(res){
                console.log('res userTL:');
                console.log(res);
                $.each(res.data, function(text, tx ){
                    
                });
            }
        });
});

function separateId(str) {
    let id = str.split('/');
    id = id[id.length-1].split('?')[0];
    return id;
}


