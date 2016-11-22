function postRating(bookId, ratingValue)
{
    console.log(bookId);
    console.log(ratingValue);

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: "/postRating",
        dataType: "text",
        data: JSON.stringify({
            'bookId':bookId,
            'ratingValue':ratingValue
        }),
        success: function () {
            console.log("OK");
        }
    });

}