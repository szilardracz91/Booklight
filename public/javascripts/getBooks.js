$.ajax({
    type: 'GET',
    url: "/getBooks",
    dataType: "json",
    success: function (result){

        var bookList = $('<div id="bookList"></div>');
        if( result.length == 0 ) {
            bookList.append('<div align="center"><i style="color:#F0AD4E" class="fa fa-frown-o fa-5x" aria-hidden="true"></i>');
            bookList.append('<p align="center" style="color:#F0AD4E"><strong>There are no book is the database.</strong></p>');
        }
        else{
            $.each(result, function(i, obj)
            {
                var panel = $('<div class="panel panel-default"></div>').appendTo(bookList);
                $('<div class="panel-heading"><a href="">'+obj.title+' by: '+obj.author+'</a></div>').appendTo(panel);

                $('<div class="rateit"></div>').appendTo(bookList);
                $('<p>'+obj.description+'</p>').appendTo(bookList);
                $('<hr>').appendTo(bookList);


            });
        }
        $('#bookList').replaceWith(bookList);
    }
});