$(document).ready(async () => {
    let response = await fetch('/check_user', {
        method: 'POST'
    });

    response = await response.json();

    if (response.loggedIn) {
        $("main").append(`<div class="user"><i class="fa fa-user-circle fa-4x"></i><a href="/log_out">Odhlásit se</a><a href="/delete_account" class="delAcc" onclick="return confirm('Opravdu?')">Smazat účet</a></div>`);
    }
});