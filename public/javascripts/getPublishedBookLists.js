function getPublishedBookLists() {

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: "/getPublishedBookLists",
        dataType: "json",
        success: function (result){
            var publishedListOfBooks = $('<div id="bookList"></div>');

            $.each(result, function(i, obj){
                var box = $('<div class="box"></div>').appendTo(publishedListOfBooks);
                $('<p><strong>'+obj.user.name+'\'s favourites: </strong></p>').appendTo(box);
                $.each(obj.books, function(i, book){
                    var list = $('<ul class="list-group"></ul>').appendTo(box);
                    $('<li class="list-group-item">'+book.author+': <i>'+book.title+'</i></li>').appendTo(list);
                });

                $('<hr>').appendTo(publishedListOfBooks);

            });

            $('#bookList').replaceWith(publishedListOfBooks);
        }
    });

}

