
$(document).ready(function() {
    $("#login_form").submit(e => {
        e.preventDefault(e);
        let form = $(this)[0]
        let data = new FormData(form);
        fetch('/login', {
            method: 'post',
            body: data
        }).then(response => {
            console.log(response);
        }).then(user => {
            console.log(user)
        })
    });
});