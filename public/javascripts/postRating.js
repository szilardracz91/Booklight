function postRating(bookId, ratingValue)
{
    console.log(bookId);
    console.log(ratingValue);
    $.ajax({
        type: 'POST',
        url: "/postRating",
        dataType: "json",
        data: {
            'bookId':bookId,
            'ratingValue':ratingValue
        },
        success: function () {
            console.log("OK");
        }
    });

}