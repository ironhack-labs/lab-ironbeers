$(document).ready(function () {
    const currentLocation = window.location.pathname;
    $(`a[href='${currentLocation}'`).addClass("active");
});