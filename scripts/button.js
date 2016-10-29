// https://jsfiddle.net/oLe1jtfL/1/

var prompt = document.querySelector('.prompt');
prompt.innerHTML = "Press the buttons in the order to generate the sequence '012'";
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

var guess = [];
var buttons = document.getElementsByClassName('question-button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    guess.push(i);
    console.log(guess);
  });
}

var submitButton = document.querySelector('.submit-button');
submitButton.onclick = function() {
  var http = new XMLHttpRequest();
  var url = "/guess";
  var params = guess.join('');
  http.open("POST", url, true);
  http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  http.onreadystatechange = function() {
    if(http.readyState == 4 && http.status == 200) {
        alert(http.responseText);
        document.querySelector('.result').innerHTML = http.responseText;
    }
  }
  http.send(params);
  guess = [];
}

