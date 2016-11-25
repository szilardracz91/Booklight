
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
                    var listGroupItem = $('<a href="##" class="list-group-item" id="list'+obj.id+'" onclick="changeListToSelected(id)">'+counter+'</a>');
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


function changeListToSelected(id)
{
    $('#'+id+'').hide();
    console.log(id);
    var number = id.replace(/[^0-9]/g, '');
    console.log(id);
    postPublishedList(number);
}

function postPublishedList(id){
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/postPublishedList",
            dataType: "text",
            data: JSON.stringify({
                'listId':id
            }),
            success: function () {
            }
        });

}


