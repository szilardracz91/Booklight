$(document).ready(function(){
    $("#Comments").click(function(e){
        $.ajax({type: "GET",
            url: "/getComments",
            success:function(result){
                var bookList = $('<div id="bookList"></div>');
                bookList.append('<p align="center" style="color:#F0AD4E"><strong>Megjöttél!</strong></p>');
                $('#bookList').replaceWith(bookList);
            }});
    });
});