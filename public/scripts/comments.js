$(document).ready(function() {

  console.log("Document Ready")

  const createdComments = function(commentData) {

    // const escape =  function(str) {
    //   let div = document.createElement('div');
    //   div.appendChild(document.createTextNode(str));
    //   return div.innerHTML;
    // };

    // let problematicText = tweetData.content.text;

    const $comment = $(`
    <i class="material-icons">face</i>
    <span class="profile_username">${commentData.name}</span>
    <span class="profile_comment">${commentData.comment}</span>
    `);
    return $comment;

  }

  const arrayOfComments = [{name: "Bella", comment: "Hello"}, {name: "Sam", comment: "WHat's up"}]

  console.log(arrayOfComments);

  const renderComments = function(arrayOfComments) {
    for (let comment of arrayOfComments) {
      console.log(comment);
      const $singleComment = createdComments(comment);
      $('#comment_container').append($singleComment);
    }
  };

  ///

  renderComments(arrayOfComments);

  const loadComments = function() {
    $.ajax('/category/:id', {method: 'GET'})
      .then(function(response) {
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

///

// $(() => {
//   $.ajax({
//     method: 'GET',
//     url: '/api/users'
//   }).done((users) => {
//     for(user of users) {
//       $('<div>').text(user.name).appendTo($('body'));
//     }
//   });;
// });
