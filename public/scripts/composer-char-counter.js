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
});