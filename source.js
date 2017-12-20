var text = 'start chrome --user-data-dir="C:\Users\jlgrimes\AppData\Local\Google\Chrome\User Data\Default" --new-window --window-position=0,0 --window-size=960,1200 "https://servicelink.it.umich.edu"'

function generate() {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', 'flowspace.bat');

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

// Start file download.
download("hello.txt","This is the content of my file :)");
