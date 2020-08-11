$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MainChat__messageList__oneBox">
          <div class="MainChat__messageList__oneBox__userBox">
            <div class="MainChat__messageList__oneBox__userBox__messageOwner">
              ${message.user_name}
            </div>
            <div class="MainChat__messageList__oneBox__userBox__date">
              ${message.created_at}
            </div>
          </div>
          <div class="MainChat__messageList__oneBox__message">
            <p class="MainChat__messageList__oneBox__message__content">
              ${message.content}
            </p>
            <img class="MainChat__messageList__oneBox__message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="MainChat__messageList__oneBox">
        <div class="MainChat__messageList__oneBox__userBox">
          <div class="MainChat__messageList__oneBox__userBox__messageOwner">
            ${message.user_name}
          </div>
          <div class="MainChat__messageList__oneBox__userBox__date">
            ${message.created_at}
          </div>
        </div>
        <div class="MainChat__messageList__oneBox__message">
          <p class="MainChat__messageList__oneBox__message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.MainChat__messageForm__form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data)
      $('.MainChat__messageList').append(html);
      $('form')[0].reset();
      $('.MainChat__messageList').animate({ scrollTop: $('.MainChat__messageList')[0].scrollHeight});
      $('.MainChat__messageForm__form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
  })
})