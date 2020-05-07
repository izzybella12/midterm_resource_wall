$(document).ready(function() {
  console.log("Likes Document Ready")

  $('#heart').on('click', function() {
    event.preventDefault();
    console.log("The heart button has been clicked!");
    $('#heart').css("color", "red");

    $.ajax('/resources/:resource_id/likes/new', { method: POST})
    .then(function(response) {
      console.log('Like successfully added: ', response)
    })
  })
});
