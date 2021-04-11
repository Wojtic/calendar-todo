$(document).ready(async () => {
    let response = await fetch('/check_user', {
        method: 'POST'
    });

    response = await response.json();

    if (response.loggedIn) {
        console.log("here")
        $("main").append(`<div class="user"><i class="fa fa-user-circle fa-2x"></i><a href="/log_out">Odhlásit se</a></div>`);
    }
});