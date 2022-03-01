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
            url: 'https://mighty-cliffs-43835.herokuapp.com/tweets',
            data: {
                id : ID
            },
            success: function(res) {
                console.log(res)
                $('#resultados').text(res.data[0].text);
            }
        })
    });
});

function separateId(str) {
    let id = str.split('/');
    id = id[id.length-1].split('?')[0];
    return id;
}

