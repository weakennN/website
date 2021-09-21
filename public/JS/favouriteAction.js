function addFavourite(productId) {
    $.post($_SERVER['HOME']."/private/Includes/FavouriteInclude/addToFavourite.php", {
        productId: productId
    }, function (data, status) {
        if (data.toString() === "display") {
            displayAddToFavouriteNotification();
        } else {
            window.location.pathname = "test/public/login.php";
        }
    });
}

function removeFavourite(productId) {
    $.post($_SERVER['HOME']."/private/Includes/FavouriteInclude/removeFromFavourite.php", {
        productId: productId
    }, function (data, status) {
        if (data.toString() === "display") {
            displayRemoveFromFavouriteNotification();
        } else {
            window.location.pathname = "test/public/login.php";
        }
    })
}