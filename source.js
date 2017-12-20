var text = '@echo off\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user1"--new-window --window-position=0,0 --window-size=960,1200 "https://servicelink.it.umich.edu"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user2"--new-window --window-position=960,0 --window-size=480,1200 "https://mcommunity.umich.edu/"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user3"--new-window --window-position=1440,0 --window-size=480,1200 "https://docs.google.com/document/d/1m5aAwjPyq28iO2Hqrb3BNNo_ofYoLNcv5A1BcCWbZN8/edit"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user4"--new-window --window-position=1920,540 --window-size=640,540 "https://webuniq.www.umich.edu/index.php"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user5"--new-window --window-position=1920,0 --window-size=1280,540 "https://inbox.google.com"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user6"--new-window --window-position=2560,540 --window-size=640,540 "https://ccmipcc1al.ns.itd.umich.edu:8445/desktop/container/?locale=en_US"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user7"--new-window --window-position=3200,0 --window-size=640,1080 "https://miworkspace.hipchat.com/chat"\r\n\
exit'

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
