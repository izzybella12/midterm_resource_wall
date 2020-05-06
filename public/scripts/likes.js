$(document).ready(function() {
  console.log("Document Ready")

  const numberOfLikes = function(likes) {

    const $comment = $(`
    <i class="material-icons">face</i>
    <span class="profile_username">@izzybella12</span>
    <span class="profile_comment">I love sushiiiii</span>
    `);
    return $comment;

  }

  const renderComments = function(arrayOfComments) {
    for (let comment of arrayOfComments) {
      const $singleComment = createdComments(comment);
      $('#comment_container').append($singleComment);
    }
  };

  const loadComments = function() {
    $.ajax('/category/:id', {method: 'GET'})
      .then(function(response) {
        // console.log(response)
        renderComments(response);
      });
  };

  loadComments();

  const loadOneComment = function() {
    $.ajax('/category/:id', {method: 'GET'})
      .then(function (response) {
        let lastComment = response.pop();
        const $singleComment = createTweetElement(lastComment);
        $('#comment-container').append($singleComment);
      });
  };

  $('form').on('submit', function(event) {
    event.preventDefault();
    let commentContent = $('#comment-content').val();
      let data = $(this).serialize();
      console.log($(this).serialize());
      $.ajax('/category/:id', { method: 'POST', data})
        .then(function(response) {
          console.log('Success: ', response);
          $('#comment-content').val("");
          loadOneComment();
      });
  });

});
