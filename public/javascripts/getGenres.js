$.ajax({
    type: 'GET',
    contentType: 'application/json',
    url: "/getGenres",
    dataType: "json",
    success: function (result){
        $.each(result, function(i, obj){
          $('#genreList').append('<a onclick="getBooksByGenres('+'\''+obj.name+'\')"><strong>'+obj.name+' </strong></a>');
        });
    }
});



function getBooksByGenres(name) {

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: "/getBooksByGenres",
        dataType: "json",
        data: {
            'genreName':name
        },
        success: function (result){

            var filteredBookList = $('<div id="bookList"></div>');

            if( result.length == 0 ) {
                filteredBookList.append('<div align="center"><i style="color:#F0AD4E" class="fa fa-frown-o fa-5x" aria-hidden="true"></i>');
                filteredBookList.append('<p align="center" style="color:#F0AD4E"><strong>There are no book in the database with that tag.</strong></p>');
            }
            else{
                $.each(result, function(i, obj)
                {
                    var panel = $('<div class="panel panel-default"></div>').appendTo(filteredBookList);
                    $('<div class="panel-heading"><a href="">'+obj.title+' by: '+obj.author+'</a></div>').appendTo(panel);
                    var rating = $('<div class="rateit" data-rateit-resetable="false" ></div>').appendTo(filteredBookList);
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
                    genreList.appendTo(filteredBookList);




                    $('<p>'+obj.description+'</p>').appendTo(filteredBookList);
                    $('<hr>').appendTo(filteredBookList);

                });
            }
            $('#bookList').replaceWith(filteredBookList);

        }
    });

}