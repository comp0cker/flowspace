var tempWidth = [];
var tempHeight = [];

var scale = 30;

var width = window.screen.width / scale;

var gridWidth = 12;
var gridHeight = 6;
var gridMax = gridWidth * gridHeight;
var gridOccupied = 0;

var app = angular.module('mainApp', ['gridster']);

app.controller('mainCtrl', ['$scope', function ($scope) {
    $( document ).ready(function() {

        $('#monitorSelect').material_select(); // required for monitor select

        updateHeight();

        tempWidth.push(window.screen.width);
        tempHeight.push(window.screen.height);

        /*
        $('#url').keypress(function(key) { // not reccomended.. yikes...
            if (key.which == 13){
                $scope.add();
                $('#url').blur();
            }
        })
        */
    });

    $scope.gridWidth = gridWidth;
    $scope.gridHeight = gridHeight; //?? help i don't want to redefine

    $scope.windowWidth = window.screen.width;
    $scope.windowHeight = window.screen.height;

    $scope.gcd = function(size, total) {
        var x = Math.abs(size);
        var y = Math.abs(total);

        while(y) {
            var t = y;
            y = x % y;
            x = t;
        }
        return x;
    };

    $scope.editEnabled=true;

    $scope.items = [];

    $scope.gridsterOpts = {
        columns: gridWidth, // the width of the grid, in columns
        pushing: true, // whether to push other items out of the way on move or resize
        floating: false, // whether to automatically float items up so they stack (you can temporarily disable if you are adding unsorted items with ng-repeat)
        swapping: true, // whether or not to have items of the same size switch places instead of pushing down if they are the same size
        colWidth: width, // can be an integer or 'auto'.  'auto' uses the pixel width of the element divided by 'columns'
        rowHeight: 'match', // can be an integer or 'match'.  Match uses the colWidth, giving you square widgets.
        margins: [10, 10], // the pixel distance between each widget
        outerMargin: false, // whether margins apply to outer edges of the grid
        maxRows: gridHeight,
        defaultSizeX: 2, // the default width of a gridster item, if not specifed
        defaultSizeY: 1, // the default height of a gridster item, if not specified
        minSizeX: 1, // minimum column width of an item
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
        $scope.items.splice(index, 1);
        gridOccupied -= $scope.items[index].sizeX * $scope.items[index].sizeY;
    };
    $scope.add=function(){
      var temp = $scope.url;
      /*
    }
        var result = $.grep($scope.items, function (obj) {
            return obj.name = $scope.url;
        });

        if (result.length == 1)
            Materialize.toast("You already added that URL silly!", 4000);
        else {
            */

      var newGridOccupied = gridOccupied + 6 * 3;

      if (newGridOccupied > gridMax)
          Materialize.toast("Not enough room for a new window!", 4000);

      else if ($("#url").val().length == 0) // oops angular doesn't work
          Materialize.toast("You didn't enter a URL!", 4000);

      else {
          if ($("#url").val().indexOf(".") > 0) {
              $scope.items.push({
                  sizeX: 6,
                  sizeY: 3,
                  name: temp
              });
          }
          else {
              temp += ".com";
              Materialize.toast($("#url").val() + " isn't a valid URL, added " + $("#url").val() + ".com instead!", 4000);

              $scope.items.push({
                  sizeX: 6,
                  sizeY: 3,
                  name: temp
              });
          }

          gridOccupied += 6 * 3;
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

    $scope.generate = function() {

        //alert($scope.batch());

        if ($("#username").val().length == 0 || $scope.items.length == 0) {

            if ($("#username").val().length == 0)
                Materialize.toast("Please add a username!", 4000);

            if($scope.items.length == 0)
                Materialize.toast("Please add a link!", 4000);

            return;
        }


        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent($scope.batch()));
        element.setAttribute('download', 'flowspace.bat');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    };


function updateHeight(){
  $(".initMonitor").text("Detected as " + window.screen.width + "x" + window.screen.height);
}

$scope.addMonitor = function(){
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

$scope.batch = function(){
    var full_batch = "";
    full_batch += '@echo off\r\n\ ';

    for (var i = 0; i < $scope.items.length; i++) {
        full_batch += 'start chrome --user-data-dir=';
        full_batch += '"C:\\Users\\' + $("#username").val() + '\\AppData\\Local\\Google\\Chrome\\User Data\\user' + i + '"--new-window ';
        full_batch += '--window-position=' + (window.screen.width * $scope.items[i].col / gridWidth) + ',' + (window.screen.height * $scope.items[i].row / gridHeight) + " ";
        full_batch += '--window-size=' + (window.screen.width * $scope.items[i].sizeX / gridWidth) + ',' + (window.screen.height * $scope.items[i].sizeY / gridHeight) + " ";
        full_batch += '"' + $scope.items[i].name + '" \r\n';
    }

    return full_batch;
};
}]);