$(document).ready(function() {
    let response = await fetch('/check_user', {
        method: 'POST'
    });

    response = await response.json();

    if (response.loggedIn) {
        $('main').append("");
    }
});