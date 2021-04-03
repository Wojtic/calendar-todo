$(document).ready(function () {
    $(".burger").click(() => {
        if ($("nav ul").hasClass("nav_active")) {
            $("nav ul").removeClass("nav_active");
        } else {
            $("nav ul").addClass("nav_active");
        }
    });
})
