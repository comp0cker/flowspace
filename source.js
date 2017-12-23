var text = '@echo off\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user1"--new-window --window-position=0,0 --window-size=960,1200 "https://servicelink.it.umich.edu"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user2"--new-window --window-position=960,0 --window-size=480,1200 "https://mcommunity.umich.edu/"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user3"--new-window --window-position=1440,0 --window-size=480,1200 "https://docs.google.com/document/d/1m5aAwjPyq28iO2Hqrb3BNNo_ofYoLNcv5A1BcCWbZN8/edit"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user4"--new-window --window-position=1920,540 --window-size=640,540 "https://webuniq.www.umich.edu/index.php"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user5"--new-window --window-position=1920,0 --window-size=1280,540 "https://inbox.google.com"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user6"--new-window --window-position=2560,540 --window-size=640,540 "https://ccmipcc1al.ns.itd.umich.edu:8445/desktop/container/?locale=en_US"\r\n\
start chrome --user-data-dir="C:\\Users\\jlgrimes\\AppData\\Local\\Google\\Chrome\\User Data\\user7"--new-window --window-position=3200,0 --window-size=640,1080 "https://miworkspace.hipchat.com/chat"\r\n\
exit';

var tempWidth = [];
var tempHeight = [];

var scale = 5;

$(function () {
    $(".gridster ul").gridster({
        widget_base_dimensions: [100, 100],
        widget_margins: [5, 5],
        helper: 'clone',
        resize: {
            enabled: true
        }
    }).data('gridster');
});


$( document ).ready(function() {

    $('#monitorSelect').material_select(); // required for monitor select

    updateHeight();
    tempWidth.push(window.screen.width);
    tempHeight.push(window.screen.height);
  
    var width = window.screen.width / scale;
    var height = window.screen.height / scale;
    $(".resize-container").css("width", width + "px");
    $(".resize-container").css("height", height + "px");
  
});



function updateHeight(){
  $(".initMonitor").text("Detected as " + window.screen.width + "x" + window.screen.height);
}

function addMonitor(){
  var sameMonitor = false;
  for (var i = 0; i < tempWidth.length; i++)
     if (window.screen.width == tempWidth[i] && window.screen.height == tempHeight[i])
      sameMonitor = true;
  
  if (sameMonitor)
    Materialize.toast("You didn't change monitors!", 4000);
  else
    {
      tempWidth.push(window.screen.width);
      tempHeight.push(window.screen.height);
      //$(".size").append("<h5>Monitor " + tempWidth.length + " is " + window.screen.width + "x" + window.screen.height + " </h5>");
      $(".form-horizontal").append("<div class = 'form-group " + tempWidth.length + "'><h5 style='display:inline'>Monitor " + tempWidth.length + "</h5><p>" + window.screen.width + "x" + window.screen.height + "</p><div class='resize-container' style='width:" + window.screen.width / scale + "px;height:" + window.screen.height / scale + "px'><div class='resize-drag hide'>google.com</div><div class='resize-drag hide'>google.com</div><div class='resize-drag hide'>google.com</div><div class='resize-drag hide'>google.com</div><div class='resize-drag hide'>google.com</div><div class='resize-drag hide'>google.com</div><div class='resize-drag hide'>google.com</div><div class='resize-drag hide'>google.com</div><div class='resize-drag hide'>google.com</div><div class='resize-drag hide'>google.com</div></div></div>")
      //$(".monitorSelect").append(new Option('Foo', 'foo', 'true', 'true'));
      $("#monitorSelect").append("<option value='" + tempWidth.length + "'>Monitor " + tempWidth.length + "</option>")
      $('#monitorSelect').material_select();
      Materialize.toast("Monitor added!", 4000);
    }
}

function addWebsite() {
    var gridster = $(".gridster ul").gridster().data('gridster');
    gridster.add_widget('<li class="new">The HTML of the widget...</li>', 2, 1);
}

function parseFile(){
  
}

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

