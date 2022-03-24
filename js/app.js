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
            url: 'https://infrawebdacf.herokuapp.com/Singletweet',
            data: {
                id : ID
            },
            success: function(res) {
                console.log("res:");
                console.log(res.data);
                $('#resarea').html('Texto' +res.data.text);
                
            }
        })
    });//getTweet
    $('#btnUserSearch').on('click',function(){
        let name = $('#userNameSearch').val();
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
            type:'get',
            url: 'https://infrawebdacf.herokuapp.com/tweets',
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
            url : 'https://infrawebdacf.herokuapp.com/userTL',
            data :{
                id:name
            },
            success: function(res){
               /*  console.log('res userTL:');
                console.log(res);
                console.log(res._realData.data); */
                $('#resarea').html();
                $.each(res._realData.data,function(i,v){
                    console.log('Id'+i+' text '+v.text);
                    $('#resarea').append(
                        '<br/>ID Tweet:"'+v.id+ '" Text: '+v.text
                    );
                });
            }
        });
    });//get user TL
});
function separateId(str) {
    let id = str.split('/');
    id = id[id.length-1].split('?')[0];
    return id;
}