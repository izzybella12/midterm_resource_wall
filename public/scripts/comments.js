$(document).ready(function() {
  console.log("Comment Document Ready")

  const createdComments = function(commentData) {

    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    let problematicText = commentData.comment;

    // Connect with login
    const $comment = $(`
    <i class="material-icons">face</i>
    <span class="profile_username">USER_ID</span>
    <span class="profile_comment">${escape(problematicText)}</span>
    `);
    return $comment;
  }

  $('#frm-comment').on('submit', function(event) {
    event.preventDefault();
    const commentContent = this.elements.commentContent.value;
    const commentObj = {
      comment: commentContent
    }

    $.ajax('/resources/:resource_id/comments/new', { method: 'POST', data: commentObj})
      .then(function(response) {
        console.log('Comment successfully added: ', response)
      .then
        $('#comment-list').append(createdComments(commentObj));
        $('#comment-content').val("");
    });
  });
});

