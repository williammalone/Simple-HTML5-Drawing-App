var color = $('.selected').css('background-color');
var $canvas = $('canvas');
var context = $canvas[0].getContext('2d');
var lastEvent,
    mousedown = false;

// When clicking on control list items
$('.controls').on('click', 'li', function () {
  // Deselect sibling elements
  $(this).siblings().removeClass('selected');
  
  // Select clicked element
  $(this).addClass('selected');
  
  // cache current color
  color = $(this).css('background-color');
});


// When "New Color" button is clicked
$('#revealColorSelect').click(function () {
  changeColor();
  
  // Toggle visibility of colorSelect element
  $('#colorSelect').toggle();
});


function changeColor() {
  var r = $('#red').val(),
      g = $('#green').val(),
      b = $('#blue').val();
  
  // Update the newColor span
  $('#newColor').css('background-color', 'rgb(' + r + ', ' + g + ', ' + b + ')');
}

// When color slider values change
$('input[type=range]').change(changeColor);



// When "Add Color" button is clicked
$('#addNewColor').click(function () {
  // Append the color to the controls ul
  var $newColor = $('<li></li>');
  $newColor.css('background-color', $('#newColor').css('background-color'));
  $('.controls ul').append($newColor);
  
  // Select the new color
  $newColor.click();
});



// On mouse event(s) on the canvas
$canvas
  .mousedown(function (event) {
    lastEvent = event;
    mousedown = true;
  })
  .mousemove(function (event) {
    if (mousedown) {
      // Draw lines
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(event.offsetX, event.offsetY);
      context.strokeStyle = color;
      context.stroke();
      
      lastEvent = event;
    }
  })
  .mouseup(function (event) {
    mousedown = false;
  })
  .mouseleave(function (event) {
    mousedown = false;
  });
