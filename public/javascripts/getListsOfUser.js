function getListsOfUser() {

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: "/getPrivateBooklistOfUser",
        dataType: "json",
        success: function (result){

            var privateLists = $('<div class="list-group" id="privateLists"></div>');
            if (result.length == 0) {
                privateLists.append('<div align="center"><i style="color:#F0AD4E" class="fa fa-frown-o fa-5x" aria-hidden="true"></i>');
                privateLists.append('<p align="center" style="color:#F0AD4E"><strong>There are no book in the database.</strong></p>');
            }
            else {
                var counter = 1;
                $.each(result, function(i, obj){
                    var listGroupItem = $('<a href="#" class="list-group-item" id="list'+obj.id+'" onclick="postPublishedList(id)">'+counter+'</a>');
                    var box = $('<div class="box"></div>').appendTo(listGroupItem);
                    $('<p><strong>My favourites: </strong></p>').appendTo(box);
                    $.each(obj.books, function(i, book){
                        var list = $('<ul class="list-group"></ul>').appendTo(box);
                        $('<li class="list-group-item">'+book.author+': <i>'+book.title+'</i></li>').appendTo(list);
                    });
                    privateLists.append(listGroupItem);
                    $('<hr>').appendTo(privateLists);
                    counter=counter+1;
                });
            }
            $('#privateLists').replaceWith(privateLists);

        }
    });

}

function postPublishedList(id){

        var idAsNumber = id.replace(/[^0-9]/g, '');
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/postPublishedList",
            dataType: "text",
            data: JSON.stringify({
                'listId':idAsNumber
            }),
            success: function () {
                var successMessage = $('<div id='+id+'></div>')
                successMessage.append('<div align="center"><i style="color:#5CB85C" class="fa fa-check-circle-o fa-5x" aria-hidden="true"></i></div><br/>')
                successMessage.append('<p style="color:#5CB85C" align="center"><strong>You have successfully published a book list.</strong></p> ');
                $('#'+id+'').replaceWith(successMessage);
            }
        });
}


