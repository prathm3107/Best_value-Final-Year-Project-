function record(btn) {
  var recognition = new webkitSpeechRecognition();
  recognition.lang = "en-GB";

  recognition.onresult = function(event) {
    document.getElementById('searchquery').value = event.results[0][0].transcript;
  }
  recognition.start();
  btn.disabled = true;
    setTimeout(function() {
        btn.disabled = false;
    }, 9000);
}
