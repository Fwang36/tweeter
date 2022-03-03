/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// const users = {
//   "user": {
//     "name": "Newton",
//     "avatars": "https://i.imgur.com/73hZDYK.png",
//     "handle": "@SirIsaac"

//     },
//   "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//   "created_at": 1461116232227
// }


$(() => {

  const escapeFunc = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML
  }
  $("#new-tweet").submit(function(event) {
    event.preventDefault();
    $("#error-box").slideUp(200)
    
    if (!document.getElementById("tweet-text").value) {
      errorMessage("Please Enter at Least 1 Character")
      return;
    }
    if (document.getElementById("tweet-text").value.length > 140) {
     errorMessage("Please Enter Under 140 Characters")
      return;
    }
    $("#tweet-text").val(escapeFunc($("#tweet-text").val()))
    
    const serializedEvent = $(event.target).serialize()
    const safeHTML = escapeFunc(serializedEvent);

    $.ajax( {
      type: "POST",
      url: "/tweets",
      data: escapeFunc(serializedEvent),
      datatype: "json",
      success: function() {
        $.ajax({
          url: "/tweets",
          type: "GET",
          datatype: "json",
          success: function(tweet) {
            createTweetElement(tweet[tweet.length - 1])
          }
        })
      }
    })
  })

  const loadTweets = function() {
    $.ajax("/tweets", { method: "GET"})
    .then(function (tweets) {
      renderTweets(tweets)
    })
  }
  loadTweets()
  const createTweetElement = function(tweetData) {
    const $tweet = $(`<article class="tweet"></article>`)

    const $header = $(`<header class="tweet-header"></header>`)
    const $avatar = $(`<span class="avatar"><img src=${tweetData.user.avatars}></span>`)
    const $name = $(`<span class="name">${tweetData.user.name}</span>`)
    const $handle = $(`<span class="handle">${tweetData.user.handle}</span>`)
    
    const $body = $(`<p class="tweet-body">${tweetData.content.text}</p>`)

    const $footer = $(`<footer class="tweet-footer"></footer>`)
    const $time = $(`<span class="time">${timeago.format(tweetData.created_at)}</span>`)
    const $icons = $(`<span class="icons"><i class="fa-solid fa-flag"></i>&ensp;<i class="fa-solid fa-retweet"></i>&ensp;<i class="fa-solid fa-heart"></i></span>`)

    $(".tweet-contain").append($tweet)

    $($tweet).append($header)

    $($header).append($avatar)
    $($header).append($name)
    $($header).append($handle)

    $($tweet).append($body)

    $($tweet).append($footer)

    $($footer).append($time)
    $($footer).append($icons)

  }

  const newTweet = function() {
    createTweetElement();  
  }

  const renderTweets = function(db) {
    for (entry of db) {
      createTweetElement(entry)
    }
  };

  const errorMessage = function(err) {
    const $error = $(`<article id="error-box"></article>`)
    const $errorMessage = $(`<p id="error-message"><i class="fa-solid fa-triangle-exclamation"></i><strong>${err}</strong><i class="fa-solid fa-triangle-exclamation"></i></p>`)

    $(".new-tweet").prepend($error).hide().slideDown(400)

    $($error).append($errorMessage)
  } 
})