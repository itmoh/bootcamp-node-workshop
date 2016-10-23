$(function() {
    $.ajax({
        url: "/user"
    })
    .done(function(result) {
        var $items = result.responses.map(function(item) {
            return $("<div><b><a href=\"/update/" + item._id + "\">" + 
                item.firstName + "\\" + (item.lastName || '') + 
                "</a></b><br />" + new Date(item.lastLogin).toDateString() + 
                "</div>")
        });
        $( "#userContainer" ).append($items);
    });
});