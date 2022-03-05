//Changes counter color to red if under 0 and back to original color when over 0
$(() => {
  $("#tweet-text").keypress(function(e) {
    let counter = 140 - $("#tweet-text").val().length - 1;
    e.target.form['2'].innerHTML = counter;
    if (e.target.form['2'].innerHTML < 0) {
      $(e.target.form['2']).css('color', 'red');
    }
    if (e.target.form['2'].innerHTML > 0) {
      $(e.target.form['2']).css('color', "#545149");
    }
  });


//Changes counter if input is pasted into
  $("#tweet-text").on("paste",function(e) {
   setTimeout(function() {
    let counter = 140
    console.log($("#tweet-text").val().length)
    e.target.form['2'].innerHTML = counter - $("#tweet-text").val().length
   }, 100)
  })

//Changes character count on backspace
  $("#tweet-text").keyup(function(e) {
    if (e.keyCode == 8) {
      setTimeout(function() {
        console.log(e.target.form['2'].innerHTML)
        let counter = 140
        e.target.form['2'].innerHTML = counter - $("#tweet-text").val().length
      }, 100)
    }
  })
});