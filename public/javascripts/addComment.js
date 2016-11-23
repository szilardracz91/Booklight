function getComments(bookId) {
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: "/getBook",
        dataType: "json",
        data: {
            'bookId': bookId
        },
        success: function (result) {
            var authorAndTitle=result.title+ " by: "+result.author;
            document.getElementById("authorAndTitle").innerHTML = authorAndTitle;

            var bookDetails = $('<div id="bookDetails"></div>');
            bookDetails.append('<p>'+result.description+'</p>');


            var genreList = $('<div>Genre: </div>');
            $.each(result.genres, function( key, genre ){
                $('<span>'+genre.name+' </span>').appendTo(genreList);
            });
            genreList.append(bookDetails);
            $('#bookDetails').replaceWith(bookDetails);
        }
    });

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: "/getComments",
        dataType: "json",
        data: {
            'bookId': bookId
        },
        success: function (result) {

            var commentList = $('<div id="commentList"></div>');
            var user;
            $.each(result, function (i, comment) {
                $('<p><strong>User: '+comment.user.name+'</strong></p>').appendTo(commentList);
                $('<p>'+comment.text+'</p>').appendTo(commentList);
                $('<hr>').appendTo(commentList);
                user = comment.user.name;
            });
            $('#commentList').replaceWith(commentList);

            var commentInput = $('<div id="commentInput" align="center"></div>');
            $('<textarea id="comment" rows="4" cols="50" placeholder="write your comment here..."></textarea>').appendTo(commentInput);
            $('<br>').appendTo(commentInput);
            $('<br>').appendTo(commentInput);
            $('<button onclick="postComment('+bookId+')" class="btn btn-primary">Send</button>').appendTo(commentInput);
            $('#commentInput').replaceWith(commentInput);
        }

    });
}
function postComment(bookId) {


    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: "/getUser",
        dataType: "json",
        success: function (result) {

            var comment = $('#comment').val();
            $('#comment').val('');
            $('<p><strong>User: '+result.name+'</strong></p>').appendTo('#commentList');
            $('<p>'+comment+'</p>').appendTo('#commentList');
            $('<hr>').appendTo('#commentList');

            $.ajax({
                type: 'POST',
                contentType: 'application/json',
                url: "/postComment",
                dataType: "text",
                data: JSON.stringify({
                    'comment':comment,
                    'bookId': bookId
                }),
                success: function () {
                    console.log("OK");
                }
            });
        }
    });



}