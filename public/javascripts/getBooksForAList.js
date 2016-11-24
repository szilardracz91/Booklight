var selectedBooks = [];

function getBooksForAList(){
    selectedBooks = [];
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
                    $('<a href="#" class="list-group-item" id='+book.id+' onclick="changeToSelected(id)">'+book.title+'</a>').appendTo(bookListForPublish);
                });
            }
            $('#bookListForPublish').replaceWith(bookListForPublish);
        }
    });

}

function changeToSelected(id)
{
    selectedBooks.push(id);
    $('#'+id+'').addClass('active');
    $('#'+id+'').attr("onclick","changeToUnSelected(id)");
}

function changeToUnSelected(id)
{
    selectedBooks = jQuery.grep(selectedBooks, function(value) {
        return value != id;
    });
   $('#'+id+'').removeClass('active');
   $('#'+id+'').attr("onclick","changeToSelected(id)");
}

function postBooksForAList(){
    if (selectedBooks.length > 0){
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: "/postBookList",
            dataType: "text",
            data: JSON.stringify({
                'selectedBooks':selectedBooks
            }),
            success: function () {
                var successMessage = $('<div id="bookListForPublish"></div>')
                successMessage.append('<div align="center"><i style="color:#5CB85C" class="fa fa-check-circle-o fa-5x" aria-hidden="true"></i></div><br/>')
                successMessage.append('<p style="color:#5CB85C" align="center"><strong>You have successfully created a book list.</strong></p> ');
                $('#bookListForPublish').replaceWith(successMessage);
            }
        });
    }
}