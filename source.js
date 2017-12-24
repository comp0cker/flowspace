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

var scale = 10;
var width, height;

$( document ).ready(function() {

    $('#monitorSelect').material_select(); // required for monitor select

    updateHeight();
    tempWidth.push(window.screen.width);0

    tempHeight.push(window.screen.height);

    width = window.screen.width / scale;
    height = window.screen.height / scale;
});

var app = angular.module('mainApp', ['gridster']);

app.controller('mainCtrl', ['$scope', function ($scope) {
    $scope.editEnabled=true;

    $scope.standardItems = [];
    $scope.names = [];

    $scope.gridsterOpts = {
        columns: 6, // the width of the grid, in columns
        pushing: true, // whether to push other items out of the way on move or resize
        floating: true, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
        swapping: true, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
        width: 'auto', // can be an integer or 'auto'. 'auto' scales gridster to be the full width of its containing element
        colWidth: 'auto', // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [10, 10], // the pixel distance between each widget
        outerMargin: true, // whether margins apply to outer edges of the grid
        sparse: false, // "true" can increase performance of dragging and resizing for big grid (e.g. 20x50)
        isMobile: false, // stacks the grid items if true
        mobileBreakPoint: 600, // if the screen is not wider that this, remove the grid layout and stack the items
        mobileModeEnabled: true, // whether or not to toggle mobile mode when screen width is less than mobileBreakPoint
        minColumns: 1, // the minimum columns the grid must have
        minRows: 2, // the minimum height of the grid, in rows
        maxRows: 100,
        defaultSizeX: 2, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        minSizeX: 1, // minimum column width OF an item
        maxSizeX: null, // maximum column width of an item
        minSizeY: 1, // minumum row height of an item
        maxSizeY: null, // maximum row height of an item
        resizable: {
            enabled: true,
            handles: ['n', 'e', 's', 'w', 'ne', 'se', 'sw', 'nw'],
            start: function(event, $element, widget) {}, // optional callback fired when resize is started,
            resize: function(event, $element, widget) {}, // optional callback fired when item is resized,
            stop: function(event, $element, widget) {} // optional callback fired when item is finished resizing
        },
        draggable: {
            enabled: true, // whether dragging items is supported
            start: function(event, $element, widget) {}, // optional callback fired when drag is started,
            drag: function(event, $element, widget) {}, // optional callback fired when item is moved,
            stop: function(event, $element, widget) {} // optional callback fired when item is finished dragging
        }
    };
    $scope.remove=function(index){
        $scope.standardItems.splice(index, 1);
    };
    $scope.add=function(){
        var temp = $scope.url;

        if ($scope.names.indexOf(temp) >= 0)
            Materialize.toast("You already added that URL silly!", 4000);
        else {
            $scope.standardItems.push({size: {x: 1, y: 1}, position: [0, 0]});
            $scope.names.push(temp);
            //alert(temp);
        }
    };

    $scope.disableEditing=function(){
        $scope.editEnabled=false;
        $scope.gridsterOpts.resizable.enabled=false;
        $scope.gridsterOpts.draggable.enabled=false;
    };

    $scope.enableEditing=function(){
        $scope.editEnabled=true;
        $scope.gridsterOpts.resizable.enabled=true;
        $scope.gridsterOpts.draggable.enabled=true;
    };
}]);

$( document ).ready(function() {

    $('#monitorSelect').material_select(); // required for monitor select

    updateHeight();
    tempWidth.push(window.screen.width);0

    tempHeight.push(window.screen.height);
});

function uh(){
  return "hi";
}

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
