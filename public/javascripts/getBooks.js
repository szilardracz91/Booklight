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
                var rating = $('<div class="rateit" data-rateit-resetable="false" ></div>').appendTo(bookList);
               /*$.ajax({
                    type: 'GET',
                    contentType: 'application/json',
                    url: "/hasRated",
                    dataType: "json",
                    data: {
                        'bookId':obj.id
                    },
                    success: function (result) {
                        if (result == true){

                        }
                        else {

                }
                        console.log(result);
                        data-rateit-readonly="true"
                    }
                });*/

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
                        console.log(result);
                        console.log("rating getted");
                    }
                });



                $('<p>Genre :'+obj.genre+'</p>').appendTo(bookList);

                $('<p>'+obj.description+'</p>').appendTo(bookList);
                $('<hr>').appendTo(bookList);

            });
        }
        $('#bookList').replaceWith(bookList);
    }
});