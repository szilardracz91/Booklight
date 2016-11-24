function getBooksForAList(){
    console.log("called");
    $.ajax({
        type: 'GET',
        url: "/getBooks",
        dataType: "json",
        success: function (result) {

            var bookListForPublish = $('<div class="list-group" id="bookListForPublish"></div>');
            if (result.length == 0) {
                bookListForPublish.append('<div align="center"><i style="color:#F0AD4E" class="fa fa-frown-o fa-5x" aria-hidden="true"></i>');
                bookListForPublish.append('<p align="center" style="color:#F0AD4E"><strong>There are no book in the database.</strong></p>');
            }
            else {
                $.each(result, function (i, book) {
                    $('<a href="#" class="list-group-item">'+book.title+'</a>').appendTo(bookListForPublish);
                });
            }
            $('#bookListForPublish').replaceWith(bookListForPublish);
        }
    });

}