$.ajax({
    type: 'GET',
    url: "/getBooks",
    dataType: "json",
    success: function (result){

        var bookList = $('<div id="bookList"></div>');

        if( result.length == 0 ) {
            bookList.append('<div align="center"><i style="color:#F0AD4E" class="fa fa-frown-o fa-5x" aria-hidden="true"></i>');
            bookList.append('<p align="center" style="color:#F0AD4E"><strong>There are no book in the database.</strong></p>');
        }
        else{
            $.each(result, function(i, obj)
            {
                var panel = $('<div class="panel panel-default"></div>').appendTo(bookList);
                $('<div class="panel-heading">'+obj.title+' by: '+obj.author+'</div>').appendTo(panel);
                var box = $('<div class="box"></div>').appendTo(bookList);
                var rating = $('<div class="rateit" data-rateit-resetable="false" ></div>').appendTo(box);
                rating.bind('rated', function() {postRating(obj.id, rating.rateit('value'))});
                rating.rateit();
                $.ajax({
                    type: 'GET',
                    contentType: 'application/json',
                    url: "/getRatings",
                    dataType: "json",
                    data: {
                        'bookId':obj.id
                    },
                    success: function (result) {
                        rating.rateit('value', result);

                    }
                });

                var genreList = $('<div>Genre: </div>');
                $.each(obj.genres, function( key, genre ){
                    $('<span>'+genre.name+' </span>').appendTo(genreList);
                });
                genreList.appendTo(box);




                $('<p>'+obj.description+'</p>').appendTo(box);
                $('<p><a href="#Comments" data-toggle="modal"  onclick="getComments('+obj.id+')">Comment</a></p>').appendTo(box);

                $('<hr>').appendTo(box);
            });
        }

        $('#bookList').replaceWith(bookList);
    }
});