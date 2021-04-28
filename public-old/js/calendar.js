let example_event = {
    id: "event0",
    subject_short: "M",
    subject_name: "Matematika",
    time_start: 0,
    time_end: 45,
    day: "Monday",
    theme: ""
};

let events = [example_event];

const day_settings = { time: 510, css_length: 100 };

const create_event = function (event) {
    $('#' + event.day).append(`<div class="event" id=${event.id}></div>`);
    $('#' + event.id).css({
        'left': event.time_start / day_settings.time * day_settings.css_length + '%',
        'right': day_settings.css_length - event.time_end / day_settings.time * day_settings.css_length + '%'
    });

    let hours_start = Math.floor((event.time_start + 510) / 60) + ':' + (event.time_start + 510) % 60;
    let hours_end = Math.floor((event.time_end + 510) / 60) + ':' + (event.time_end + 510) % 60;

    $('#' + event.id).append(`<p class="time">${hours_start} - ${hours_end}</p>`);
    $('#' + event.id).append(`<h4>${event.subject_short}</h4>`);
    $('#' + event.id).append(`<p class="theme">${event.theme}</p>`);
    $('#' + event.id).append(`<p>${event.subject_name}</p>`);
};

$(document).ready(() => {
    events.forEach(create_event);
});