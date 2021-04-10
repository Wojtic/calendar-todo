$(document).ready(function() {
    $("#register_form").submit(async e => {
        e.preventDefault(e);
        let serializedData = $('#register_form').serializeArray();
        if (serializedData[2].name != 'password' || serializedData[3].name != 'password_confirm') {
            console.error('Wrong form indexes');
            return;
        }
        if (serializedData[2].value != serializedData[3].value) {
            console.log('Passwords do not match');
            return;
        }

        let response = await fetch('/register', {
            method: 'POST',
            body: new URLSearchParams([...new FormData(e.target).entries()])
        })
        if (response.ok) {
            if (response.redirected) {
                window.location.href = response.url;
            }
        } else {
            console.log('HTTP error: ' + response.status);
        }
    });

    $('input[name=password_confirm], input[name=password]').on("input", () => {
        if ($('input[name=password_confirm]').val() !== $('input[name=password]').val()) {
           $('input[name=password_confirm]').get(0).setCustomValidity("Hesla se neshodují!");
        } else {
           $('input[name=password_confirm]').get(0).setCustomValidity("");
        }
    })
});