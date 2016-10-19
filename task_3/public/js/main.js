$(function() {
    $.ajax({
        url: "/user"
    })
    .done(function(result) {
        var $items = result.map(function(item) {
            return $("<div><b>" + item.firstName + 
                "\\" + (item.lastName || '') + 
                "</b><br />" + new Date(item.lastLogin).toDateString() + 
                "</div>")
        });
        $( "#userContainer" ).append($items);
    });
});