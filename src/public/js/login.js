
$(document).ready(function () {
    $("#login_form").submit(async e => {
        e.preventDefault(e);
        let response = await fetch('/login', {
            method: 'POST',
            body: new URLSearchParams([...new FormData(e.target).entries()])
        });
        if (response.ok) {
            if (response.redirected) {
                window.location.href = response.url;
            }
        } else {
            console.log('HTTP error: ' + response.status);
        }
    });
});