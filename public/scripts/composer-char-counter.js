
$(() => {

  $("#tweet-text").keypress(function(e) {  
    e.target.form['2'].innerHTML = e.target.form['2'].innerHTML - 1
    if (e.target.form['2'].innerHTML < 0) {
      $(e.target.form['2']).css('color', 'red')
    }
  })
})