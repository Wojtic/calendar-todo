
$(document).ready(function() {
    $("#register_form").submit(e => {
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

        fetch('/register', {
            method: 'POST',
            body: new URLSearchParams([...new FormData(e.target).entries()])
        }).then(response => {
            console.log(response);
        })
    });
});