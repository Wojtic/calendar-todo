$(document).ready(async function () {
    $(".burger").click(() => {
        if ($("nav ul").hasClass("nav_active")) {
            $("nav ul").removeClass("nav_active");
            $(".burger").removeClass("toggle");
        } else {
            $("nav ul").addClass("nav_active");
            $(".burger").addClass("toggle");
        }
    });

    let response = await fetch('/check_user', {
        method: 'POST'
    });

    response = await response.json();

    if (response.loggedIn) {
        $("nav ul").children().last().remove();
        $("nav ul").append(`<li><i class="fa fa-user-circle fa-2x"></i><p>${response.username}</p></li>`);
    }
})
