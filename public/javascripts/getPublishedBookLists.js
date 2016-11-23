function getPublishedBookLists() {

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: "/getPublishedBookLists",
        dataType: "json",
        success: function (result){
            console.log(result);

            var publishedListOfBooks = $('<div id="bookList"></div>');

            $.each(result, function(i, obj){

                $('<strong>'+obj.user.name+'\'s favourites: </strong>').appendTo(publishedListOfBooks);
                $.each(obj.books, function(i, book){
                    var list = $('<ul class="list-group"></ul>').appendTo(publishedListOfBooks);
                    $('<li class="list-group-item">'+book.author+': <i>'+book.title+'</i></li>').appendTo(list);
                });

                $('<hr>').appendTo(publishedListOfBooks);

            });

            $('#bookList').replaceWith(publishedListOfBooks);
        }
    });

}

