// https://jsfiddle.net/oLe1jtfL/1/

var container = document.querySelector('.question-content');
var button0 = document.createElement("BUTTON");
button0.innerHTML = "Zero";
button0.className = "question-button";
container.appendChild(button0);
var button1 = document.createElement("BUTTON");
button1.innerHTML = "One";
button1.className = "question-button";
container.appendChild(button1);
var button2 = document.createElement("BUTTON");
button2.innerHTML = "Two";
button2.className = "question-button";
container.appendChild(button2);

var buttons = document.getElementsByClassName('question-button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function(btnNum) {
    return function() {
      console.log(btnNum);
    }
  }(i));
}

